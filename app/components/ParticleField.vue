<script setup lang="ts">
const canvasRef = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
    if (!canvasRef.value) return;
    const cvs: HTMLCanvasElement = canvasRef.value;

    const context = cvs.getContext("2d");
    if (!context) return;
    const ctx: CanvasRenderingContext2D = context;
    let dpr = 0;
    let w = 0,
        h = 0;

    const motionQuery = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
    );

    interface Node {
        x: number;
        y: number;
        vx: number;
        vy: number;
        r: number;
        hue: number;
    }

    const N = 48;
    const FRAME_MS = 1000 / 60;
    const nodes: Node[] = [];
    const BASE_SPEED = 0.1;
    const DAMP = 0.984;

    // Pre-rendered glow sprites, one per hue. Drawing these with drawImage()
    // avoids allocating a radial gradient per node on every frame.
    const SPRITE_R = 32; // sprite radius in px; scaled down per node when drawn
    const hues = [330, 278];
    const sprites: Record<number, HTMLCanvasElement> = {};
    for (const hue of hues) {
        const s = document.createElement("canvas");
        s.width = s.height = SPRITE_R * 2;
        const sctx = s.getContext("2d")!;
        const g = sctx.createRadialGradient(
            SPRITE_R,
            SPRITE_R,
            0,
            SPRITE_R,
            SPRITE_R,
            SPRITE_R,
        );
        g.addColorStop(0, `hsla(${hue},100%,70%,.95)`);
        g.addColorStop(1, `hsla(${hue},100%,50%,0)`);
        sctx.fillStyle = g;
        sctx.beginPath();
        sctx.arc(SPRITE_R, SPRITE_R, SPRITE_R, 0, Math.PI * 2);
        sctx.fill();
        sprites[hue] = s;
    }

    function resize() {
        const nextW = cvs.offsetWidth;
        const nextH = cvs.offsetHeight;
        const nextDpr = Math.min(window.devicePixelRatio || 1, 1.5);
        if (w === nextW && h === nextH && dpr === nextDpr) return false;
        for (const n of nodes) {
            n.x = w ? (n.x / w) * nextW : Math.random() * nextW;
            n.y = h ? (n.y / h) * nextH : Math.random() * nextH;
        }
        w = nextW;
        h = nextH;
        dpr = nextDpr;
        cvs.width = Math.round(w * dpr);
        cvs.height = Math.round(h * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        return true;
    }

    function seed() {
        nodes.length = 0;
        for (let i = 0; i < N; i++) {
            nodes.push({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.25,
                vy: (Math.random() - 0.5) * 0.25,
                r: Math.random() * 1.6 + 0.4,
                hue: Math.random() < 0.55 ? 330 : 278,
            });
        }
    }

    // Scroll only invalidates the cache; read layout when the pointer next moves.
    let rect: DOMRect | null = null;
    const invalidateRect = () => {
        rect = null;
        mx = my = -1;
    };

    resize();
    seed();

    let resizeRaf = 0;
    const onResize = () => {
        invalidateRect();
        if (resizeRaf) return;
        resizeRaf = requestAnimationFrame(() => {
            resizeRaf = 0;
            if (resize() && (!running || motionQuery.matches)) render();
        });
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", invalidateRect, { passive: true });

    let mx = -1,
        my = -1;
    const parent = cvs.parentElement!;

    const onMouseMove = (e: MouseEvent) => {
        rect ??= cvs.getBoundingClientRect();
        mx = e.clientX - rect.left;
        my = e.clientY - rect.top;
    };
    const onMouseEnter = () => invalidateRect();
    const onMouseLeave = () => {
        mx = -1;
        my = -1;
    };
    parent.addEventListener("mouseenter", onMouseEnter);
    parent.addEventListener("mousemove", onMouseMove);
    parent.addEventListener("mouseleave", onMouseLeave);

    // Observe actual hero-size changes (including font/layout changes), rather
    // than resetting the backing canvas on every mobile viewport resize event.
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(parent);

    function step(frameScale: number) {
        for (const n of nodes) {
            n.x += n.vx * frameScale;
            n.y += n.vy * frameScale;
            if (n.x < 0 || n.x > w) n.vx *= -1;
            if (n.y < 0 || n.y > h) n.vy *= -1;
            let nearMouse = false;
            if (mx >= 0) {
                const dx = n.x - mx,
                    dy = n.y - my,
                    d2 = dx * dx + dy * dy;
                if (d2 < 160 * 160) {
                    nearMouse = true;
                    const f = (1 - Math.sqrt(d2) / 160) * 0.08;
                    n.vx += dx * f * 0.02 * frameScale;
                    n.vy += dy * f * 0.02 * frameScale;
                }
            }
            if (!nearMouse) {
                const spd = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
                if (spd > BASE_SPEED) {
                    const next =
                        BASE_SPEED + (spd - BASE_SPEED) * DAMP ** frameScale;
                    const scale = next / spd;
                    n.vx *= scale;
                    n.vy *= scale;
                }
            }
        }
    }

    function render() {
        ctx.clearRect(0, 0, w, h);

        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const a = nodes[i]!,
                    b = nodes[j]!;
                const dx = a.x - b.x,
                    dy = a.y - b.y;
                const d2 = dx * dx + dy * dy;
                if (d2 < 120 * 120) {
                    const d = Math.sqrt(d2);
                    const t = 1 - d / 120;
                    const hue = (a.hue + b.hue) / 2;
                    ctx.strokeStyle = `hsla(${hue}, 100%, 62%, ${t * 0.32})`;
                    ctx.lineWidth = 0.6;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                }
            }
        }

        for (const n of nodes) {
            const dr = n.r * 4;
            ctx.drawImage(sprites[n.hue]!, n.x - dr, n.y - dr, dr * 2, dr * 2);
        }
    }

    let raf = 0;
    let running = false;
    let visible = false;
    let lastTick: number | null = null;
    let lastDraw = 0;
    let accumulated = 0;

    function tick(timestamp: number) {
        if (!running) return;
        if (lastTick === null) {
            lastDraw = timestamp;
        } else {
            accumulated += timestamp - lastTick;
            if (accumulated >= FRAME_MS - 0.01) {
                // Clamp catch-up after a stall so particles cannot jump far.
                step(Math.min(timestamp - lastDraw, 50) / FRAME_MS);
                render();
                lastDraw = timestamp;
                accumulated = Math.max(
                    0,
                    accumulated -
                        Math.floor((accumulated + 0.01) / FRAME_MS) * FRAME_MS,
                );
            }
        }
        lastTick = timestamp;
        if (running) raf = requestAnimationFrame(tick);
    }

    function start() {
        if (running || motionQuery.matches || !visible || document.hidden) return;
        running = true;
        lastTick = null;
        accumulated = 0;
        raf = requestAnimationFrame(tick);
    }

    function stop() {
        running = false;
        cancelAnimationFrame(raf);
    }

    // Pause the loop when the hero is scrolled out of view.
    const io = new IntersectionObserver(
        (entries) => {
            visible = entries[0]?.isIntersecting ?? false;
            if (visible) {
                if (motionQuery.matches) render();
                else start();
            } else {
                stop();
            }
        },
        { threshold: 0 },
    );
    io.observe(cvs);

    // Pause when the tab is backgrounded.
    const onVisibility = () => {
        if (document.hidden) stop();
        else start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const onMotionChange = () => {
        if (motionQuery.matches) {
            stop();
            render();
        } else {
            start();
        }
    };
    motionQuery.addEventListener("change", onMotionChange);
    render();

    onUnmounted(() => {
        stop();
        cancelAnimationFrame(resizeRaf);
        io.disconnect();
        resizeObserver.disconnect();
        motionQuery.removeEventListener("change", onMotionChange);
        document.removeEventListener("visibilitychange", onVisibility);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("scroll", invalidateRect);
        parent.removeEventListener("mouseenter", onMouseEnter);
        parent.removeEventListener("mousemove", onMouseMove);
        parent.removeEventListener("mouseleave", onMouseLeave);
    });
});
</script>

<template>
    <canvas ref="canvasRef" id="particles" class="w-full h-full z-0" />
</template>

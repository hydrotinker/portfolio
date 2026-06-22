<script setup lang="ts">
const canvasRef = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
    if (!canvasRef.value) return;
    const cvs: HTMLCanvasElement = canvasRef.value;

    const ctx = cvs.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0,
        h = 0;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
    ).matches;

    interface Node {
        x: number;
        y: number;
        vx: number;
        vy: number;
        r: number;
        hue: number;
    }

    const N = 80;
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
        w = cvs.offsetWidth;
        h = cvs.offsetHeight;
        cvs.width = w * dpr;
        cvs.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
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

    // Canvas position relative to the viewport, cached to avoid a layout read
    // on every mousemove. Refreshed on resize/scroll.
    let rect = cvs.getBoundingClientRect();
    const refreshRect = () => {
        rect = cvs.getBoundingClientRect();
    };

    resize();
    seed();

    const onResize = () => {
        resize();
        seed();
        refreshRect();
        if (reducedMotion || !running) render();
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", refreshRect, { passive: true });

    let mx = -1,
        my = -1;
    const parent = cvs.parentElement!;

    const onMouseMove = (e: MouseEvent) => {
        mx = e.clientX - rect.left;
        my = e.clientY - rect.top;
    };
    // Refresh the cached rect when the pointer enters: the initial read in
    // onMounted can be stale after fonts load / hydration shifts the layout,
    // and neither scroll nor resize fires for that. One read per enter keeps
    // the per-mousemove path allocation-free while staying accurate.
    const onMouseEnter = () => refreshRect();
    const onMouseLeave = () => {
        mx = -1;
        my = -1;
    };
    parent.addEventListener("mouseenter", onMouseEnter);
    parent.addEventListener("mousemove", onMouseMove);
    parent.addEventListener("mouseleave", onMouseLeave);

    function step() {
        for (const n of nodes) {
            n.x += n.vx;
            n.y += n.vy;
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
                    n.vx += dx * f * 0.02;
                    n.vy += dy * f * 0.02;
                }
            }
            if (!nearMouse) {
                const spd = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
                if (spd > BASE_SPEED) {
                    const next = BASE_SPEED + (spd - BASE_SPEED) * DAMP;
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

    function tick() {
        step();
        render();
        if (running) raf = requestAnimationFrame(tick);
    }

    function start() {
        if (running || reducedMotion || !visible || document.hidden) return;
        running = true;
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
                if (reducedMotion) render();
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

    // Draw a single static frame for reduced-motion users.
    if (reducedMotion) render();

    onUnmounted(() => {
        stop();
        io.disconnect();
        document.removeEventListener("visibilitychange", onVisibility);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("scroll", refreshRect);
        parent.removeEventListener("mouseenter", onMouseEnter);
        parent.removeEventListener("mousemove", onMouseMove);
        parent.removeEventListener("mouseleave", onMouseLeave);
    });
});
</script>

<template>
    <canvas ref="canvasRef" id="particles" class="w-full h-full z-0" />
</template>

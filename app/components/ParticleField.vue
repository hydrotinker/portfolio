<script setup lang="ts">
const canvasRef = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
    if (!canvasRef.value) return;
    const cvs: HTMLCanvasElement = canvasRef.value;

    const ctx = cvs.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0,
        h = 0;

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

    resize();
    seed();

    const onResize = () => {
        resize();
        seed();
    };
    window.addEventListener("resize", onResize);

    let mx = -1,
        my = -1;
    const parent = cvs.parentElement!;

    const onMouseMove = (e: MouseEvent) => {
        const r = cvs.getBoundingClientRect();
        mx = e.clientX - r.left;
        my = e.clientY - r.top;
    };
    const onMouseLeave = () => {
        mx = -1;
        my = -1;
    };
    parent.addEventListener("mousemove", onMouseMove);
    parent.addEventListener("mouseleave", onMouseLeave);

    let raf: number;

    function tick() {
        ctx.clearRect(0, 0, w, h);

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

        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const a = nodes[i]!,
                    b = nodes[j]!;
                const dx = a.x - b.x,
                    dy = a.y - b.y;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < 120) {
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
            const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 4);
            g.addColorStop(0, `hsla(${n.hue},100%,70%,.95)`);
            g.addColorStop(1, `hsla(${n.hue},100%,50%,0)`);
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2);
            ctx.fill();
        }

        raf = requestAnimationFrame(tick);
    }

    tick();

    onUnmounted(() => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", onResize);
        parent.removeEventListener("mousemove", onMouseMove);
        parent.removeEventListener("mouseleave", onMouseLeave);
    });
});
</script>

<template>
    <canvas ref="canvasRef" id="particles" class="w-full h-full z-0" />
</template>

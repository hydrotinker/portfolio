<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();

const stats = [
    ["09", "years shipping"],
    ["38", "projects / yr"],
    ["12", "timezones x-func"],
    ["∞", "commits to main"],
];

const openResume = () => {
    window.open("/docs/Hydrotinker_CV.pdf", "_blank");
};
</script>

<template>
    <section
        class="relative min-h-[calc(100vh_-_180px)] pt-10 pb-[60px] overflow-hidden"
    >
        <div
            class="orb w-[560px] h-[560px] -right-[140px] top-[180px] bg-[#9b30ff]"
        />
        <ParticleField />

        <div class="wrap relative z-[2] pt-10">
            <!-- HUD coords bar -->
            <div
                class="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 text-white/55 [font-family:var(--mono)] text-[11px] tracking-[0.22em] uppercase mb-[30px]"
            >
                <span class="flex items-center">
                    {{ runtimeConfig.public.coords.n }}°N
                    <span class="mx-3 text-[6px]">●</span>
                    {{ runtimeConfig.public.coords.e }}°E
                </span>
                <span
                    >BUILD_{{ runtimeConfig.public.build.year }}.{{
                        runtimeConfig.public.build.month
                    }}.{{ runtimeConfig.public.build.day }} —
                    <span class="text-[var(--pink)]">ONLINE</span></span
                >
                <div class="hidden md:flex items-end">
                    <span class="mr-2 leading-none">SIG_STR</span>
                    <div
                        v-for="_ of 9"
                        class="w-1 h-3 mr-1 last:mr-0 bg-white/55"
                    ></div>
                    <div class="w-1 h-1.5 mr-1 last:mr-0 bg-white/55"></div>
                </div>
            </div>

            <div
                class="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_460px] gap-10 items-start"
            >
                <!-- Left column -->
                <div>
                    <div
                        class="[font-family:var(--mono)] text-[10px] sm:text-[12px] tracking-[0.16em] sm:tracking-[0.24em] text-[var(--pink)] mb-[14px] uppercase"
                    >
                        // personnel file · access granted
                    </div>

                    <GlitchText
                        as="h1"
                        text="FULLSTACK"
                        :style="{
                            fontSize: 'clamp(50px, 12vw, 130px)',
                            margin: 0,
                        }"
                    />
                    <GlitchText
                        as="h1"
                        text="DEVELOPER"
                        :style="{
                            fontSize: 'clamp(50px, 12vw, 130px)',
                            margin: 0,
                            color: '#fff',
                        }"
                    />

                    <div class="flex gap-4 items-center mt-[18px] flex-wrap">
                        <Chip>fullstack</Chip>
                        <Chip purple>backend</Chip>
                        <Chip>frontend</Chip>
                    </div>

                    <p
                        class="max-w-[580px] mt-[22px] text-white/[82] leading-[1.4] sm:leading-[1.6] text-[15px] sm:text-[17px]"
                    >
                        I design and build websites, web apps, and custom
                        software from start to finish — handling both the look
                        and feel and everything running behind the scenes. I
                        work with startups and teams who want a fast, polished
                        product shipped without the usual back-and-forth.
                    </p>

                    <div class="flex items-start gap-[14px] mt-8">
                        <RouterLink
                            to="#projects"
                            class="btn purple py-[11px] px-4 text-[10px]! sm:text-[12px]!"
                        >
                            view_work
                        </RouterLink>
                        <button
                            class="btn ghost py-[11px] px-4 text-[10px]! sm:text-[12px]!"
                            @click="openResume"
                        >
                            download resume.pdf
                        </button>
                    </div>
                </div>

                <!-- Right column -->
                <div class="grid gap-[18px]">
                    <!-- Uptime sparkline -->
                    <div class="glass p-4 relative">
                        <div
                            class="flex justify-between items-center mb-[10px] [font-family:var(--mono)] text-[11px] tracking-[0.22em] text-white/60"
                        >
                            <span>◆ LIVE UPTIME</span>
                            <span class="text-[var(--pink)]">99.982%</span>
                        </div>
                        <svg
                            viewBox="0 0 300 60"
                            width="100%"
                            height="60"
                            preserveAspectRatio="none"
                        >
                            <defs>
                                <linearGradient id="spG" x1="0" x2="1">
                                    <stop offset="0" stop-color="#FF2D78" />
                                    <stop offset="1" stop-color="#9B30FF" />
                                </linearGradient>
                            </defs>
                            <path
                                d="M0 45 L20 38 L40 42 L60 30 L80 32 L100 20 L120 28 L140 14 L160 22 L180 10 L200 18 L220 8 L240 16 L260 6 L280 12 L300 4"
                                fill="none"
                                stroke="url(#spG)"
                                stroke-width="2"
                                class="[filter:drop-shadow(0_0_6px_rgba(255,45,120,0.8))]"
                            />
                        </svg>
                        <div
                            class="flex justify-between [font-family:var(--mono)] text-[10px] text-white/45 mt-2 tracking-[0.18em]"
                        >
                            <span>00:00</span><span>06:00</span
                            ><span>12:00</span><span>18:00</span
                            ><span>NOW</span>
                        </div>
                    </div>

                    <!-- Stat strip -->
                    <div class="glass p-4 grid grid-cols-2 gap-3">
                        <div
                            v-for="[n, l] in stats"
                            :key="l"
                            class="py-[14px] px-4 bg-white/[2]"
                        >
                            <div
                                class="[font-family:var(--mono)] text-[32px] font-extrabold tracking-[-0.02em] text-white"
                            >
                                {{ n }}
                            </div>
                            <div
                                class="[font-family:var(--mono)] text-[10px] tracking-[0.22em] uppercase text-white/55 mt-1"
                            >
                                {{ l }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

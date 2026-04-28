<script setup lang="ts">
import { ref, computed } from "vue";

type HistoryEntry = [string, string, string[]?, string[]?];

const activeHistoryIdx = ref<number | null>(null);

const activeEntry = computed<HistoryEntry | null>(() =>
    activeHistoryIdx.value !== null
        ? (history[activeHistoryIdx.value] ?? null)
        : null,
);

const history: HistoryEntry[] = [
    ["NOW / 2026", "Senior Fullstack Developer - Freelance"],
    [
        "PREV / 2024–26",
        "Senior Fullstack Developer",
        [
            "Designed and built a unified PHP core framework shared across all company products, reducing new feature development time by 5×",
            "Architected Dockerized dev/production environments, standardizing deployments and eliminating environment-specific bugs",
            "Implemented CI/CD pipeline with automated testing (GitHub Actions), reducing production errors by 40%",
            "Optimized MySQL query performance and Redis caching strategy, achieving 3× throughput improvement under peak load",
            "Built observability stack with Grafana Alloy (metrics, logs, traces), reducing mean time to detect critical production errors from 45 min to 5 min (9× improvement)",
            "Led code reviews and mentored 6 junior developers; established QA processes and unit/integration test coverage",
        ],
        [
            "PHP",
            "Laravel",
            "Symphony",
            "MySQL",
            "Redis",
            "Docker",
            "Linux",
            "Nginx",
            "GitHub Actions",
            "Prometheus",
            "Grafana",
        ],
    ],
    [
        "PREV / 2023–24",
        "Middle Backend Developer",
        [
            "Contributed to high-load web applications processing 1M+ requests/day for a 2M+ user platform",
            "Introduced Redis caching layer, reducing database load by 60% during traffic spikes",
            "Optimized complex MySQL and PostgreSQL queries, improving response times across core API endpoints",
        ],
        ["PHP", "Laravel", "MySQL", "PostgreSQL", "Redis", "Docker", "Linux"],
    ],
    [
        "BASE / 2018–23",
        "Fullstack Developer - Freelance",
        [
            "Delivered 50+ projects for international clients across e-commerce, fintech, and SaaS verticals",
            "Built and integrated REST APIs, payment gateways, and third-party service connectors",
            "Built high-traffic e-commerce platform processing 5,000+ orders/day — product catalog, cart, checkout, order management, and payment integrations",
        ],
        ["PHP", "Laravel", "MySQL", "MongoDB", "Linux", "Git"],
    ],
];
</script>

<template>
    <section id="about" class="pt-[110px] pb-[20px] sm:pb-[60px]">
        <div class="wrap">
            <HudRule
                label="ABOUT / DOSSIER"
                code="01//"
                right="FILE: HYDROTINKER.SECRET.BIO"
            />

            <div class="grid grid-cols-1 sm:grid-cols-[1.1fr_0.9fr] gap-10">
                <!-- Left -->
                <div>
                    <h2
                        class="font-(--mono) text-3xl sm:text-5xl font-extrabold leading-[1.04] mt-0 mb-5 tracking-[-0.01em]"
                    >
                        <span
                            class="text-(--pink) [text-shadow:0_0_24px_rgba(255,45,120,0.7)]"
                            >Bring</span
                        >
                        the vision. <br />
                        I'll
                        <span
                            class="text-(--purple) [text-shadow:0_0_24px_rgba(155,48,255,0.7)]"
                            >build</span
                        >
                        the reality.
                    </h2>
                    <p
                        class="text-white/78 leading-[1.5] sm:leading-[1.65] text-sm sm:text-base max-w-[620px]"
                    >
                        My name is Ivan, and I'm Senior Full-Stack PHP Developer
                        with 9+ years building high-load web applications for
                        2M+ users. Expert in PHP/Laravel backend architecture,
                        MySQL/Redis optimization, and Vue.js/TypeScript
                        frontends. Experienced working with international
                        clients remotely.
                    </p>
                    <p
                        class="text-white/62 leading-[1.5] sm:leading-[1.65] text-sm sm:text-base max-w-[620px] mt-3.5"
                    >
                        Off-hours I make music, maintain my personal projects,
                        and do rampages in DotA 2.
                    </p>

                    <div class="grid grid-cols-2 gap-4 mt-8">
                        <div
                            v-for="([k, v, achievements, stack], i) in history"
                            :key="k"
                            class="corners py-[14px] px-4 border border-white/8 bg-white/2 transition-colors duration-150"
                            :class="
                                achievements
                                    ? 'cursor-pointer hover:border-white/20 hover:bg-white/4'
                                    : ''
                            "
                            @click="
                                achievements
                                    ? (activeHistoryIdx = i)
                                    : undefined
                            "
                        >
                            <div
                                class="font-(--mono) text-[8px] sm:text-[11px] tracking-[0.22em] text-(--pink)"
                            >
                                {{ k }}
                            </div>
                            <div
                                class="mt-1.5 text-white/85 text-sm leading-normal"
                            >
                                {{ v }}
                            </div>
                        </div>
                    </div>
                    <!-- Inline terminal -->
                    <div class="mt-4">
                        <div
                            v-if="!activeEntry"
                            key="hint"
                            class="font-(--mono) text-[11px] tracking-[0.15em] text-white/30 py-2"
                        >
                            <TerminalWindow
                                title="not-selected"
                                :achievements="[
                                    'Click the history entry to see achieved goals during this position.',
                                ]"
                                :stack="[]"
                                style="max-width: 100%"
                            />
                        </div>
                        <div v-else key="terminal" class="w-full">
                            <TerminalWindow
                                :title="activeEntry[1]"
                                :achievements="activeEntry[2]"
                                :stack="activeEntry[3]"
                                style="max-width: 100%"
                            />
                        </div>
                    </div>
                </div>

                <!-- Right -->
                <div
                    class="flex flex-col items-start self-start sticky top-[66px]"
                >
                    <!-- Portrait -->
                    <div class="glass corners overflow-hidden">
                        <div class="ph aspect-[4/5]">
                            <img
                                src="../assets/images/me.png"
                                alt="Ivan Morozov"
                                width="842"
                                height="1264"
                                loading="lazy"
                            />
                        </div>
                        <div
                            class="px-3.5 py-3 flex justify-between font-(--mono) text-[11px] tracking-[0.2em] text-white/60"
                        >
                            <span>ID · HYDROTINKER · 3004</span>
                            <span class="text-(--pink)">◉ REC</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

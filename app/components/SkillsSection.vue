<script setup lang="ts">
import type { SkillDomain } from "~/types/components";

const skills = ref<SkillDomain[]>([
    {
        domain: "FRONTEND",
        code: "SKL.UI",
        groups: [
            [{ name: "TypeScript", lvl: 88 }],
            [
                { name: "VueJS", lvl: 90 },
                { name: "Nuxt", lvl: 86 },
                { name: "Tailwind", lvl: 85 },
                { name: "AnimeJS", lvl: 80 },
            ],
        ],
    },
    {
        domain: "BACKEND",
        code: "SKL.SRV",
        groups: [
            [
                { name: "PHP", lvl: 94 },
                { name: "SQL", lvl: 89 },
            ],
            [
                { name: "Laravel", lvl: 90 },
                { name: "Symfony", lvl: 72 },
                { name: "MySQL/PostgreSQL", lvl: 92 },
                { name: "Redis", lvl: 81 },
            ],
        ],
    },
    {
        domain: "AI",
        code: "SKL.AI",
        groups: [
            [
                { name: "LLM", lvl: 96 },
                { name: "System One", lvl: 95 },
            ],
            [
                { name: "Agents, MCP, Skills", lvl: 92 },
                { name: "Rivet", lvl: 90 },
            ],
        ],
    },
    {
        domain: "OPS/MISC",
        code: "SKL.MISC",
        groups: [
            [
                { name: "Docker", lvl: 90 },
                { name: "K8s", lvl: 82 },
                { name: "CI/CD", lvl: 84 },
            ],
            [
                { name: "Prometheus", lvl: 74 },
                { name: "Grafana", lvl: 80 },
            ],
        ],
    },
]);
</script>

<template>
    <section id="skills" class="pt-[110px] pb-[20px] sm:pb-[60px]">
        <div class="wrap">
            <HudRule
                label="STACK / CAPABILITY_MATRIX"
                code="03//"
                right="CALIBRATED · 2026.Q4"
            />
            <div
                class="flex justify-between items-end mb-[22px] flex-wrap gap-3"
            >
                <GlitchText
                    as="h2"
                    text="STACK_MATRIX"
                    class="text-[clamp(30px,6vw,72px)] m-0"
                />
                <p
                    class="max-w-[420px] text-white/70 m-0 leading-[1.45] sm:leading-[1.6] text-right text-sm sm:text-base"
                >
                    Self-rated, calibrated by shipped production work. Numbers
                    are relative, not a leaderboard.
                </p>
            </div>
            <div
                class="grid grid-cols-1 min-[594px]:grid-cols-2 min-[1150px]:grid-cols-4 gap-[18px]"
            >
                <SkillColumn
                    v-for="col in skills"
                    :key="col.code"
                    :col="col"
                />
            </div>
        </div>
    </section>
</template>

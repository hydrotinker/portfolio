<script setup lang="ts">
import type { SkillDomain } from '~/types/components';

const skills = ref<SkillDomain[]>([
    {
        domain: "LANGUAGES",
        code: "SKL.LANG",
        items: [
            { name: "PHP", lvl: 96 },
            { name: "VueJS", lvl: 88 },
            { name: "Typescript", lvl: 82 },
            { name: "JS", lvl: 80 },
        ],
    },
    {
        domain: "FRONTEND",
        code: "SKL.UI",
        items: [
            { name: "Pinia", lvl: 88 },
            { name: "Nuxt", lvl: 78 },
            { name: "Tailwind", lvl: 82 },
            { name: "Animation", lvl: 88 },
        ],
    },
    {
        domain: "BACKEND",
        code: "SKL.SRV",
        items: [
            { name: "Laravel", lvl: 84 },
            { name: "Symphony", lvl: 68 },
            { name: "MySQL/PostgreSQL", lvl: 86 },
            { name: "Redis", lvl: 81 },
        ],
    },
    {
        domain: "OPS",
        code: "SKL.OPS",
        items: [
            { name: "Docker", lvl: 90 },
            { name: "CI/CD", lvl: 84 },
            { name: "Github Actions", lvl: 82 },
            { name: "Grafana", lvl: 80 },
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
                right="CALIBRATED · 2026.Q2"
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
                class="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[18px]"
            >
                <SkillColumn v-for="col in skills" :key="col.code" :col="col" />
            </div>
        </div>
    </section>
</template>

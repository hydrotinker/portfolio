<script setup lang="ts">
import type {
    Certificates,
    SkillCertificate,
    SkillDomain,
} from "~/types/components";

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
        domain: "OPS/MISC",
        code: "SKL.MISC",
        items: [
            {
                name: "AI",
                lvl: 96,
            },
            { name: "Docker", lvl: 90 },
            { name: "CI/CD", lvl: 84 },
            { name: "Grafana", lvl: 80 },
        ],
    },
]);

const certificates = ref<Certificates>({
    AI: [
        {
            label: "Claude 101",
            file: "/certificates/certificate-gj2ko4xn2svs-1776412248.pdf",
        },
        {
            label: "Claude Code 101",
            file: "/certificates/certificate-xfwv2o67pc4j-1777374983.pdf",
        },
    ],
});
const filter = ref<string>("");

const showCertificates = (key: string) => {
    filter.value = key;
};

const filteredCertificates = computed<Array<SkillCertificate>>(() =>
    filter.value
        ? (certificates.value[filter.value] ?? [])
        : Object.values(certificates.value).flat(),
);
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
                <SkillColumn
                    v-for="col in skills"
                    :key="col.code"
                    :col="col"
                    :certificates="certificates"
                    @show:certificates="showCertificates"
                />
            </div>
        </div>
        <div class="wrap mt-6!">
            <div
                class="flex gap-1.5 flex-wrap justify-between items-center mb-3"
            >
                <span class="glitch">Certificates</span>
                <div class="flex gap-1.5 flex-wrap">
                    <button
                        @click="filter = ''"
                        class="[font-family:var(--mono)] text-[11px] tracking-[.18em] py-2 px-3 cursor-pointer rounded uppercase transition-[background-color,border-color]"
                        :class="
                            filter === ''
                                ? 'bg-gradient-to-r from-pink to-purple text-[#0A0A0A] border border-transparent font-bold'
                                : 'bg-transparent text-white/70 border border-white/15 font-medium'
                        "
                    >
                        All
                    </button>
                    <button
                        v-for="(_, key) in certificates"
                        :key="key"
                        @click="filter = key"
                        class="[font-family:var(--mono)] text-[11px] tracking-[.18em] py-2 px-3 cursor-pointer rounded uppercase transition-[background-color,border-color]"
                        :class="
                            filter === key
                                ? 'bg-gradient-to-r from-pink to-purple text-[#0A0A0A] border border-transparent font-bold'
                                : 'bg-transparent text-white/70 border border-white/15 font-medium'
                        "
                    >
                        {{ key }}
                    </button>
                </div>
            </div>
            <div
                class="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[18px]"
            >
                <div
                    v-for="certificate of filteredCertificates"
                    :key="certificate.label"
                    class="corners py-[14px] px-4 border border-white/8 bg-white/2 cursor-pointer hover:border-white/20 hover:bg-white/ transition-colors duration-150"
                    @click="
                        navigateTo(certificate.file, {
                            open: { target: '_blank' },
                        })
                    "
                >
                    {{ certificate.label }}
                </div>
            </div>
        </div>
    </section>
</template>

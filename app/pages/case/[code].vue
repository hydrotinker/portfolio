<script setup lang="ts">
import type { CaseDetail, Project } from "~/types/components";

const route = useRoute();
const code = computed(() => String(route.params.code));

const projects = ref<Project[]>([]);
const caseDetail = ref<CaseDetail>();

const project = computed(
    (): Project =>
        projects.value.find((p) => p.code === code.value) ?? projects.value[0]!,
);
const detail = computed(
    (): CaseDetail =>
        (projects.value[code.value] ?? projects.value["_DEFAULT"])!,
);
const index = computed(() =>
    projects.value.findIndex((p) => p.code === code.value),
);
const prev = computed(
    (): Project =>
        projects.value[
            (index.value - 1 + projects.value.length) % projects.value.length
        ]!,
);
const next = computed(
    (): Project => projects.value[(index.value + 1) % projects.value.length]!,
);

const outcomes = computed((): [string, string][] => {
    const [m0 = "", m1 = ""] = project.value.metric;
    return [[m0, m1], ...detail.value.outcomes.slice(1)];
});

useHead({
    title: computed(() => `${project.value.name} · HYDROTINKER`),
});
</script>

<template>
    <div>
        <!-- Breadcrumb -->
        <div class="border-b border-white/6 bg-[#0a0a0a]/40">
            <div
                class="wrap flex justify-between items-center h-11 font-[var(--mono)] text-[11px] tracking-[0.22em] text-white/55 uppercase"
            >
                <span>
                    <NuxtLink to="/" class="text-white/60">◄ ..</NuxtLink>
                    / work /
                    <span class="text-[var(--pink)]">{{ project.code }}</span>
                </span>
                <span>CASE_FILE · {{ project.code }} · {{ project.year }}</span>
                <span
                    :class="
                        project.live ? 'text-[var(--pink)]' : 'text-white/40'
                    "
                >
                    {{ project.live ? "◉ LIVE" : "◎ ARCHIVED" }}
                </span>
            </div>
        </div>

        <!-- Hero -->
        <section class="relative pt-[60px] pb-10">
            <div
                class="orb w-[520px] h-[520px] right-[-160px] top-[20px] bg-[#9b30ff]"
            />
            <div class="wrap">
                <HudRule
                    :label="`CASE / ${project.tag.toUpperCase()}`"
                    code="//"
                    :right="`LAUNCHED ${detail.launched}`"
                />

                <div
                    class="grid grid-cols-[1.3fr_0.7fr] gap-10 items-end"
                >
                    <div>
                        <div
                            class="font-[var(--mono)] text-[12px] tracking-[0.24em] text-[var(--pink)] uppercase mb-3"
                        >
                            {{ String(index + 1).padStart(2, "0") }} /
                            {{ String(projects.length).padStart(2, "0") }}
                            ·
                            {{ project.code }}
                        </div>
                        <GlitchText
                            as="h1"
                            :text="project.name"
                            class="text-[clamp(52px,9vw,120px)] m-0"
                        />
                        <div
                            class="font-[var(--mono)] text-[18px] text-white/75 mt-2 tracking-[0.02em]"
                        >
                            {{ detail.subtitle }}
                        </div>
                        <p
                            class="text-white/82 text-[17px] leading-[1.6] max-w-[640px] mt-5"
                        >
                            {{ detail.heroCopy }}
                        </p>
                        <div class="flex gap-3 mt-6 flex-wrap">
                            <button class="btn">◉ live_demo →</button>
                            <button class="btn purple">view_source</button>
                            <button class="btn ghost">share_file</button>
                        </div>
                    </div>

                    <!-- Meta panel -->
                    <div class="glass corners p-[22px]">
                        <div
                            class="font-[var(--mono)] text-[11px] tracking-[0.22em] text-white/60 mb-3.5"
                        >
                            ◆ META
                        </div>
                        <div
                            v-for="[k, v] in [
                                ['role', detail.role],
                                ['client', detail.client],
                                ['team', detail.team],
                                ['platform', detail.platform],
                                ['year', project.year],
                            ] as [string, string][]"
                            :key="k"
                            class="flex justify-between py-[9px] border-t border-dashed border-white/8 font-[var(--mono)] text-[13px]"
                        >
                            <span
                                class="text-white/50 tracking-[0.18em] uppercase text-[11px]"
                                >{{ k }}</span
                            >
                            <span class="text-white text-right">{{ v }}</span>
                        </div>
                        <div class="mt-3.5">
                            <div
                                class="font-[var(--mono)] text-[11px] tracking-[0.22em] text-white/60 mb-2 uppercase"
                            >
                                Stack
                            </div>
                            <div class="flex flex-wrap gap-1.5">
                                <Chip v-for="s in project.stack" :key="s">{{
                                    s
                                }}</Chip>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Hero capture -->
        <section class="py-5">
            <div class="wrap">
                <div class="glass corners p-1.5">
                    <div class="ph aspect-[21/9]">
                        HERO CAPTURE · 21:9 · DROP HERE
                    </div>
                </div>
            </div>
        </section>

        <!-- Outcomes -->
        <section class="py-10">
            <div class="wrap">
                <HudRule
                    label="OUTCOMES / METRICS"
                    code="01//"
                    right="POST_LAUNCH · 90D"
                />
                <div
                    class="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4"
                >
                    <div
                        v-for="([n, l], k) in outcomes"
                        :key="k"
                        class="glass corners py-[22px] px-5"
                    >
                        <div
                            class="font-[var(--mono)] text-[48px] font-extrabold tracking-[-0.02em] bg-linear-to-b from-white to-[var(--pink)] bg-clip-text text-transparent [text-shadow:0_0_30px_rgba(255,45,120,0.25)]"
                        >
                            {{ n }}
                        </div>
                        <div
                            class="font-[var(--mono)] text-[11px] tracking-[0.22em] text-white/60 mt-1.5 uppercase"
                        >
                            {{ l }}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Problem + Approach -->
        <section class="py-10">
            <div class="wrap">
                <HudRule label="BRIEF / SYSTEM_DESIGN" code="02//" />
                <div class="grid grid-cols-2 gap-8">
                    <div class="glass p-[26px]">
                        <div
                            class="font-[var(--mono)] text-[11px] tracking-[0.22em] text-[var(--pink)] mb-[10px]"
                        >
                            $ cat problem.md
                        </div>
                        <h3
                            class="font-[var(--mono)] m-0 mb-3 text-[22px]"
                        >
                            The problem
                        </h3>
                        <p class="text-white/82 leading-[1.7] text-[15px]">
                            {{ detail.problem }}
                        </p>
                    </div>
                    <div class="glass p-[26px]">
                        <div
                            class="font-[var(--mono)] text-[11px] tracking-[0.22em] text-[var(--purple)] mb-[10px]"
                        >
                            $ cat approach.md
                        </div>
                        <h3
                            class="font-[var(--mono)] m-0 mb-3 text-[22px]"
                        >
                            The approach
                        </h3>
                        <ol
                            class="text-white/82 leading-[1.7] text-[15px] pl-0 list-none"
                        >
                            <li
                                v-for="(s, k) in detail.approach"
                                :key="k"
                                class="relative pl-[34px] my-[10px]"
                            >
                                <span
                                    class="absolute left-0 top-[1px] font-[var(--mono)] text-[var(--pink)] text-[12px] border border-[var(--pink)] rounded-[3px] px-[6px] py-[1px] shadow-[0_0_8px_rgba(255,45,120,0.5)]"
                                >
                                    {{ String(k + 1).padStart(2, "0") }}
                                </span>
                                {{ s }}
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </section>

        <!-- Gallery -->
        <section class="py-10">
            <div class="wrap">
                <HudRule
                    label="GALLERY / CAPTURES"
                    code="03//"
                    :right="`${detail.gallery.length} ASSETS`"
                />
                <div
                    class="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-4"
                >
                    <div
                        v-for="(g, k) in detail.gallery"
                        :key="k"
                        class="glass corners p-1.5"
                    >
                        <div class="ph aspect-[16/10]">
                            {{ g }}
                        </div>
                        <div
                            class="flex justify-between py-[10px] px-3 font-[var(--mono)] text-[10px] tracking-[0.22em] text-white/55"
                        >
                            <span
                                >IMG_{{ String(k + 1).padStart(2, "0") }}</span
                            >
                            <span class="text-[var(--pink)]">◆</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Architecture diagram -->
        <section class="py-10">
            <div class="wrap">
                <HudRule
                    label="ARCHITECTURE / WIREFRAME"
                    code="04//"
                    right="SIMPLIFIED"
                />
                <div class="glass corners p-[26px]">
                    <svg viewBox="0 0 900 260" width="100%" class="block">
                        <defs>
                            <linearGradient id="arcG" x1="0" x2="1">
                                <stop offset="0" stop-color="#FF2D78" />
                                <stop offset="1" stop-color="#9B30FF" />
                            </linearGradient>
                        </defs>
                        <g
                            v-for="([l, x], k) in [
                                ['CLIENT', 60],
                                ['EDGE', 250],
                                ['CORE API', 440],
                                ['QUEUE', 630],
                                ['STORAGE', 820],
                            ] as [string, number][]"
                            :key="l"
                        >
                            <rect
                                :x="x - 70"
                                y="100"
                                width="140"
                                height="60"
                                fill="none"
                                stroke="url(#arcG)"
                                stroke-width="1.5"
                            />
                            <text
                                :x="x"
                                y="135"
                                text-anchor="middle"
                                fill="#fff"
                                class="font-[var(--mono)] text-[12px] tracking-[0.18em]"
                            >
                                {{ l }}
                            </text>
                            <line
                                v-if="k < 4"
                                :x1="x + 70"
                                y1="130"
                                :x2="x + 180"
                                y2="130"
                                stroke="url(#arcG)"
                                stroke-width="1"
                                stroke-dasharray="4 4"
                            />
                            <polygon
                                v-if="k < 4"
                                :points="`${x + 180},130 ${x + 170},125 ${x + 170},135`"
                                fill="#FF2D78"
                            />
                        </g>
                        <text
                            x="60"
                            y="60"
                            fill="rgba(255,255,255,.5)"
                            class="font-[var(--mono)] text-[10px] tracking-[0.22em]"
                        >
                            ◆ DATA FLOW · REQ/RES
                        </text>
                        <text
                            x="60"
                            y="220"
                            fill="rgba(255,255,255,.35)"
                            class="font-[var(--mono)] text-[10px] tracking-[0.22em]"
                        >
                            // rendered from config — replace with actual
                            architecture diagram
                        </text>
                    </svg>
                </div>
            </div>
        </section>

        <!-- Quote -->
        <section class="py-[50px]">
            <div class="wrap">
                <div
                    class="glass corners py-10 px-9 max-w-[900px] mx-auto"
                >
                    <div
                        class="font-[var(--mono)] text-[11px] tracking-[0.24em] text-[var(--pink)] uppercase"
                    >
                        ◆ CLIENT TRANSMISSION
                    </div>
                    <p
                        class="font-[var(--mono)] text-[22px] leading-[1.45] mt-4 mb-[18px] text-white tracking-[-0.005em]"
                    >
                        <span class="text-[var(--purple)]">"</span
                        >{{ detail.quote.text
                        }}<span class="text-[var(--purple)]">"</span>
                    </p>
                    <div
                        class="font-[var(--mono)] text-[12px] text-white/65 tracking-[0.14em]"
                    >
                        — {{ detail.quote.by }}
                    </div>
                </div>
            </div>
        </section>

        <!-- Prev / Next -->
        <section class="pt-[30px] pb-[60px]">
            <div class="wrap">
                <HudRule label="NAVIGATE / CASE_INDEX" code="05//" />
                <div class="grid grid-cols-2 gap-[18px]">
                    <NuxtLink
                        :to="`/case/${prev.code}`"
                        class="glass corners p-[22px] block"
                    >
                        <div
                            class="font-[var(--mono)] text-[11px] tracking-[0.22em] text-white/55"
                        >
                            ◄ PREV · {{ prev.code }}
                        </div>
                        <div
                            class="font-[var(--mono)] text-[22px] font-bold mt-1.5 text-white"
                        >
                            {{ prev.name }}
                        </div>
                        <div class="text-white/60 text-[13px] mt-1">
                            {{ prev.tag }}
                        </div>
                    </NuxtLink>
                    <NuxtLink
                        :to="`/case/${next.code}`"
                        class="glass corners p-[22px] block text-right"
                    >
                        <div
                            class="font-[var(--mono)] text-[11px] tracking-[0.22em] text-[var(--pink)]"
                        >
                            NEXT · {{ next.code }} ►
                        </div>
                        <div
                            class="font-[var(--mono)] text-[22px] font-bold mt-1.5 text-white"
                        >
                            {{ next.name }}
                        </div>
                        <div class="text-white/60 text-[13px] mt-1">
                            {{ next.tag }}
                        </div>
                    </NuxtLink>
                </div>
                <div class="flex justify-center mt-[30px]">
                    <NuxtLink to="/#projects"
                        ><button class="btn ghost">
                            ◄ back_to_index
                        </button></NuxtLink
                    >
                </div>
            </div>
        </section>

        <FooterSection />
    </div>
</template>

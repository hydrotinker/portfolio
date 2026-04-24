<script setup lang="ts">
import type { Project } from "~/types/components";

const projects = ref<Project[]>([
    // {
    //     code: "PRJ_001",
    //     name: "NEURALINK.SH",
    //     tag: "dev-tool",
    //     blurb: "Terminal-native LLM orchestrator. Chain local models, shell commands and HTTP calls into a single re-runnable pipeline.",
    //     stack: ["Rust", "TypeScript", "gRPC", "WebGPU"],
    //     metric: ["12k", "weekly runs"],
    //     year: "2025",
    //     live: true,
    // }
]);

const filter = ref("ALL");
const tags = computed(() => [
    "ALL",
    ...Array.from(
        new Set(projects.value.map((project) => project.tag.toUpperCase())),
    ),
]);
const list = computed(() =>
    filter.value === "ALL"
        ? projects.value
        : projects.value.filter((p) => p.tag.toUpperCase() === filter.value),
);
</script>

<template>
    <section
        id="projects"
        class="pt-[55px] sm:pt-[110px] pb-[0px] sm:pb-[60px]"
    >
        <div class="wrap">
            <HudRule
                label="WORK / CASE_FILES"
                code="02//"
                :right="`${projects.length} RECORDS`"
            />

            <div
                class="flex flex-col sm:flex-row justify-between sm:items-end mb-[22px] flex-wrap gap-3"
            >
                <GlitchText
                    as="h2"
                    text="SELECTED_WORK"
                    class="text-[clamp(30px,6vw,72px)] m-0"
                />
                <div v-if="projects.length > 0" class="flex gap-1.5 flex-wrap">
                    <button
                        v-for="tag in tags"
                        :key="tag"
                        @click="filter = tag"
                        class="[font-family:var(--mono)] text-[11px] tracking-[.18em] py-2 px-3 cursor-pointer rounded uppercase"
                        :class="
                            filter === tag
                                ? 'bg-gradient-to-r from-pink to-purple text-[#0A0A0A] border border-transparent font-bold'
                                : 'bg-transparent text-white/70 border border-white/15 font-medium'
                        "
                    >
                        {{ tag }}
                    </button>
                </div>
            </div>

            <div
                class="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-[22px]"
            >
                <ProjectCard
                    v-for="(p, i) in list"
                    :key="p.code"
                    :project="p"
                    :index="i"
                />
                <div
                    v-if="list.length === 0"
                    class="col-span-full glass px-[6px] sm:px-[18px] py-[16px] sm:py-[48px] flex flex-col items-center gap-3 text-center"
                >
                    <span
                        class="text-pink [font-family:var(--mono)] text-[22px]"
                        >◆</span
                    >
                    <div
                        class="[font-family:var(--mono)] text-[11px] tracking-[.22em] text-white/55 uppercase"
                    >
                        WILL BE REVEALED SOON
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

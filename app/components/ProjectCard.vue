<script setup lang="ts">
import type { Project } from "~/types/components";

defineProps<{ project: Project; index: number }>();

const hovered = ref(false);
</script>

<template>
    <article
        class="glass corners flex flex-col gap-[14px] p-[22px] transition-transform duration-[250ms] ease"
        :class="{ '-translate-y-[3px]': hovered }"
        @mouseenter="hovered = true"
        @mouseleave="hovered = false"
    >
        <div
            class="flex items-center justify-between [font-family:var(--mono)] text-[11px] tracking-[.22em] text-white/55"
        >
            <span>{{ project.code }}</span>
            <span
                :class="project.live ? 'text-[var(--pink)]' : 'text-white/40'"
            >
                {{ project.live ? "◉ LIVE" : "◎ ARCHIVED" }}
            </span>
        </div>

        <div class="ph aspect-video rounded-[6px]">
            PROJECT CAPTURE · {{ project.tag.toUpperCase() }}
        </div>

        <div class="flex items-baseline justify-between gap-3">
            <h3
                class="m-0 [font-family:var(--mono)] text-[22px] tracking-[-.01em]"
            >
                <span class="text-[var(--pink)]"
                    >{{ String(index + 1).padStart(2, "0") }}_</span
                >{{ project.name }}
            </h3>
            <span class="[font-family:var(--mono)] text-[11px] text-white/50">{{
                project.year
            }}</span>
        </div>

        <p class="m-0 text-sm leading-[1.55] text-white/75">
            {{ project.blurb }}
        </p>

        <div class="mt-1 flex flex-wrap gap-1.5">
            <Chip v-for="s in project.stack" :key="s" class="text-[10px]">{{
                s
            }}</Chip>
        </div>

        <div
            class="mt-2 flex items-center justify-between border-t border-dashed border-white/[.08] pt-3"
        >
            <div>
                <div
                    class="[font-family:var(--mono)] text-[22px] font-bold text-[var(--pink)] [text-shadow:0_0_12px_rgba(255,45,120,.6)]"
                >
                    {{ project.metric[0] }}
                </div>
                <div
                    class="[font-family:var(--mono)] text-[10px] tracking-[.2em] text-white/50 uppercase"
                >
                    {{ project.metric[1] }}
                </div>
            </div>
            <NuxtLink :to="`/case/${project.code}`">
                <button class="btn px-[14px] py-[10px]">open_case →</button>
            </NuxtLink>
        </div>
    </article>
</template>

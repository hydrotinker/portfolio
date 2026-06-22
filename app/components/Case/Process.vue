<script setup lang="ts">
import type { Detail } from "~/types/components";

interface ComponentProps extends Pick<Detail, "process"> {}

const props = defineProps<ComponentProps>();

const { showCounter } = useCount();

const weeks = computed(() =>
    props.process.reduce((sum, phase) => sum + phase.weeks, 0),
);
</script>
<template>
    <Section
        id="process"
        label="PROCESS / DEVELOPMENT_LOG"
        code="C//"
        :right="`${process.length} phases · ${weeks} weeks`"
        title="HOW_IT_WAS_BUILT"
        subtitle="The full development arc — every phase, what shipped from it, and how long it took."
    >
        <div
            class="hidden lg:grid gap-1.5 mb-[30px]"
            :style="{
                gridTemplateColumns: `repeat(${process.length}, minmax(0px,1fr))`,
            }"
        >
            <div v-for="(phase, index) of process" :key="index">
                <div
                    class="h-[6px] bg-gradient-to-r from-[var(--pink)]/35 to-[var(--purple)]/35 shadow-[0_0_10px_rgba(255,45,120,0.4)]"
                />
                <div
                    class="font-mono flex justify-between mt-2 text-[10px] tracking-[.18em] text-white/55"
                >
                    <span class="text-[var(--pink)]">
                        {{ showCounter(index) }}
                    </span>
                    <span class="uppercase">
                        {{ phase.name }}
                    </span>
                </div>
            </div>
        </div>
        <div class="relative pl-4 lg:pl-[56px]">
            <div
                class="absolute left-1 lg:left-[23px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-[var(--pink)] to-[var(--purple)]"
            />
            <div
                v-for="(phase, index) of process"
                :key="index"
                class="glass corners mb-4 last:mb-0 p-4"
            >
                <div
                    class="font-mono flex items-center flex-wrap gap-3 text-[11px] tracking-[0.2em] text-white/60"
                >
                    <span class="text-[var(--pink)] font-bold">
                        {{ showCounter(index) }}
                    </span>
                    <span class="text-[var(--purple)] uppercase">
                        {{ phase.name }}
                    </span>
                    <span class="text-white/45"> · {{ phase.weeks }} wk </span>
                </div>
                <h3
                    class="font-mono text-[22px] mt-[10px] mb-2 tracking-[.01em]"
                >
                    {{ phase.title }}
                </h3>
                <p
                    class="text-white/78 leading-[1.65] text-[15px] mb-[14px] max-w-[840px]"
                >
                    {{ phase.description }}
                </p>
                <div class="flex flex-wrap gap-[7px]">
                    <Chip
                        v-for="(tag, tagIndex) of phase.tags"
                        :key="tagIndex"
                        >{{ tag }}</Chip
                    >
                </div>
            </div>
        </div>
    </Section>
</template>

<script setup lang="ts">
import type { Detail } from "~/types/components";

interface ComponentProps extends Pick<
    Detail,
    "problem" | "context" | "goal" | "stack"
> {}

defineProps<ComponentProps>();
</script>
<template>
    <Section
        label="BRIEF / SITUATION_REPORT"
        code="A//"
        right="SECTION 1"
        title="THE_BRIEF"
        subtitle="What was broken, the constraints I was handed, and the bar we set before any code."
    >
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div class="glass corners p-4">
                <Label color="pink" text="THE PROBLEM" />
                <p
                    v-for="(paragraph, index) of problem"
                    :key="index"
                    class="text-white/82 leading-[1.7] text-[15px] mb-3"
                >
                    {{ paragraph }}
                </p>
            </div>
            <div class="glass corners p-4">
                <Label color="gray" text="THE CONTEXT" />
                <p
                    v-for="(paragraph, index) of context"
                    :key="index"
                    class="text-white/82 leading-[1.7] text-[15px] mb-3"
                >
                    {{ paragraph }}
                </p>
            </div>
            <div class="glass corners p-4">
                <Label color="gray" text="THE GOAL" />
                <p
                    v-for="(paragraph, index) of goal"
                    :key="index"
                    class="text-white/82 leading-[1.7] text-[15px] mb-3"
                >
                    {{ paragraph }}
                </p>
            </div>
        </div>
        <div class="glass corners mt-4 p-4">
            <div
                class="font-mono items-center gap-2 text-[11px] text-[var(--purple)] mb-4"
            >
                <Label color="gray" text="TECH STACK / TOOLCHAIN" />
                <div
                    class="grid grid-cols-[repeat(auto-fit,minmax(200px,_1fr))] gap-6"
                >
                    <div v-for="(stackItem, index) of stack" :key="index">
                        <div
                            class="font-mono text-[10px] tracking-[.22em] text-[var(--pink)] mb-3 uppercase"
                        >
                            {{ stackItem.label }}
                        </div>
                        <div class="flex flex-wrap gap-[7px]">
                            <Chip v-for="item of stackItem.items" :key="item">{{
                                item
                            }}</Chip>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Section>
</template>

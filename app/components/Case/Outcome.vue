<script setup lang="ts">
import type { Detail } from "~/types/components";

interface ComponentProps extends Pick<
    Detail,
    "outcomes" | "stats" | "learned" | "quote"
> {}

defineProps<ComponentProps>();

const { showCounter } = useCount();
</script>
<template>
    <Section
        label="OUTCOME / RESULTS_&_LEARNINGS"
        code="H//"
        right="POST-LAUNCH"
        title="THE_OUTCOME"
    >
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-4">
            <div class="col-span-3 glass corners flex flex-col gap-4 p-4">
                <Label color="pink" text="Results" />
                <p
                    v-for="(outcome, index) of outcomes"
                    :key="index"
                    class="text-white/84 leading-[1.72]"
                >
                    {{ outcome }}
                </p>
                <div
                    class="grid grid-cols-2 lg:grid-cols-4 gap-[14px] mt-[26px] pt-[22px] mb-4 border-t border-dashed border-white/10"
                >
                    <div v-for="(stat, index) of stats" :key="index">
                        <div
                            class="text-[22px] font-bold text-[var(--pink)] text-shadow-[0_0_12px_rgba(255,45,120,.5)] font-mono"
                        >
                            {{ stat.primary }}
                        </div>
                        <div
                            class="text-[10px] tracking-[.16em] uppercase text-white/50 mt-1 font-mono"
                        >
                            {{ stat.title }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-span-2 glass corners p-4">
                <Label color="purple" text="What I've learnt" />
                <div class="flex flex-col gap-[14px]">
                    <div
                        v-for="(learning, index) of learned"
                        class="flex gap-3 items-start"
                    >
                        <span
                            class="font-mono text-[var(--pink)] text-[12px] shrink-0 mt-[2px]"
                        >
                            {{ showCounter(index) }}
                        </span>
                        <span
                            class="text-white/80 leading-[1.55] text-[14px]"
                            >{{ learning }}</span
                        >
                    </div>
                </div>
            </div>
        </div>

        <div class="glass corners mt-4 p-4">
            <Label color="gray" text="FIELD_REPORT" />
            <div
                class="font-mono text-[clamp(20px,2.6vw,30px)] leading-[1.4] mt-6 tracking-[-.01em] max-w-[980px]"
            >
                <span class="text-[var(--pink)]">“</span>{{ quote.message
                }}<span class="text-[var(--purple)]">”</span>
            </div>
            <div
                class="font-mono mt-[22px] text-[13px] tracking-[0.08em] text-white/70"
            >
                — {{ quote.author }}
                <span class="text-[var(--pink)]">·</span>
                <span class="text-white/50 ml-2">
                    {{ quote.company }}
                </span>
            </div>
        </div>
    </Section>
</template>

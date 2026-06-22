<script setup lang="ts">
import type { Detail } from "~/types/components";

interface ComponentProps extends Pick<Detail, "blockers"> {}

defineProps<ComponentProps>();

const { showCounter } = useCount();
</script>
<template>
    <Section
        label="CONSTRAINTS / HARD_PROBLEMS"
        code="B//"
        :right="`${blockers.length} blockers`"
        title="THE_HARD_PARTS"
        subtitle="The problems that actually decided the architecture — and how each was solved."
    >
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div
                v-for="(blocker, index) of blockers"
                :key="index"
                class="glass corners flex flex-col gap-3 p-4"
            >
                <div
                    class="font-mono flex justify-between items-center text-[11px] tracking-[0.22em] text-white/55"
                >
                    <span class="text-[var(--pink)]"
                        >C-{{ showCounter(index) }}</span
                    >
                    <Label color="purple" :text="blocker.status" />
                </div>
                <h3
                    class="font-mono text-[19px] tracking-[.01em] leading-[1.25] font-semibold"
                >
                    {{ blocker.title }}
                </h3>
                <p class="text-white/74 tracking-[1.62] text-[14px]">
                    {{ blocker.description }}
                </p>
            </div>
        </div>
    </Section>
</template>

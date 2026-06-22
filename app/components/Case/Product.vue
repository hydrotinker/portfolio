<script setup lang="ts">
import type { Detail } from "~/types/components";

interface ComponentProps extends Pick<Detail, "features"> {}

defineProps<ComponentProps>();

const { showCounter } = useCount();
</script>
<template>
    <Section
        label="PRODUCT / SHIPPED_CAPABILITIES"
        code="F//"
        :right="`${features.length} FEATURES`"
        title="WHAT_IT_DOES"
    >
        <div class="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
            <div v-for="(feature, index) of features" class="glass corners p-4">
                <div
                    class="font-mono text-[11px] tracking-[0.22em] text-[var(--pink)] mb-3"
                >
                    {{ showCounter(index) }}
                </div>
                <h3
                    class="font-mono text-[18px] mb-[10px] tracking-[.01em] leading-[1.3]"
                >
                    {{ feature.title }}
                </h3>
                <p class="text-white/72 leading-[1.6] text-[14px]">
                    {{ feature.description }}
                </p>
            </div>
        </div>
    </Section>
</template>

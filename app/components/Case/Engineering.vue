<script setup lang="ts">
import type { Component } from "vue";
import type { Detail } from "~/types/components";
import PrjGidEcs from "~/components/Exhibit/PrjGidEcs.vue";
import PrjGidCss from "~/components/Exhibit/PrjGidCss.vue";
import PrjGidPca from "~/components/Exhibit/PrjGidPca.vue";

interface ComponentProps extends Pick<Detail, "exhibits"> {}

defineProps<ComponentProps>();

const exhibitComponents: Record<string, Component> = {
    PrjGidEcs,
    PrjGidCss,
    PrjGidPca,
};

const { showCounter } = useCount();
</script>
<template>
    <Section
        label="ENGINEERING / TECHNICAL_DEEP_DIVE"
        code="E//"
        :right="`${exhibits.length} EXHIBITS`"
        title="UNDER_THE_HOOD"
        subtitle="The load-bearing ideas, in code. The pieces the whole system rests on."
    >
        <div class="grid gap-[22px]">
            <div
                v-for="(exhibit, index) of exhibits"
                :key="index"
                class="grid grid-cols-1 lg:grid-cols-[minmax(0px,0.85fr)_minmax(0px,1.15fr)] gap-6 items-start"
            >
                <div>
                    <div
                        class="font-mono text-[11px] tracking-[.22em] text-[var(--pink)] mb-3"
                    >
                        EXHIBIT_{{ showCounter(index) }}
                    </div>
                    <h3
                        class="font-mono text-[24px] mb-[14px] tracking-[-.01em] leading-[1.2]"
                    >
                        {{ exhibit.title }}
                    </h3>
                    <p class="text-white/76 leading-[1.7] text-[15px]">
                        {{ exhibit.description }}
                    </p>
                </div>
                <div class="glass corners">
                    <div
                        class="flex justify-between items-center py-[10px] px-4 border-b border-white/8 bg-white/2 text-[11px] tracking-[0.2em] text-white/55"
                    >
                        <span>◆ {{ exhibit.codeHeader }}</span>
                        <span class="flex gap-[5px]">
                            <i
                                class="w-2 h-2 rounded-full bg-[var(--pink)] inline-block"
                            />
                            <i
                                class="w-2 h-2 rounded-full bg-[var(--purple)] inline-block"
                            />
                        </span>
                    </div>
                    <div class="max-h-[240px] overflow-y-auto">
                        <component
                            :is="exhibitComponents[exhibit.code]"
                            v-if="
                                exhibit.code && exhibitComponents[exhibit.code]
                            "
                        />
                    </div>
                </div>
            </div>
        </div>
    </Section>
</template>

<script setup lang="ts">
import type { DetailStat } from "~/types/components";

interface ComponentProps {
    stats: Array<DetailStat>;
}

defineProps<ComponentProps>();
</script>
<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[18px]">
        <div
            v-for="(stat, index) of stats"
            :key="index"
            class="glass corners p-4 font-mono"
        >
            <div
                class="text-[clamp(40px,5vw,64px)] font-bold tracking-[-0.02em] leading-[.9] bg-gradient-to-b from-white to-white/55 bg-clip-text text-transparent"
            >
                {{ stat.primary }}
            </div>
            <div
                class="text-[12px] tracking-[.18em] uppercase text-[var(--pink)] mt-[10px] font-bold"
            >
                {{ stat.title }}
            </div>
            <div class="text-[11px] text-white/55 mt-[6px] tracking-[.04em]">
                {{ stat.subtitle }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { SkillDomain } from "~/types/components";

defineProps<{ col: SkillDomain }>();

function segColor(index: number, on: boolean): string {
    if (!on) return "rgba(255,255,255,.06)";
    return index < 10 ? "var(--pink)" : "var(--purple)";
}
</script>

<template>
    <div class="glass corners p-5">
        <div
            class="flex items-center justify-between mb-[14px] [font-family:var(--mono)] text-[11px] tracking-[.22em] text-white/60"
        >
            <span>{{ col.code }}</span>
            <span class="text-[var(--purple)]">◆</span>
        </div>
        <div
            class="[font-family:var(--mono)] text-[22px] font-bold tracking-[-.01em] mb-[18px]"
        >
            {{ col.domain }}
        </div>

        <div v-for="item in col.items" :key="item.name" class="my-[14px]">
            <div
                class="flex items-baseline justify-between [font-family:var(--mono)] text-[13px] mb-1.5"
            >
                <span>{{ item.name }}</span>
                <span class="text-[var(--pink)] font-bold">{{ item.lvl }}</span>
            </div>
            <!-- Segmented HUD bar (20 segments) -->
            <div class="flex gap-0.5">
                <div
                    v-for="k in 20"
                    :key="k"
                    class="flex-1 h-2"
                    :style="{
                        background: segColor(
                            k - 1,
                            k <= Math.round(item.lvl / 5),
                        ),
                        boxShadow:
                            k <= Math.round(item.lvl / 5)
                                ? '0 0 6px currentColor'
                                : 'none',
                        color: k - 1 < 10 ? 'var(--pink)' : 'var(--purple)',
                    }"
                />
            </div>
        </div>
    </div>
</template>

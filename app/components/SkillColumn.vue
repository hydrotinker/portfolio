<script setup lang="ts">
import { ref } from "vue";
import type { SkillDomain } from "~/types/components";

defineProps<{ col: SkillDomain }>();

const hoveredState = ref<{ itemKey: string; seg: number } | null>(null);

function segColor(index: number, on: boolean): string {
    if (!on) return "rgba(255,255,255,.06)";
    return index < 10 ? "var(--pink)" : "var(--purple)";
}

function segTransform(itemKey: string, segIndex: number): string {
    if (!hoveredState.value || hoveredState.value.itemKey !== itemKey)
        return "scaleY(1)";
    const dist = Math.abs(segIndex - hoveredState.value.seg);
    if (dist === 0) return "scaleY(2)";
    if (dist === 1) return "scaleY(1.5)";
    if (dist === 2) return "scaleY(1.2)";
    return "scaleY(1)";
}
</script>

<template>
    <div class="glass corners grid row-span-3 grid-rows-subgrid gap-y-6 px-3 py-5">
        <div>
            <div
                class="flex items-center justify-between mx-2 mb-[14px] [font-family:var(--mono)] text-[11px] tracking-[.22em] text-white/60"
            >
                <span>{{ col.code }}</span>
                <span class="text-[var(--purple)]">◆</span>
            </div>
            <div
                class="mx-2 [font-family:var(--mono)] text-[22px] font-bold tracking-[-.01em]"
            >
                {{ col.domain }}
            </div>
        </div>

        <div class="contents">
            <div v-for="(group, index) in col.groups" :key="index" class="flow-root">
                <div
                    v-for="item in group"
                    :key="item.name"
                    class="my-[10px] px-2 py-1 cursor-default"
                >
                    <div
                        class="flex items-baseline justify-between gap-2 [font-family:var(--mono)] text-[13px] mb-1.5"
                    >
                        <span>{{ item.name }}</span>
                        <span class="text-[var(--pink)] font-bold">{{ item.lvl }}</span>
                    </div>
                    <!-- Segmented HUD bar (20 segments) -->
                    <div
                        class="grid gap-0.5 items-end"
                        style="
                            grid-template-columns: repeat(20, 1fr);
                            box-shadow: 0 0 8px rgba(255, 45, 120, 0.12);
                        "
                    >
                        <div
                            v-for="k in 20"
                            :key="k"
                            class="h-2 transition-transform duration-150 ease-out"
                            :style="{
                                background: segColor(
                                    k - 1,
                                    k <= Math.round(item.lvl / 5),
                                ),
                                transform: segTransform(item.name, k - 1),
                                transformOrigin: 'bottom',
                            }"
                            @mouseenter="
                                hoveredState = { itemKey: item.name, seg: k - 1 }
                            "
                            @mouseleave="hoveredState = null"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

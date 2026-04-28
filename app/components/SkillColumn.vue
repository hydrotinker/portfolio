<script setup lang="ts">
import { ref } from "vue";
import type { Certificates, SkillDomain } from "~/types/components";

defineProps<{ col: SkillDomain; certificates: Certificates }>();
defineEmits<{
    "show:certificates": [value: string];
}>();

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

const showCertificateNumber = (certificateNumber: number) => {
    const word = certificateNumber > 1 ? "certificates" : "certificate";
    return `${certificateNumber} ${word}`;
};
</script>

<template>
    <div class="glass corners px-3 py-5">
        <div
            class="flex items-center justify-between mx-2 mb-[14px] [font-family:var(--mono)] text-[11px] tracking-[.22em] text-white/60"
        >
            <span>{{ col.code }}</span>
            <span class="text-[var(--purple)]">◆</span>
        </div>
        <div
            class="mx-2 [font-family:var(--mono)] text-[22px] font-bold tracking-[-.01em] mb-[18px]"
        >
            {{ col.domain }}
        </div>

        <div
            v-for="item in col.items"
            :key="item.name"
            :class="[
                'my-[10px] px-2 py-1',
                {
                    'cursor-default': !certificates.hasOwnProperty(item.name),
                },
                {
                    'hover-corners hover:bg-white/4 cursor-pointer':
                        certificates.hasOwnProperty(item.name),
                },
            ]"
            @click="$emit('show:certificates', item.name)"
        >
            <div
                class="flex items-baseline justify-between [font-family:var(--mono)] text-[13px] mb-1.5"
            >
                <span>{{ item.name }}</span>
                <span class="flex items-center">
                    <span
                        v-if="certificates.hasOwnProperty(item.name)"
                        class="mr-1.5 text-white/55 text-[11px] uppercase"
                    >
                        {{
                            showCertificateNumber(
                                certificates[item.name]?.length ?? 0,
                            )
                        }}
                        ·
                    </span>
                    <span class="text-[var(--pink)] font-bold">{{
                        item.lvl
                    }}</span>
                </span>
            </div>
            <!-- Segmented HUD bar (20 segments) -->
            <div
                class="grid gap-0.5 items-end"
                style="grid-template-columns: repeat(20, 1fr)"
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
                        boxShadow:
                            k <= Math.round(item.lvl / 5)
                                ? '0 0 6px currentColor'
                                : 'none',
                        color: k - 1 < 10 ? 'var(--pink)' : 'var(--purple)',
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
</template>

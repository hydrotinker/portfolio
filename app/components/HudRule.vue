<script setup lang="ts">
withDefaults(
    defineProps<{
        label?: string;
        code?: string;
        accent?: "pink" | "purple";
        right?: string;
    }>(),
    {
        label: "SECTION",
        code: "//",
        accent: "pink",
    },
);
</script>

<template>
    <div
        class="hud-rule flex-col! sm:flex-row! items-start! sm:items-center! gap-1! sm:gap-3! mb-[36px]! sm:mb-[18px]! text-[9px]! sm:text-[11px]"
    >
        <span class="flex items-center gap-2 sm:gap-3">
            <span class="tick" :class="{ pu: accent === 'purple' }" />
            <span
                class="font-bold"
                :style="{
                    color:
                        accent === 'purple' ? 'var(--purple)' : 'var(--pink)',
                }"
                >{{ code }}</span
            >
            <span class="text-white font-bold leading-[.28em]">{{
                label
            }}</span>
        </span>
        <span class="bar hidden sm:inline" />
        <span class="flex items-center gap-2 sm:gap-3">
            <span v-if="right" class="order-2 sm:order-1 text-white/55">{{
                right
            }}</span>
            <span class="order-1 sm:order-2 tick pu" />
        </span>
    </div>
</template>

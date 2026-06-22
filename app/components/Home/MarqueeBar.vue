<script setup lang="ts">
import { useMainStore } from "../../stores/main";

const { marqueeBarItems } = storeToRefs(useMainStore());
const content = computed(() => [
    ...marqueeBarItems.value,
    ...marqueeBarItems.value,
]);
</script>

<template>
    <div class="relative">
        <RouterLink
            as="button"
            to="#contact"
            class="btn absolute top-[-30px] sm:top-[45px] left-[calc(50%_-_150px)] sm:left-[calc(50%_-_225px)] flex justify-center items-center w-[300px] sm:w-[450px] h-[50px] bg-black! text-sm tracking-[0.14em] z-10"
        >
            <span class="text-[var(--pink)]">↓</span>
            <span class="hidden sm:inline">init_contact — </span>
            let's build something together
            <span class="text-[var(--pink)]">↓</span>
        </RouterLink>
        <div class="marquee-wrap" role="presentation">
            <div class="marquee-track" aria-hidden="true">
                <span v-for="(t, i) in content" :key="i" class="marquee-item">
                    <span>◤ {{ t }}</span>
                    <span>/// available for commission</span>
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface ComponentProps {
    label: string;
    code: string;
    right: string;
    title: string;
    subtitle?: string;
}

defineProps<ComponentProps>();
</script>
<template>
    <section class="pt-6 pb-12">
        <HudRule :label="label" :code="code" :right="right" />
        <div class="flex justify-between items-end mb-[30px] flex-wrap gap-4">
            <GlitchText
                as="h2"
                :text="title"
                class="text-[clamp(34px,5vw,60px)]"
            />
            <p
                v-if="subtitle"
                class="max-w-[460px] text-white/72 leading-[1.6] text-[15px]"
            >
                {{ subtitle }}
            </p>
        </div>
        <slot />
    </section>
</template>

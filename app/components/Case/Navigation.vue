<script setup lang="ts">
import type { Project } from "~/types/components";

interface ComponentProps {
    prev: Project | null;
    next: Project | null;
}

defineProps<ComponentProps>();
</script>
<template>
    <section class="pt-[30px] pb-[60px]">
        <div class="wrap">
            <HudRule
                label="NAVIGATION / NEXT_FILES"
                code="//"
                right="CASE INDEX"
            />
            <div class="grid grid-cols-2 gap-[18px]">
                <NuxtLink
                    v-if="prev"
                    :to="`/case/${prev.code}`"
                    class="glass corners p-[22px] block"
                >
                    <div
                        class="font-[var(--mono)] text-[11px] tracking-[0.22em] text-white/55"
                    >
                        ◄ PREV · {{ prev.code }}
                    </div>
                    <div
                        class="font-[var(--mono)] text-[22px] font-bold mt-1.5 text-white"
                    >
                        {{ prev.name }}
                    </div>
                    <div class="text-white/60 text-[13px] mt-1">
                        {{ prev.tag }}
                    </div>
                </NuxtLink>
                <NuxtLink
                    v-if="next"
                    :to="`/case/${next.code}`"
                    class="glass corners p-[22px] block text-right"
                >
                    <div
                        class="font-[var(--mono)] text-[11px] tracking-[0.22em] text-[var(--pink)]"
                    >
                        NEXT · {{ next.code }} ►
                    </div>
                    <div
                        class="font-[var(--mono)] text-[22px] font-bold mt-1.5 text-white"
                    >
                        {{ next.name }}
                    </div>
                    <div class="text-white/60 text-[13px] mt-1">
                        {{ next.tag }}
                    </div>
                </NuxtLink>
            </div>
            <div class="flex justify-center mt-[30px]">
                <NuxtLink as="button" to="/#projects" class="btn ghost"
                    >◄ BACK TO ALL WORK
                </NuxtLink>
            </div>
        </div>
    </section>
</template>

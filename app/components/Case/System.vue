<script setup lang="ts">
import type { Detail, Project } from "~/types/components";

interface ComponentProps extends Pick<Project, "code" | "year"> {
    detail: Pick<Detail, "system" | "systemDescription">;
}
defineProps<ComponentProps>();
</script>
<template>
    <Section
        label="SYSTEM / ARCHITECTURE_MAP"
        code="D//"
        :right="`${detail.system.length} subsystems`"
        title="THE_ARCHITECTURE"
        :subtitle="detail.systemDescription"
    >
        <div class="glass corners p-4">
            <div class="flex items-stretch flex-wrap gap-1">
                <template
                    v-for="(subsystem, index) of detail.system"
                    :key="index"
                >
                    <div
                        class="relative flex-1 min-w-[170px] border border-white/14 rounded-[8px] bg-white/3 py-[14px] px-[16px] font-mono"
                    >
                        <div
                            class="absolute top-[10px] right-3 text-[9px] tracking-[.2em] text-[var(--pink)] uppercase"
                        >
                            {{ subsystem.tag }}
                        </div>
                        <div
                            class="text-[13px] text-white font-semibold tracking-[.02em]"
                        >
                            {{ subsystem.title }}
                        </div>
                        <div
                            class="text-[11px] text-white/55 mt-1 leading-[1.45]"
                        >
                            {{ subsystem.description }}
                        </div>
                    </div>
                    <div
                        v-if="index !== detail.system.length - 1"
                        class="flex justify-center items-center px-[6px] min-w-[34px]"
                    >
                        <span
                            class="text-[var(--pink)] text-[18px] text-shadow-[0_0_10px_rgba(255,45,120,.7)]"
                            >→</span
                        >
                    </div>
                </template>
                <div
                    class="my-6 pt-[18px] border-t border-dashed border-white/10 flex justify-between flex-wrap gap-3 w-full text-[11px] tracking-[.18em] text-white/50 uppercase"
                >
                    <span>◆ DATA FLOWS LEFT → RIGHT</span>
                    <span>{{ code }} · SYSTEM REV {{ year }}</span>
                </div>
            </div>
        </div>
    </Section>
</template>

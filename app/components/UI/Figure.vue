<script setup lang="ts">
import { ref } from "vue";
import type { DetailFigure } from "~/types/components";

interface ComponentProps {
    aspect: "21/8" | "16/9";
    figure?: DetailFigure;
    index: number;
}

defineProps<ComponentProps>();

const open = ref(false);
</script>
<template>
    <div class="glass corners p-1.5">
        <component
            :is="figure?.src ? 'button' : 'div'"
            type="button"
            class="ph w-full"
            :class="figure?.src ? 'group cursor-zoom-in' : ''"
            :style="{
                aspectRatio: aspect,
                backgroundImage: figure?.src
                    ? `url('${figure.src}')`
                    : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }"
            :aria-label="
                figure?.src ? `Expand FIG.00${index + 1}` : undefined
            "
            @click="figure?.src && (open = true)"
        >
            <template v-if="!figure"> FIGURE · {{ aspect }} </template>
            <span
                v-if="figure?.src"
                class="font-mono pointer-events-none absolute right-2.5 bottom-2.5 flex items-center gap-1.5 rounded border border-white/15 bg-black/55 px-2 py-1 text-[10px] tracking-[0.2em] text-white/80 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100"
            >
                ⤢ EXPAND
            </span>
        </component>
        <div
            class="font-mono flex justify-between space-between py-[11px] px-4 text-[11px] tracking-[0.2em] text-white/55 border-t border-white/6"
        >
            <span class="text-[11px] tracking-[0.2em] text-white/55">
                FIG.00{{ index + 1 }} · {{ figure?.title }}
            </span>
            <slot name="right" />
        </div>
        <ImageViewer
            v-if="figure?.src"
            v-model:open="open"
            :src="figure.src"
            :title="figure.title"
            :caption="`FIG.00${index + 1}`"
        />
    </div>
</template>

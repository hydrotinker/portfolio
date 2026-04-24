<script setup lang="ts">
import type { Post } from "~/types/components";

defineProps<{ post: Post; big?: boolean }>();
</script>

<template>
    <article
        class="glass corners p-5 flex flex-col gap-3"
        :class="{ 'col-span-2': big }"
    >
        <div
            class="flex justify-between font-[var(--mono)] text-[11px] tracking-[0.22em] text-white/55"
        >
            <span>{{ post.n }} · {{ post.date }}</span>
            <span class="text-[var(--pink)]">◆ {{ post.tag }}</span>
        </div>

        <div v-if="big" class="ph aspect-[16/7] rounded-[6px]">
            BLOG HERO · 16:7
        </div>

        <h3
            class="font-[var(--mono)] leading-[1.15] m-0 tracking-[-0.01em]"
            :class="big ? 'text-[28px]' : 'text-[19px]'"
        >
            {{ post.title }}
        </h3>

        <p class="text-white/72 leading-[1.55] text-sm m-0">
            {{ post.dek }}
        </p>

        <div
            class="flex justify-between items-center mt-auto pt-2.5 border-t border-dashed border-white/8"
        >
            <span class="font-[var(--mono)] text-[11px] text-white/55"
                >{{ post.read }} read</span
            >
            <span class="font-[var(--mono)] text-[12px] text-[var(--purple)]"
                >read_entry →</span
            >
        </div>
    </article>
</template>

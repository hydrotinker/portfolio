<script setup lang="ts">
import type { Post } from "~/types/components";

const posts = ref<Post[]>([]);
</script>

<template>
    <section id="blog" class="pt-[110px] pb-[60px]">
        <div class="wrap">
            <HudRule label="NOTES / DEVLOG" code="04//" right="RSS AVAILABLE" />
            <div
                class="flex justify-between items-end mb-[22px] flex-wrap gap-3"
            >
                <GlitchText
                    as="h2"
                    text="DEV_NOTES"
                    class="text-[clamp(40px,6vw,72px)] m-0"
                />
                <button class="btn ghost">view_archive / 48</button>
            </div>
            <div class="grid grid-cols-2 gap-[18px]">
                <BlogCard
                    v-for="(post, i) of posts"
                    :key="post.n"
                    :post="post"
                    :big="i === 0"
                />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed, nextTick } from "vue";

const props = defineProps<{
    title?: string;
    achievements?: string[];
    stack?: string[];
}>();

interface Line {
    u: string;
    t: string;
    c?: string;
}

const defaultLines: Line[] = [
    { u: "$", t: "whoami", c: "var(--pink)" },
    { u: ">", t: "aya.k // fullstack engineer, 7y" },
    { u: "$", t: "locate ./interests", c: "var(--pink)" },
    { u: ">", t: "[ distributed-sys, webgpu, weird-ui, cli-tools ]" },
    { u: "$", t: "ping home", c: "var(--pink)" },
    { u: ">", t: "35.0116°N 135.7681°E — 14ms ✓" },
];

const displayedLines = ref<Line[]>([]);
const typingText = ref("");
const isTypingCommand = ref(false);
const bodyEl = ref<HTMLElement | null>(null);
let animationId = 0;

function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function scrollBottom() {
    await nextTick();
    if (bodyEl.value) bodyEl.value.scrollTop = bodyEl.value.scrollHeight;
}

async function runAnimation(id: number) {
    displayedLines.value = [];
    typingText.value = "";
    isTypingCommand.value = false;

    const achievements = props.achievements;
    const stack = props.stack;

    if (!achievements?.length) {
        displayedLines.value = [...defaultLines];
        return;
    }

    await delay(120);
    if (animationId !== id) return;

    isTypingCommand.value = true;
    const cmd1 = "cat achievements.log";
    for (const char of cmd1) {
        typingText.value += char;
        await delay(42);
        if (animationId !== id) return;
        scrollBottom();
    }
    isTypingCommand.value = false;
    displayedLines.value.push({ u: "$", t: cmd1, c: "var(--pink)" });
    typingText.value = "";

    for (const a of achievements) {
        await delay(55);
        if (animationId !== id) return;
        displayedLines.value.push({ u: ">", t: a });
        scrollBottom();
    }

    if (!stack?.length) return;

    await delay(220);
    if (animationId !== id) return;

    isTypingCommand.value = true;
    const cmd2 = "ls ./stack";
    typingText.value = "";
    for (const char of cmd2) {
        typingText.value += char;
        await delay(42);
        if (animationId !== id) return;
        scrollBottom();
    }
    isTypingCommand.value = false;
    displayedLines.value.push({ u: "$", t: cmd2, c: "var(--pink)" });
    typingText.value = "";

    await delay(55);
    if (animationId !== id) return;
    displayedLines.value.push({ u: ">", t: stack.join("  ·  ") });
    scrollBottom();
}

function startAnimation() {
    animationId++;
    runAnimation(animationId);
}

onMounted(startAnimation);
watch(() => props.achievements, startAnimation);

const headerTitle = computed(() =>
    props.title
        ? `~/jobs/${props.title
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^a-z0-9-]/g, "")}`
        : "AYA.SH — /dev/ttys001",
);
</script>

<template>
    <div class="glass corners p-0 w-full max-w-[560px]">
        <div
            class="flex items-center justify-between px-[14px] py-[10px] border-b border-white/8 bg-white/2"
        >
            <div class="hidden sm:flex gap-1.5 mr-3">
                <span
                    class="inline-block size-[10px] rounded-full bg-(--pink) shadow-[0_0_8px_var(--pink)]"
                />
                <span
                    class="inline-block size-[10px] rounded-full bg-(--purple) shadow-[0_0_8px_var(--purple)]"
                />
                <span
                    class="inline-block size-[10px] rounded-full bg-white/25"
                />
            </div>
            <div
                class="font-(--mono) text-[9px] sm:text-[11px] tracking-[0.2em] text-white/60"
            >
                {{ headerTitle }}
            </div>
            <div
                class="hidden sm:block font-(--mono) text-[11px] text-white/40"
            >
                84×24
            </div>
        </div>
        <div
            ref="bodyEl"
            class="px-[18px] py-4 font-(--mono) text-[13px] leading-[1.5] sm:leading-[1.75] max-h-[380px] overflow-y-auto"
        >
            <div v-for="(l, i) in displayedLines" :key="i" class="mb-1 sm:mb-0">
                <span class="mr-2" :style="{ color: l.c || 'var(--purple)' }">{{
                    l.u
                }}</span>
                <span :class="l.u === '>' ? 'text-white/85' : 'text-white'">{{
                    l.t
                }}</span>
            </div>
            <div v-if="isTypingCommand">
                <span class="text-(--pink) mr-2">$</span>
                <span class="text-white">{{ typingText }}</span
                ><span class="blink">▌</span>
            </div>
            <div v-else>
                <span class="text-(--pink) mr-2">$</span>
                <span class="blink">▌</span>
            </div>
        </div>
    </div>
</template>

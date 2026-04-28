<script setup lang="ts">
const { regime, showBanner, accept, decline } = useConsent();

const config: Record<string, { header: string; body: string; accept: string; decline?: string }> = {
    russia: {
        header: "◆ NOTICE",
        body: "This site uses cookies for basic functionality.",
        accept: "[ ACKNOWLEDGE ]",
    },
    gdpr: {
        header: "◆ COOKIE POLICY",
        body: "This site uses Google Analytics to measure traffic. No ads. No personal profiles.",
        accept: "[ ACCEPT ]",
        decline: "[ DECLINE ]",
    },
    ccpa: {
        header: "◆ PRIVACY NOTICE",
        body: "This site uses Google Analytics. California residents may opt out of data collection.",
        accept: "[ ACCEPT ]",
        decline: "[ OPT OUT ]",
    },
};

const current = computed(() => config[regime.value] ?? config.gdpr);
</script>

<template>
    <Transition name="slide-up">
        <div
            v-if="showBanner"
            class="fixed bottom-4 left-4 z-50 w-80 rounded border border-zinc-700/60 bg-zinc-900/90 p-4 font-mono text-xs backdrop-blur-md shadow-[0_0_24px_rgba(236,72,153,0.08)]"
        >
            <p class="mb-2 text-pink-400 font-semibold tracking-widest">{{ current.header }}</p>
            <p class="mb-4 leading-relaxed text-zinc-400">{{ current.body }}</p>
            <div class="flex gap-2 flex-wrap">
                <button
                    class="border border-pink-500/50 px-3 py-1 text-pink-300 hover:bg-pink-500/10 transition-colors cursor-pointer"
                    @click="accept"
                >
                    {{ current.accept }}
                </button>
                <button
                    v-if="current.decline"
                    class="border border-zinc-600/50 px-3 py-1 text-zinc-500 hover:bg-zinc-700/20 transition-colors cursor-pointer"
                    @click="decline"
                >
                    {{ current.decline }}
                </button>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
    transition: transform 300ms ease, opacity 300ms ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
    transform: translateY(110%);
    opacity: 0;
}
</style>

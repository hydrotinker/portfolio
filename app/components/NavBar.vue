<script setup lang="ts">
import type { NavItem } from "~/types/components";

defineProps<{ items: NavItem[]; active: string }>();
const emit = defineEmits<{ "set:active": [value: string] }>();

const runtimeConfig = useRuntimeConfig();
const mobileOpen = ref(false);

function closeMenu() {
    mobileOpen.value = false;
}

function handleNavClick(id: string) {
    emit("set:active", id);
    closeMenu();
}
</script>

<template>
    <header
        class="sticky top-0 z-50 backdrop-blur-[14px] backdrop-saturate-[140%] bg-[linear-gradient(180deg,rgba(10,10,10,.85),rgba(10,10,10,.55))] border-b border-b-white/[.06]"
    >
        <div class="wrap flex items-center justify-between h-[66px]">
            <div class="flex items-center gap-[14px]">
                <div
                    class="w-7 h-7 p-px shrink-0"
                    style="
                        background: linear-gradient(135deg, #ff2d78, #9b30ff);
                    "
                >
                    <img
                        src="~/assets/images/logo.png"
                        width="25"
                        height="25"
                        alt="logo"
                        class="w-full h-full object-cover"
                    />
                </div>
                <div class="[font-family:var(--mono)] tracking-[.2em] text-xs">
                    <div class="text-white font-bold">
                        HYDROTINKER<span class="text-[var(--pink)]">_</span>
                    </div>
                    <div class="text-white/40 text-[10px]">
                        v{{ runtimeConfig.public.version }} / stable
                    </div>
                </div>
            </div>

            <!-- Desktop nav -->
            <nav class="hidden lg:flex gap-1">
                <NuxtLink
                    v-for="item in items"
                    :key="item.id"
                    :to="`/#${item.id}`"
                    @click="$emit('set:active', item.id)"
                    :class="[
                        'nav-link [font-family:var(--mono)] text-[11px] tracking-[.16em] uppercase px-3 py-2 rounded',
                        active === item.id
                            ? 'text-white bg-[linear-gradient(90deg,rgba(255,45,120,.18),rgba(155,48,255,.18))] border border-[rgba(255,45,120,.5)]'
                            : 'text-white/[.62] bg-transparent border border-transparent',
                    ]"
                    >{{ item.label }}</NuxtLink
                >
            </nav>

            <div class="hidden lg:flex items-center gap-2.5">
                <Chip>online</Chip>
                <span class="kbd">⌘K</span>
            </div>

            <!-- Mobile burger -->
            <button
                class="lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] rounded focus:outline-none"
                :aria-label="mobileOpen ? 'Close menu' : 'Open menu'"
                @click="mobileOpen = !mobileOpen"
            >
                <span
                    :class="[
                        'block w-5 h-[1.5px] bg-white transition-all duration-300 origin-center',
                        mobileOpen ? 'translate-y-[6.5px] rotate-45' : '',
                    ]"
                />
                <span
                    :class="[
                        'block w-5 h-[1.5px] bg-white transition-all duration-300',
                        mobileOpen ? 'opacity-0 scale-x-0' : '',
                    ]"
                />
                <span
                    :class="[
                        'block w-5 h-[1.5px] bg-white transition-all duration-300 origin-center',
                        mobileOpen ? '-translate-y-[6.5px] -rotate-45' : '',
                    ]"
                />
            </button>
        </div>

        <div
            class="h-0.5 bg-[linear-gradient(90deg,transparent,rgba(255,45,120,.6)_20%,rgba(155,48,255,.6)_80%,transparent)] shadow-[0_0_14px_rgba(255,45,120,.4)]"
        />
    </header>

    <!-- Mobile nav overlay -->
    <Transition name="overlay">
        <div
            v-if="mobileOpen"
            class="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            @click="closeMenu"
        />
    </Transition>

    <!-- Mobile nav drawer -->
    <Transition name="drawer">
        <nav
            v-if="mobileOpen"
            class="lg:hidden fixed top-0 right-0 z-50 h-full w-64 flex flex-col bg-[rgba(10,10,10,.97)] border-l border-l-white/[.06]"
        >
            <!-- Drawer header -->
            <div
                class="flex items-center justify-between h-[66px] px-5 border-b border-b-white/[.06]"
            >
                <span
                    class="[font-family:var(--mono)] text-[10px] tracking-[.2em] text-white/40 uppercase"
                    >Navigation</span
                >
                <button
                    class="w-7 h-7 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                    aria-label="Close menu"
                    @click="closeMenu"
                >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                            d="M1 1l12 12M13 1L1 13"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                        />
                    </svg>
                </button>
            </div>

            <!-- Drawer links -->
            <div class="flex flex-col gap-1 p-4 flex-1">
                <NuxtLink
                    v-for="item in items"
                    :key="item.id"
                    :to="`/#${item.id}`"
                    @click="handleNavClick(item.id)"
                    :class="[
                        '[font-family:var(--mono)] text-[11px] tracking-[.16em] uppercase px-4 py-3 rounded w-full',
                        active === item.id
                            ? 'text-white bg-[linear-gradient(90deg,rgba(255,45,120,.18),rgba(155,48,255,.18))] border border-[rgba(255,45,120,.5)]'
                            : 'text-white/[.62] bg-transparent border border-transparent hover:text-white hover:border-white/10',
                    ]"
                    >{{ item.label }}</NuxtLink
                >
            </div>

            <!-- Drawer footer -->
            <div
                class="p-4 border-t border-t-white/[.06] flex items-center gap-2.5"
            >
                <Chip>online</Chip>
                <span class="kbd">⌘K</span>
            </div>

            <!-- Pink accent line on the left edge -->
            <div
                class="absolute top-0 left-0 w-0.5 h-full bg-[linear-gradient(180deg,transparent,rgba(255,45,120,.6)_20%,rgba(155,48,255,.6)_80%,transparent)]"
            />
        </nav>
    </Transition>
</template>

<style scoped>
.nav-link {
    position: relative;
    overflow: hidden;
    transition: transform 0.15s ease;
}

.nav-link::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
        90deg,
        rgba(255, 45, 120, 0.25),
        rgba(155, 48, 255, 0.25)
    );
    opacity: 0;
    transition: opacity 0.2s ease;
}

.nav-link::after {
    content: "";
    position: absolute;
    inset: -2px;
    border-radius: 6px;
    pointer-events: none;
    box-shadow:
        0 0 18px rgba(255, 45, 120, 0.7),
        0 0 30px rgba(155, 48, 255, 0.5);
    opacity: 0;
    transition: opacity 0.25s ease;
}

.nav-link:hover {
    animation: btnPulse 1.1s ease-in-out infinite;
}

.nav-link:hover::before {
    opacity: 1;
}

.nav-link:hover::after {
    opacity: 1;
}

.overlay-enter-active,
.overlay-leave-active {
    transition: opacity 0.25s ease;
}
.overlay-enter-from,
.overlay-leave-to {
    opacity: 0;
}

.drawer-enter-active,
.drawer-leave-active {
    transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}
.drawer-enter-from,
.drawer-leave-to {
    transform: translateX(100%);
}
</style>

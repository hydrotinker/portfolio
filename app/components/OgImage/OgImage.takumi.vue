<script setup lang="ts">
const { title = "Hydrotinker", description = "" } = defineProps<{
    title?: string;
    description?: string;
}>();

const words = title.split(" ");
const line1 = words[0] ?? title;
const line2 = words.slice(1).join(" ") || "SENIOR FULLSTACK DEVELOPER";
</script>

<template>
    <div
        class="w-full h-full flex bg-[#0a0a0a] relative overflow-hidden font-mono"
    >
        <!-- Gradient orbs -->
        <div
            class="absolute -top-[120px] -right-[120px] w-[580px] h-[580px] rounded-full bg-[rgba(155,48,255,0.18)] blur-[80px] pointer-events-none"
        />
        <div
            class="absolute -bottom-[80px] -left-[80px] w-[460px] h-[460px] rounded-full bg-[rgba(255,45,120,0.13)] blur-[80px] pointer-events-none"
        />

        <!-- Grid mesh -->
        <svg
            class="absolute inset-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <pattern
                    id="grid"
                    width="64"
                    height="64"
                    patternUnits="userSpaceOnUse"
                >
                    <path
                        d="M 64 0 L 0 0 0 64"
                        fill="none"
                        stroke="rgba(255,255,255,0.045)"
                        stroke-width="1"
                    />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        <!-- Accent lines -->
        <div
            class="absolute bottom-0 left-0 right-0 h-[2px] bg-[linear-gradient(90deg,transparent,rgba(255,45,120,0.6)_20%,rgba(155,48,255,0.6)_80%,transparent)]"
        />
        <div
            class="absolute top-0 left-0 right-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,45,120,0.35)_30%,rgba(155,48,255,0.35)_70%,transparent)]"
        />

        <!-- Corner brackets -->
        <div
            class="absolute top-6 left-6 w-5 h-5 border-t-2 border-l-2 border-[#ff2d78]"
        />
        <div
            class="absolute top-6 right-6 w-5 h-5 border-t-2 border-r-2 border-[#9b30ff]"
        />
        <div
            class="absolute bottom-6 left-6 w-5 h-5 border-b-2 border-l-2 border-[#ff2d78]"
        />
        <div
            class="absolute bottom-6 right-6 w-5 h-5 border-b-2 border-r-2 border-[#9b30ff]"
        />

        <!-- Main layout -->
        <div
            class="relative z-[2] flex flex-col justify-between w-full h-full px-16 py-14"
        >
            <!-- Header -->
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-[14px]">
                    <div
                        class="w-[30px] h-[30px] p-px shrink-0 bg-[linear-gradient(135deg,#ff2d78,#9b30ff)]"
                    >
                        <div
                            class="w-full h-full bg-[#0a0a0a] flex items-center justify-center"
                        >
                            <img
                                src="~/assets/images/logo.png"
                                width="25"
                                height="25"
                                alt="logo"
                                class="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div class="flex flex-col gap-[2px]">
                        <div class="flex items-baseline">
                            <span
                                class="text-white font-bold text-[15px] tracking-[0.2em]"
                                >HYDROTINKER</span
                            >
                            <span class="text-[#ff2d78] font-bold text-[15px]"
                                >_</span
                            >
                        </div>
                        <span
                            class="text-white/40 text-[10px] tracking-[0.22em]"
                            >v2.0 / stable</span
                        >
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <span
                        class="text-white/45 text-[11px] tracking-[0.22em] uppercase"
                        >BUILD_2026.04 —</span
                    >
                    <span
                        class="text-[#ff2d78] text-[11px] tracking-[0.22em] uppercase"
                        >ONLINE</span
                    >
                </div>
            </div>

            <!-- Title block -->
            <div class="flex flex-col">
                <span
                    class="font-display text-[#ff2d78] text-[12px] tracking-[0.28em] uppercase mb-[18px]"
                    >// personnel file · access granted</span
                >
                <span
                    class="text-[#ff2d78] font-extrabold text-[76px] leading-[0.88] tracking-[-0.02em] uppercase"
                    >{{ line1 }}</span
                >
                <span
                    class="text-white font-extrabold text-[38px] leading-[0.88] tracking-[-0.02em]"
                    >{{ line2 }}</span
                >
                <p
                    v-if="description"
                    class="text-white/70 text-[20px] leading-[1.55] max-w-[700px] mt-5 m-0"
                >
                    {{ description }}
                </p>
            </div>

            <!-- Footer -->
            <div
                class="flex items-center justify-between border-t border-white/[0.08] pt-[22px]"
            >
                <div class="flex items-center gap-[10px]">
                    <div
                        class="flex items-center gap-[6px] border border-white/[0.14] rounded-full px-3 py-[5px]"
                    >
                        <div
                            class="w-[6px] h-[6px] rounded-full bg-[#ff2d78] shadow-[0_0_8px_#ff2d78] shrink-0"
                        />
                        <span
                            class="text-white/85 text-[11px] tracking-[0.18em]"
                            >fullstack</span
                        >
                    </div>
                    <div
                        class="flex items-center gap-[6px] border border-[rgba(155,48,255,0.4)] rounded-full px-3 py-[5px]"
                    >
                        <div
                            class="w-[6px] h-[6px] rounded-full bg-[#9b30ff] shadow-[0_0_8px_#9b30ff] shrink-0"
                        />
                        <span
                            class="text-white/85 text-[11px] tracking-[0.18em]"
                            >backend</span
                        >
                    </div>
                    <div
                        class="flex items-center gap-[6px] border border-white/[0.14] rounded-full px-3 py-[5px]"
                    >
                        <div
                            class="w-[6px] h-[6px] rounded-full bg-[#ff2d78] shadow-[0_0_8px_#ff2d78] shrink-0"
                        />
                        <span
                            class="text-white/85 text-[11px] tracking-[0.18em]"
                            >frontend</span
                        >
                    </div>
                </div>
                <span class="text-white/35 text-[13px] tracking-[0.16em]"
                    >hydrotinker.online</span
                >
            </div>
        </div>
    </div>
</template>

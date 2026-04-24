<script setup lang="ts">
const name = ref("");
const email = ref("");
const msg = ref("");
const sent = ref(false);
const loading = ref(false);
const error = ref("");
const ackId = ref(0);

async function submit() {
    loading.value = true;
    error.value = "";
    try {
        await $fetch("/api/contact", {
            method: "POST",
            body: { name: name.value, email: email.value, msg: msg.value },
        });
        ackId.value = Math.floor(Math.random() * 9000 + 1000);
        sent.value = true;
        name.value = "";
        email.value = "";
        msg.value = "";
    } catch {
        error.value = "TRANSMISSION FAILED · RETRY";
    } finally {
        loading.value = false;
    }
}

const contacts = [
    [
        "EMAIL",
        "hydrotinker@gmail.com",
        "text-pink",
        "mailto:hydrotinker@gmail.com",
    ],
    ["TELEGRAM", "@sojinrose", "text-purple", "tg:sojinrose"],
    [
        "GITHUB",
        "github.com/hydrotinker",
        "text-pink",
        "https://github.com/hydrotinker",
    ],
    ["[CLASSIFIED]", "[ACCESS DENIED]", "text-purple", ""],
];

const availability = [
    ["Q1 · 2026", "booked", 0.95],
    ["Q2 · 2026", "open", 0.35],
    ["Q3 · 2026", "open", 0.1],
    ["Q4 · 2026", "open", 0],
] as const;

const inputClass =
    "w-full bg-white/3 text-white border border-white/12 rounded px-[14px] py-3 [font-family:var(--mono)] text-sm outline-none";
const labelClass =
    "[font-family:var(--mono)] text-[11px] tracking-[.22em] text-pink uppercase mb-2 block";
</script>

<template>
    <section id="contact" class="pt-[110px] pb-[20px] sm:pb-[60px]">
        <div class="wrap">
            <HudRule
                label="PING / SECURE_CHANNEL"
                code="05//"
                right="PGP: F29A 3B12 7701"
            />

            <div class="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-8">
                <!-- Form column -->
                <div>
                    <GlitchText
                        as="h2"
                        text="INIT_CONTACT"
                        class="text-[clamp(30px,6vw,72px)] mt-0 mb-4"
                    />
                    <p
                        class="text-white/78 max-w-[540px] leading-relaxed mb-[26px] text-sm sm:text-base"
                    >
                        Commissions open for Q2 2026. Prefer projects with
                        interesting idea or technical weight — performance
                        budgets, challenging goals, anything running on an edge
                        runtime. Reply within 48h.
                    </p>

                    <div class="glass corners p-[22px]">
                        <form @submit.prevent="submit">
                            <div
                                class="grid grid-cols-1 lg:grid-cols-2 gap-[14px] mb-[14px]"
                            >
                                <div>
                                    <label :class="labelClass"
                                        >$ your_name</label
                                    >
                                    <input
                                        v-model="name"
                                        :class="inputClass"
                                        placeholder="e.g. Jane Doe"
                                        required
                                    />
                                </div>
                                <div>
                                    <label :class="labelClass"
                                        >$ your_email</label
                                    >
                                    <input
                                        v-model="email"
                                        type="email"
                                        :class="inputClass"
                                        placeholder="you@domain.com"
                                        required
                                    />
                                </div>
                            </div>
                            <label :class="labelClass">$ payload</label>
                            <textarea
                                v-model="msg"
                                :class="`${inputClass} min-h-[145px] resize-y`"
                                placeholder="Project idea, scope, timeline, constraints..."
                                required
                            />
                            <div class="flex items-center justify-end mt-4">
                                <button
                                    class="btn"
                                    type="submit"
                                    :disabled="loading || sent"
                                >
                                    transmit ►
                                </button>
                            </div>
                        </form>
                        <div
                            class="[font-family:var(--mono)] text-[11px] mt-3 min-h-[1.5em]"
                        >
                            <span v-if="sent" class="text-pink"
                                >▶ TRANSMISSION SENT · ACK {{ ackId }}</span
                            >
                            <span v-else-if="error" class="text-red-400"
                                >▶ {{ error }}</span
                            >
                            <span v-else-if="loading" class="text-white/55"
                                >◆ transmitting...</span
                            >
                        </div>
                    </div>
                </div>

                <!-- Sidebar -->
                <div class="grid gap-4 content-start">
                    <component
                        :is="l ? 'a' : 'div'"
                        v-for="[k, v, c, l] in contacts"
                        :key="k"
                        :href="l || undefined"
                        :target="l ? '_blank' : undefined"
                        :rel="l ? 'noopener noreferrer' : undefined"
                        class="glass px-[18px] py-[14px] flex justify-between items-center no-underline group"
                        :class="l ? 'cursor-pointer' : ''"
                    >
                        <div>
                            <div
                                class="[font-family:var(--mono)] text-[10px] tracking-[0.24em] text-white/55"
                            >
                                {{ k }}
                            </div>
                            <div
                                class="[font-family:var(--mono)] text-[15px] text-white mt-0.5"
                            >
                                {{ v }}
                            </div>
                        </div>
                        <span
                            :class="[
                                c,
                                '[font-family:var(--mono)]',
                                'text-[11px]',
                                l
                                    ? 'transition-all duration-200 group-hover:scale-150 group-hover:rotate-45'
                                    : '',
                            ]"
                            >◆</span
                        >
                    </component>

                    <!-- Availability -->
                    <div class="glass corners p-[18px]">
                        <div
                            class="[font-family:var(--mono)] text-[11px] tracking-[0.22em] text-white/60 mb-[10px]"
                        >
                            ◆ AVAILABILITY
                        </div>
                        <div
                            v-for="[k, s, v] in availability"
                            :key="k"
                            class="my-[10px]"
                        >
                            <div
                                class="flex justify-between [font-family:var(--mono)] text-xs"
                            >
                                <span>{{ k }}</span>
                                <span
                                    :class="
                                        s === 'open'
                                            ? 'text-pink'
                                            : 'text-white/50'
                                    "
                                    >{{ s.toUpperCase() }}</span
                                >
                            </div>
                            <div class="h-1 bg-white/6 mt-[6px]">
                                <div
                                    :style="{ width: v * 100 + '%' }"
                                    :class="
                                        s === 'open'
                                            ? 'h-full bg-gradient-to-r from-pink to-purple'
                                            : 'h-full bg-white/22'
                                    "
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

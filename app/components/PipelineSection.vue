<script setup lang="ts">
const steps = [
    {
        n: "01",
        code: "SYN",
        title: "Discovery Sync",
        dur: "30–45 min · free",
        blurb: "A short intro call. We map the problem, constraints, users and non-negotiables. If I'm not the right fit I'll say so and point you elsewhere.",
        deliver: ["Call recap memo", "Scope sketch"],
    },
    {
        n: "02",
        code: "BRF",
        title: "Brief & Proposal",
        dur: "3–5 days",
        blurb: "I draft a written brief with goals, scope, milestones, risks and a fixed-fee or T&M proposal. One revision round included.",
        deliver: ["Project brief", "Fee proposal", "Timeline gantt"],
    },
    {
        n: "03",
        code: "SGN",
        title: "Agreements & Kickoff",
        dur: "2–3 days",
        blurb: "Offer agreement and NDA signed. Kickoff call, shared channel opened, repo and tooling provisioned.",
        deliver: ["Signed contract", "Shared drive", "Comms channel"],
    },
    {
        n: "04",
        code: "DSN",
        title: "Design & Prototype",
        dur: "1–3 weeks",
        blurb: "Wireframes, hi-fi mockups and a clickable prototype. You review in-browser, leave comments inline, we iterate.",
        deliver: ["Figma / prototype", "Design doc"],
    },
    {
        n: "05",
        code: "BLD",
        title: "Build & Ship",
        dur: "2–10 weeks",
        blurb: "Weekly demo, biweekly invoice. Staging URL on day one. Code is yours from commit zero; CI, tests, and runbooks included.",
        deliver: ["Staging env", "CI/CD", "Tests"],
    },
    {
        n: "06",
        code: "LNC",
        title: "Launch & Handover",
        dur: "1 week",
        blurb: "Production cutover, incident playbook, a 60-minute handover session, and 30 days of post-launch support baked in.",
        deliver: ["Prod deploy", "Runbook", "Handover session"],
    },
];

const docs = [
    {
        code: "DOC_01",
        title: "Offer Agreement",
        desc: "Master service agreement & statement of work template.",
        kind: "PDF · v2.4",
        required: true,
    },
    {
        code: "DOC_02",
        title: "NDA — Mutual",
        desc: "Two-way non-disclosure for sensitive project scope.",
        kind: "PDF · v1.8",
        required: true,
    },
    {
        code: "DOC_03",
        title: "Data Processing Addendum",
        desc: "GDPR / CCPA compliant DPA for any user-data handling.",
        kind: "PDF · v1.1",
        required: true,
    },
    {
        code: "DOC_04",
        title: "Rate Card",
        desc: "Day rates, retainer tiers, and expense policy.",
        kind: "PDF · 2026",
        required: true,
    },
    {
        code: "DOC_05",
        title: "Project Brief Template",
        desc: "Fill-in brief to jumpstart the discovery call.",
        kind: "DOCX",
        required: false,
    },
    {
        code: "DOC_06",
        title: "Security & Access Policy",
        desc: "How I handle credentials, production access and audits.",
        kind: "PDF",
        required: false,
    },
];
</script>

<template>
    <section id="pipeline" class="pt-[110px] pb-[20px] sm:pb-[60px] relative">
        <div class="wrap">
            <HudRule
                label="PROCESS / ENGAGEMENT_PIPELINE"
                code="06//"
                right="6 STAGES · AVG 6–12 WKS"
            />

            <div
                class="flex justify-between items-end mb-[28px] flex-wrap gap-3"
            >
                <GlitchText
                    as="h2"
                    text="HOW_WE_WORK"
                    class="text-[clamp(30px,6vw,72px)] m-0"
                />
                <p
                    class="max-w-[480px] text-white/75 m-0 leading-[1.45] sm:leading-[1.6] text-sm sm:text-base"
                >
                    Six predictable stages from first call to production
                    hand-off. No surprises on scope, invoices, or ownership.
                </p>
            </div>

            <!-- Step rail -->
            <div class="grid grid-cols-6 gap-[2px] mb-[22px] relative">
                <div v-for="(s, i) in steps" :key="s.n" class="relative px-1">
                    <div
                        :style="{
                            height: '6px',
                            background: `linear-gradient(90deg, rgba(255,45,120,${0.3 + i * 0.1}), rgba(155,48,255,${0.3 + i * 0.1}))`,
                            boxShadow: '0 0 10px rgba(255,45,120,.4)',
                        }"
                    />
                    <div
                        class="flex justify-between mt-2 font-mono text-[10px] tracking-[.22em] text-white/55"
                    >
                        <span class="text-[var(--pink)]">{{ s.n }}</span>
                        <span>{{ s.code }}</span>
                    </div>
                </div>
            </div>

            <!-- Cards -->
            <div
                class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[18px]"
            >
                <div
                    v-for="s in steps"
                    :key="s.n"
                    class="glass corners p-[22px] flex flex-col gap-[10px]"
                >
                    <div
                        class="flex justify-between items-center font-mono text-[11px] tracking-[.22em] text-white/60"
                    >
                        <span
                            ><span class="text-[var(--pink)]">{{ s.n }}</span> ·
                            {{ s.code }}</span
                        >
                        <span class="text-[var(--purple)]">{{ s.dur }}</span>
                    </div>
                    <h3
                        class="font-mono text-[22px] mt-[4px] mb-[2px] tracking-[-0.01em]"
                    >
                        {{ s.title }}
                    </h3>
                    <p
                        class="text-[rgba(255,255,255,.78)] leading-[1.55] text-sm m-0"
                    >
                        {{ s.blurb }}
                    </p>

                    <div
                        class="h-25 mt-auto pt-3 border-t border-dashed border-white/[.08]"
                    >
                        <div
                            class="font-mono text-[10px] tracking-[.22em] text-white/50 uppercase mb-2"
                        >
                            ◆ Deliverables
                        </div>
                        <div class="flex flex-wrap gap-[6px]">
                            <Chip v-for="d in s.deliver" :key="d">{{ d }}</Chip>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Documents -->
            <div v-if="false" class="mt-14">
                <HudRule
                    label="DOCUMENTS / MANDATORY_FILES"
                    code="06.1//"
                    right="6 FILES · KEEP ON RECORD"
                />
                <div
                    class="flex justify-between items-end mb-[22px] flex-wrap gap-3"
                >
                    <GlitchText
                        as="h2"
                        text="DOC_VAULT"
                        class="text-[clamp(32px,4.8vw,56px)] m-0"
                    />
                    <p
                        class="max-w-[460px] text-[rgba(255,255,255,.72)] m-0 leading-[1.55] text-sm"
                    >
                        Standard templates I work from. Required docs are
                        flagged — they're signed before any code is written.
                    </p>
                </div>

                <div class="glass corners p-0 overflow-hidden">
                    <!-- Header row -->
                    <div
                        class="grid grid-cols-[90px_1fr_160px_130px_140px] px-[18px] py-3 border-b border-white/[.08] bg-white/[.02] font-mono text-[10px] tracking-[.22em] text-white/55 uppercase"
                    >
                        <span>ID</span>
                        <span>DOCUMENT</span>
                        <span>FORMAT</span>
                        <span>STATUS</span>
                        <span class="text-right">ACTION</span>
                    </div>
                    <div
                        v-for="(d, i) in docs"
                        :key="d.code"
                        class="grid grid-cols-[90px_1fr_160px_130px_140px] px-[18px] py-4 items-center font-mono"
                        :class="{
                            'border-b border-white/[.05]': i < docs.length - 1,
                            'bg-white/[.012]': i % 2,
                        }"
                    >
                        <span
                            class="text-[var(--pink)] text-[12px] tracking-[.16em]"
                            >{{ d.code }}</span
                        >
                        <div>
                            <div class="text-[15px] text-white font-semibold">
                                {{ d.title }}
                            </div>
                            <div class="text-xs text-white/60 mt-[2px]">
                                {{ d.desc }}
                            </div>
                        </div>
                        <span
                            class="text-[11px] text-white/65 tracking-[.14em]"
                            >{{ d.kind }}</span
                        >
                        <span class="text-[10px] tracking-[.22em]">
                            <span
                                v-if="d.required"
                                class="text-[var(--pink)] border border-[var(--pink)] px-2 py-[3px] rounded-[3px] shadow-[0_0_10px_rgba(255,45,120,.35)]"
                                >◉ REQUIRED</span
                            >
                            <span
                                v-else
                                class="text-white/55 border border-white/[.18] px-2 py-[3px] rounded-[3px]"
                                >◎ OPTIONAL</span
                            >
                        </span>
                        <div class="text-right">
                            <button class="btn px-3 py-2 text-[10px]">
                                download ↓
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    class="mt-[18px] flex justify-between items-center flex-wrap gap-3 font-mono text-[11px] tracking-[.18em] text-white/55 uppercase"
                >
                    <span
                        >◆ all templates reviewed by counsel · reissued
                        2026.Q1</span
                    >
                    <span>pgp / s-mime signing available on request</span>
                </div>
            </div>
        </div>
    </section>
</template>

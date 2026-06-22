<script setup lang="ts">
import { DateTime } from "luxon";
import type { Detail, Project } from "~/types/components";

interface ComponentProps extends Pick<
    Project,
    "code" | "year" | "tag" | "status" | "name"
> {
    detail: Pick<
        Detail,
        | "subtitle"
        | "role"
        | "milestones"
        | "client"
        | "team"
        | "platform"
        | "heroCopy"
        | "links"
    >;
}

const props = defineProps<ComponentProps>();

const range = computed((): { start: DateTime; end: DateTime } | null => {
    const dates = props.detail.milestones
        .filter((x): x is { name: string; date: Date } => Boolean(x.date))
        .map((x) => DateTime.fromJSDate(x.date));
    if (!dates.length) return null;
    return { start: dates[0]!, end: dates[dates.length - 1]! };
});

const duration = computed((): string => {
    if (!range.value) return "";
    const { years, months } = range.value.end
        .diff(range.value.start, ["years", "months"])
        .toObject();
    const y = Math.floor(years ?? 0);
    const m = Math.round(months ?? 0);
    const parts: string[] = [];
    if (y > 0) parts.push(`${y} year${y > 1 ? "s" : ""}`);
    if (m > 0 || !parts.length) parts.push(`${m} month${m !== 1 ? "s" : ""}`);
    return parts.join(" ");
});

const timeline = computed((): string => {
    if (!range.value) return "";
    const { start, end } = range.value;
    if (start.hasSame(end, "year")) {
        return `${start.toFormat("LLL")}-${end.toFormat("LLL")} ${start.year}`;
    }
    return `${start.toFormat("LLL yyyy")} - ${end.toFormat("LLL yyyy")}`;
});

const dossierItems = computed(() => [
    {
        key: "Role",
        value: props.detail.role,
    },
    {
        key: "Timeline",
        value: `${duration.value} · ${timeline.value}`,
    },
    {
        key: "Client",
        value: props.detail.client,
    },
    {
        key: "Team",
        value: props.detail.team,
    },
    {
        key: "Platform",
        value: props.detail.platform,
    },
    {
        key: "Status",
        value: props.status,
    },
]);

function goToDemo() {
    if (!props.detail.links.demo) return;

    window.open(`https://${props.detail.links.demo}/`, "_blank");
}
</script>
<template>
    <div
        class="font-mono flex justify-between items-center text-white/55 text-[11px] tracking-[0.22em] uppercase mb-[34px]"
    >
        <Label class="mb-0!" color="gray" :text="`CASE_FILE · ${code}`" />
        <span class="hidden md:inline"
            >{{ year }} — <span class="text-[var(--pink)]">LIVE</span></span
        >
    </div>

    <div
        class="grid grid-cols-1 lg:grid-cols-[minmax(0px,1.15fr)_minmax(0px,0.85fr)] gap-[44px]"
    >
        <div>
            <div class="font-mono gap-2 flex flex-wrap mb-[18px]">
                <Chip>{{ tag }}</Chip>
                <Chip :purple="true">{{ year }}</Chip>
                <Chip>{{ status }}</Chip>
            </div>

            <GlitchText
                as="h1"
                :text="name"
                class="text-[clamp(52px,9vw,90px)] mb-1"
            />

            <p
                class="max-w-[640px] mt-[18px] text-white/85 leading-[1.55] text-[clamp(17px,2vw,21px)] font-medium"
            >
                {{ detail.subtitle }}
            </p>

            <p class="max-w-[640px] mt-4 text-white/66 leading-[1.65]">
                {{ detail.heroCopy }}
            </p>

            <div class="flex gap-3 flex-wrap mt-[30px]">
                <button
                    :class="['btn', { disabled: !detail.links.demo }]"
                    @click="goToDemo()"
                >
                    <template v-if="!detail.links.demo"
                        >live_demo [COMING SOON]</template
                    >
                    <template v-else
                        >▶ VIEW_LIVE — 
                        <span class="text-[var(--pink)]">{{
                            detail.links.demo
                        }}</span>
                    </template>
                </button>
                <button
                    :class="[
                        'btn',
                        { purple: detail.links.source },
                        { disabled: !detail.links.source },
                    ]"
                >
                    SOURCE ↗
                </button>
                <NuxtLink as="button" href="#process" class="btn ghost"
                    >JUMP_TO_PROCESS</NuxtLink
                >
            </div>
        </div>
        <div class="glass corners p-4">
            <div
                class="font-mono flex justify-between items-center text-[11px] tracking-[0.22em] text-white/60 mb-[6px]"
            >
                <span>◆ DOSSIER</span>
                <span>{{ code }}</span>
            </div>
            <div
                v-for="(item, index) of dossierItems"
                :key="index"
                class="grid grid-cols-[108px_1fr] gap-[14px] py-[13px] border-b last:border-b-0 border-white/6"
            >
                <span
                    class="font-mono text-[11px] tracking-[.2em] uppercase text-white/50"
                    >{{ item.key }}</span
                >
                <span class="text-[14px] text-white leading-[1.5]">{{
                    item.value
                }}</span>
            </div>
        </div>
    </div>
</template>

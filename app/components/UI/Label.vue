<script setup lang="ts">
interface ComponentProps {
    color: "gray" | "pink" | "purple";
    text: string;
}

defineProps<ComponentProps>();
</script>
<template>
    <div
        :class="[
            'font-mono flex items-center gap-2 text-[11px] tracking-[.24em] mb-4 uppercase',
            { 'text-white/55': color === 'gray' },
            { 'text-[var(--pink)]': color === 'pink' },
            { 'text-[var(--purple)]': color === 'purple' },
        ]"
    >
        <span
            :class="[
                'w-[7px] h-[7px] inline-block rotate-45',
                {
                    'bg-white/55 shadow-[0_0_10px_rgba(255,255,255,.55)]':
                        color === 'gray',
                },
                {
                    'bg-[var(--pink)] shadow-[0_0_10px_var(--pink)]':
                        color === 'pink',
                },
                {
                    'bg-[var(--purple)] shadow-[0_0_10px_var(--purple)]':
                        color === 'purple',
                },
            ]"
        ></span>
        {{ text }}
    </div>
</template>

<script setup lang="ts">
import type { Detail } from "~/types/components";

interface ComponentProps extends Pick<Detail, "figures"> {}

defineProps<ComponentProps>();
</script>
<template>
    <Section
        label="SHOWCASE / VISUAL_RECORD"
        code="G//"
        :right="`${figures.length} CAPTURES`"
        title="THE_SHOWCASE"
        subtitle="Interface captures from the shipped build."
    >
        <div class="grid grid-cols-2 gap-4">
            <Figure
                class="col-span-2"
                aspect="16/9"
                :figure="figures?.[0]"
                :index="0"
            />
            <Figure aspect="16/9" :figure="figures?.[1]" :index="1" />
            <Figure aspect="16/9" :figure="figures?.[2]" :index="2" />
            <Figure
                class="col-span-2"
                aspect="16/9"
                :figure="figures?.[3]"
                :index="3"
            />
        </div>
    </Section>
</template>

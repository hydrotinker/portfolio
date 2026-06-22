<script setup lang="ts">
import type { Project } from "~/types/components";

const route = useRoute();
const code = computed(() => String(route.params.code));

const { projects } = storeToRefs(useProjectsStore());
const { activeItem } = storeToRefs(useMainStore());

const project = ref(<Project | null>null);
const index = ref(<number>0);

const prev = computed(
    (): Project | null => projects.value[index.value - 1] ?? null,
);
const next = computed(
    (): Project | null => projects.value[index.value + 1] ?? null,
);

useHead({
    title: computed(() =>
        project.value ? `${project.value.name} · HYDROTINKER` : "HYDROTINKER",
    ),
});

onMounted(() => {
    activeItem.value = "projects";
    const detailIndex = projects.value.findIndex(
        (p) => p.code.toLowerCase() === code.value,
    );
    if (detailIndex > -1) {
        project.value = projects.value[detailIndex] ?? null;
        index.value = detailIndex;
    } else {
        navigateTo("/");
    }
});
</script>

<template>
    <section
        v-if="project"
        class="relative pt-[48px] pb-[36px] max-w-[1320px] mx-auto px-7 z-2"
    >
        <CaseHero
            :code="project.code"
            :detail="project.detail"
            :name="project.name"
            :status="project.status"
            :tag="project.tag"
            :year="project.year"
        />

        <section class="py-5">
            <Figure
                aspect="21/8"
                :figure="project.detail.figures?.[0]"
                :index="0"
            >
                <span class="text-[var(--pink)]">◉ {{ project.year }}</span>
            </Figure>
        </section>

        <section class="pt-6 pb-12">
            <CaseStats :stats="project.detail.stats" />
        </section>

        <CaseBrief
            :context="project.detail.context"
            :goal="project.detail.goal"
            :problem="project.detail.problem"
            :stack="project.detail.stack"
        />

        <CaseConstraints :blockers="project.detail.blockers" />

        <CaseProcess :process="project.detail.process" />

        <CaseSystem
            :code="project.code"
            :year="project.year"
            :detail="project.detail"
        />

        <CaseEngineering :exhibits="project.detail.exhibits" />

        <CaseProduct :features="project.detail.features" />

        <CaseShowcase :figures="project.detail.figures" />

        <CaseOutcome
            :learned="project.detail.learned"
            :outcomes="project.detail.outcomes"
            :quote="project.detail.quote"
            :stats="project.detail.stats"
        />

        <CaseNavigation :prev="prev" :next="next" />

        <FooterSection />
    </section>
</template>

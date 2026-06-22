<script setup lang="ts">
useSeoMeta({
    title: "Hydrotinker — Senior Fullstack PHP Developer | Available for Hire",
    description:
        "Ivan Morozov — fullstack engineer specialising in distributed systems, edge runtimes, and high-performance web. Available for commissions Q2 2026.",
    ogTitle:
        "Hydrotinker — Senior Fullstack PHP Developer | Available for Hire",
    ogDescription:
        "Ivan Morozov — fullstack engineer specialising in distributed systems, edge runtimes, and high-performance web.",
    ogUrl: "https://hydrotinker.online/",
    ogType: "website",
    twitterCard: "summary_large_image",
    twitterTitle:
        "Hydrotinker — Senior Fullstack PHP Developer | Available for Hire",
    twitterDescription:
        "Ivan Morozov — fullstack engineer specialising in distributed systems, edge runtimes, and high-performance web.",
});

const { navItems, activeItem } = storeToRefs(useMainStore());

const isManualScroll = ref(false);

const setActive = (v: string) => {
    isManualScroll.value = true;
    activeItem.value = v;
};

const onScrollEnd = () => {
    isManualScroll.value = false;
};

const ids = navItems.value.map((n) => n.id);

const onKeydown = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        const el = document.getElementById("contact");
        if (el) el.scrollIntoView({ behavior: "smooth" });
        setActive("contact");
    }
};

let observer: IntersectionObserver | null = null;

onMounted(() => {
    // Track the section nearest the top of the viewport via IntersectionObserver
    // instead of an unthrottled scroll handler that forced an offsetTop reflow per
    // nav id on every scroll event.
    const sections = ids
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null);

    observer = new IntersectionObserver(
        (entries) => {
            if (isManualScroll.value) return;
            for (const entry of entries) {
                if (entry.isIntersecting && entry.target.id) {
                    activeItem.value = entry.target.id;
                }
            }
        },
        // Bias toward the section just below the sticky header: only the slim band
        // near the top of the viewport is treated as "active".
        { rootMargin: "-120px 0px -70% 0px", threshold: 0 },
    );
    for (const el of sections) observer.observe(el);

    window.addEventListener("scrollend", onScrollEnd, { passive: true });
    window.addEventListener("keydown", onKeydown);
});

onUnmounted(() => {
    observer?.disconnect();
    window.removeEventListener("scrollend", onScrollEnd);
    window.removeEventListener("keydown", onKeydown);
});
</script>

<template>
    <div id="hero"></div>
    <HeroSection />
    <HomeMarqueeBar />
    <ProjectsSection />
    <AboutSection />
    <SkillsSection />
    <BlogSection v-if="false" />
    <PipelineSection />
    <ContactSection />
    <FooterSection />
</template>

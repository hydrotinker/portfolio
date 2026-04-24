<script setup lang="ts">
import type { NavItem } from "~/types/components";

const navItems = ref<NavItem[]>([
    { id: "hero", label: "00 // index" },
    { id: "projects", label: "01 // work" },
    { id: "about", label: "02 // about" },
    { id: "skills", label: "03 // stack" },
    // { id: "blog", label: "04 // notes" },
    { id: "contact", label: "05 // ping" },
]);

const active = ref("hero");
const isManualScroll = ref(false);

const setActive = (v: string) => {
    isManualScroll.value = true;
    active.value = v;
};

const onScrollEnd = () => {
    isManualScroll.value = false;
};

const ids = navItems.value.map((n) => n.id);

const onScroll = () => {
    if (isManualScroll.value) return;
    const y = window.scrollY + 120;
    let cur: string = ids[0] ?? "hero";
    for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) cur = id;
    }
    active.value = cur;
};
const onKeydown = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        const el = document.getElementById("contact");
        if (el) el.scrollIntoView({ behavior: "smooth" });
        setActive("contact");
    }
};

onMounted(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scrollend", onScrollEnd, { passive: true });
    window.addEventListener("keydown", onKeydown);
    onScroll();
});

onUnmounted(() => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("keydown", onKeydown);
});
</script>

<template>
    <div class="mesh"></div>
    <div id="hero"></div>
    <NavBar
        :items="navItems"
        :active="active"
        @set:active="(v: string) => setActive(v)"
    />
    <HeroSection />
    <MarqueeBar />
    <ProjectsSection />
    <AboutSection />
    <SkillsSection />
    <BlogSection v-if="false" />
    <PipelineSection />
    <ContactSection />
    <FooterSection />
</template>

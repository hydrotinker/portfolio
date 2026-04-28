<script setup lang="ts">
const { initialize } = useConsent();
onMounted(() => initialize());

useJsonld([
    {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Ivan Morozov",
        jobTitle: "Senior Fullstack Developer",
        url: "https://hydrotinker.online/",
        sameAs: [
            "https://github.com/hydrotinker",
            "https://x.com/hydrotinker",
            "https://www.instagram.com/hydro.otinker",
            "https://www.threads.com/@hydro.otinker",
        ],
        knowsAbout: [
            "PHP",
            "Vue.js",
            "TypeScript",
            "JavaScript",
            "Pinia",
            "Nuxt",
            "Tailwind CSS",
            "Laravel",
            "Symfony",
            "MySQL",
            "PostgreSQL",
            "Redis",
            "Docker",
            "CI/CD",
            "Grafana",
            "Artificial Intelligence",
        ],
    },
    {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Hydrotinker",
        url: "https://hydrotinker.online/",
        author: {
            "@type": "Person",
            name: "Ivan Morozov",
        },
    },
]);
</script>

<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
    <CookieBanner />
</template>

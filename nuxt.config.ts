import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },
    css: ["./app/assets/css/main.css"],

    app: {
        head: {
            htmlAttrs: { lang: "en" },
            link: [
                { rel: "preconnect", href: "https://fonts.googleapis.com" },
                {
                    rel: "preconnect",
                    href: "https://fonts.gstatic.com",
                    crossorigin: "",
                },
                {
                    rel: "stylesheet",
                    href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@400;500;700&display=swap",
                },
                {
                    rel: "manifest",
                    href: "/manifest.webmanifest",
                },
                {
                    rel: "icon",
                    href: "/favicon.ico",
                    sizes: "32x32",
                },
                {
                    rel: "apple-touch-icon",
                    href: "/apple-touch-icon.png",
                },
            ],
            title: "Hydrotinker — Senior Fullstack PHP Developer | Available for Hire",
        },
    },

    gtag: {
        enabled: process.env.NODE_ENV === "production",
        initMode: "manual",
        initCommands: [
            [
                "consent",
                "default",
                {
                    ad_user_data: "denied",
                    ad_personalization: "denied",
                    ad_storage: "denied",
                    analytics_storage: "denied",
                    wait_for_update: 500,
                },
            ],
        ],
    },

    router: {
        options: {
            scrollBehaviorType: "smooth",
        },
    },

    runtimeConfig: {
        gmailAppPassword: "",
        public: {
            version: "",
            coords: { n: "", e: "" },
            build: { year: "", month: "", day: "" },
        },
    },

    site: {
        url: "https://hydrotinker.online",
    },

    vite: {
        plugins: [tailwindcss()],
    },

    modules: ["@nuxtjs/sitemap", "nuxt-jsonld", "nuxt-og-image", "nuxt-gtag"],
});

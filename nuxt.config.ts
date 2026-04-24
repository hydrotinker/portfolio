import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },
    css: ["./app/assets/css/main.css"],
    ssr: false,
    app: {
        head: {
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
            title: "Hydrotinker Personal Hub",
        },
    },
    router: {
        options: {
            scrollBehaviorType: "smooth",
        },
    },
    runtimeConfig: {
        gmailAppPassword: process.env.GMAIL_APP_PASSWORD,
        public: {
            version: process.env.VERSION,
            coords: {
                n: process.env.COORD_N,
                e: process.env.COORD_E,
            },
            build: {
                year: process.env.BUILD_YEAR,
                month: process.env.BUILD_MONTH,
                day: process.env.BUILD_DAY,
            },
        },
    },
    vite: {
        plugins: [tailwindcss()],
    },
});

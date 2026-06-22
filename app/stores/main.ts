import { defineStore } from "pinia";
import type { NavItem } from "~/types/components";

export const useMainStore = defineStore("main", () => {
    const navItems = ref<NavItem[]>([
        { id: "hero", label: "00 // index" },
        { id: "projects", label: "01 // work" },
        { id: "about", label: "02 // about" },
        { id: "skills", label: "03 // stack" },
        // { id: "blog", label: "04 // notes" },
        { id: "contact", label: "05 // ping" },
    ]);
    const activeItem = ref(<string>"hero");

    const marqueeBarItems = ref(<string[]>[
        "HYDROTINKER",
        "FULL_STACK",
        "AVAILABLE Q2/2026",
        "BACKEND",
        "YEREVAN ⇄ REMOTE",
        "FRONTEND",
    ]);

    return {
        navItems,
        activeItem,
        marqueeBarItems,
    };
});

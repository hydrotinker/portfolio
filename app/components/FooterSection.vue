<template>
    <footer
        class="relative pt-[40px] pb-[28px] border-t border-white/8 mt-[40px]"
    >
        <div
            class="wrap flex justify-between items-center flex-wrap gap-2 sm:gap-3 [font-family:var(--mono)] text-[11px] tracking-[0.2em] text-white/55 uppercase"
        >
            <span>© 2026 HYDROTINKER</span>
            <NuxtLink
                to="/terms"
                class="py-2 underline underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-pink focus-visible:outline-offset-4"
            >
                Terms of Service
            </NuxtLink>
            <span class="text-pink">END_OF_FILE ▌</span>
        </div>
    </footer>
</template>

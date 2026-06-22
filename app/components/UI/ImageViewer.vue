<script setup lang="ts">
import { computed, ref, watch, onBeforeUnmount } from "vue";

interface ComponentProps {
    open: boolean;
    src: string;
    title?: string;
    caption?: string;
}

const props = defineProps<ComponentProps>();
const emit = defineEmits<{
    "update:open": [value: boolean];
}>();

const MIN_SCALE = 0.5;
const MAX_SCALE = 5;
const STEP = 0.25;

const scale = ref(1);
const tx = ref(0);
const ty = ref(0);
const dragging = ref(false);

let startX = 0;
let startY = 0;
let originTx = 0;
let originTy = 0;

const clamp = (n: number) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, n));

function reset() {
    scale.value = 1;
    tx.value = 0;
    ty.value = 0;
}

function zoomIn() {
    scale.value = clamp(scale.value + STEP);
}

function zoomOut() {
    scale.value = clamp(scale.value - STEP);
    if (scale.value === 1) {
        tx.value = 0;
        ty.value = 0;
    }
}

function close() {
    emit("update:open", false);
}

function onWheel(e: WheelEvent) {
    scale.value = clamp(scale.value + (e.deltaY < 0 ? STEP : -STEP));
    if (scale.value === 1) {
        tx.value = 0;
        ty.value = 0;
    }
}

function onPointerDown(e: PointerEvent) {
    dragging.value = true;
    startX = e.clientX;
    startY = e.clientY;
    originTx = tx.value;
    originTy = ty.value;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
}

function onPointerMove(e: PointerEvent) {
    if (!dragging.value) return;
    tx.value = originTx + (e.clientX - startX);
    ty.value = originTy + (e.clientY - startY);
}

function onPointerUp() {
    dragging.value = false;
}

function onKeydown(e: KeyboardEvent) {
    if (e.key === "Escape") close();
}

const stageStyle = computed(() => ({
    transform: `translate(${tx.value}px, ${ty.value}px) scale(${scale.value})`,
    transition: dragging.value ? "none" : "transform 0.18s ease",
    cursor: scale.value > 1 ? (dragging.value ? "grabbing" : "grab") : "default",
}));

watch(
    () => props.open,
    (isOpen) => {
        if (!import.meta.client) return;
        if (isOpen) {
            reset();
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", onKeydown);
        } else {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", onKeydown);
        }
    },
);

onBeforeUnmount(() => {
    if (!import.meta.client) return;
    document.body.style.overflow = "";
    window.removeEventListener("keydown", onKeydown);
});
</script>

<template>
    <Teleport to="body">
        <Transition name="iv-fade">
            <div
                v-if="open"
                class="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md"
                role="dialog"
                aria-modal="true"
                :aria-label="title ? `Image viewer: ${title}` : 'Image viewer'"
                @click.self="close"
                @wheel.prevent="onWheel"
            >
                <!-- Image stage -->
                <img
                    :src="src"
                    :alt="title ?? caption ?? 'Figure'"
                    :style="stageStyle"
                    class="max-h-[88vh] max-w-[92vw] select-none object-contain shadow-2xl"
                    draggable="false"
                    @pointerdown="onPointerDown"
                    @pointermove="onPointerMove"
                    @pointerup="onPointerUp"
                    @pointercancel="onPointerUp"
                />

                <!-- Caption -->
                <div
                    v-if="caption || title"
                    class="font-mono pointer-events-none absolute bottom-5 left-5 text-[11px] tracking-[0.2em] text-white/55"
                >
                    <span v-if="caption" class="text-white/80">{{ caption }}</span>
                    <span v-if="caption && title"> · </span>
                    <span v-if="title">{{ title }}</span>
                </div>

                <!-- Toolbar -->
                <div
                    class="glass corners absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-1 p-1.5"
                >
                    <button
                        type="button"
                        class="iv-btn"
                        aria-label="Zoom out"
                        @click="zoomOut"
                    >
                        −
                    </button>
                    <span
                        class="font-mono min-w-[3.5em] text-center text-[11px] tracking-[0.18em] text-white/70"
                    >
                        {{ Math.round(scale * 100) }}%
                    </span>
                    <button
                        type="button"
                        class="iv-btn"
                        aria-label="Zoom in"
                        @click="zoomIn"
                    >
                        +
                    </button>
                    <button
                        type="button"
                        class="iv-btn iv-btn-wide"
                        aria-label="Reset zoom"
                        @click="reset"
                    >
                        RESET
                    </button>
                </div>

                <!-- Close -->
                <button
                    type="button"
                    class="iv-btn iv-btn-close absolute top-5 right-5"
                    aria-label="Close image viewer"
                    @click="close"
                >
                    ✕
                </button>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.iv-fade-enter-active,
.iv-fade-leave-active {
    transition: opacity 0.2s ease;
}
.iv-fade-enter-from,
.iv-fade-leave-to {
    opacity: 0;
}

.iv-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 34px;
    width: 34px;
    font-family: var(--mono);
    font-size: 16px;
    line-height: 1;
    letter-spacing: 0.12em;
    color: #fff;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 4px;
    cursor: pointer;
    transition:
        border-color 0.18s ease,
        background 0.18s ease,
        box-shadow 0.18s ease;
}

.iv-btn-wide {
    width: auto;
    padding: 0 12px;
    font-size: 11px;
}

.iv-btn-close {
    height: 40px;
    width: 40px;
    font-size: 15px;
    background: rgba(10, 10, 10, 0.55);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
}

.iv-btn:hover {
    border-color: var(--pink);
    background: rgba(255, 45, 120, 0.12);
    box-shadow: 0 0 14px -4px rgba(255, 45, 120, 0.6);
}

@media (prefers-reduced-motion: reduce) {
    .iv-fade-enter-active,
    .iv-fade-leave-active,
    .iv-btn {
        transition: none;
    }
}
</style>

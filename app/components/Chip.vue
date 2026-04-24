<script setup lang="ts">
defineProps<{
  purple?: boolean
}>()
</script>

<template>
  <span class="chip" :class="{ pu: purple }">
    <span class="dot" />
    <slot />
  </span>
</template>

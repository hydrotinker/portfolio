<script setup lang="ts">
import type { StyleValue } from 'vue'

withDefaults(defineProps<{
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'h4'
  style?: StyleValue
}>(), {
  as: 'h2',
})
</script>

<template>
  <component :is="as" class="glitch" :data-text="text" :style="style">{{ text }}</component>
</template>

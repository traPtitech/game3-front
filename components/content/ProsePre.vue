<script setup lang="ts">
const props = defineProps({
  code: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: null
  },
  filename: {
    type: String,
    default: null
  },
  highlights: {
    type: Array as () => number[],
    default: () => []
  },
  meta: {
    type: String,
    default: null
  },
  class: {
    type: String,
    default: null
  }
})
</script>

<template>
  <div class="relative w-full">
    <div class="absolute p-2 caption">
      {{ props.filename }}
    </div>
    <pre :class="['w-full overflow-x-auto rounded b-1 b-border-secondary p-4', props.class]">
      <slot />
    </pre>
  </div>
</template>

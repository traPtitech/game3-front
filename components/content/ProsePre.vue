<script setup lang="ts">
defineProps({
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
      {{ filename }}
    </div>
    <pre class="w-full overflow-x-auto rounded bg-black/10 p-4">
      <slot />
    </pre>
  </div>
</template>

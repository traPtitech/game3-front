<!-- https://github.com/nuxt-modules/mdc/blob/820d5d7fe4e7bdc8b57070bd82de2929f75a485c/src/runtime/components/prose/ProseImg.vue -->
<template>
  <NuxtImg
    :src="props.src"
    :alt="props.alt"
    :width="props.width"
    :height="props.height"
    class="h-auto max-h-50vh w-full object-contain"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: ''
  },
  width: {
    type: [String, Number],
    default: undefined
  },
  height: {
    type: [String, Number],
    default: undefined
  }
})
</script>

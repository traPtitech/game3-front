<!-- https://github.com/nuxt-modules/mdc/blob/820d5d7fe4e7bdc8b57070bd82de2929f75a485c/src/runtime/components/prose/ProseImg.vue -->
<template>
  <img
    :src="refinedSrc"
    :alt="alt"
    :width="width"
    :height="height"
    class="h-auto max-h-50vh w-full object-contain"
  >
</template>

<script setup lang="ts">
import { withTrailingSlash, withLeadingSlash, joinURL } from 'ufo'
import { useRuntimeConfig, computed } from '#imports'

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

const refinedSrc = computed(() => {
  if (props.src?.startsWith('/') && !props.src.startsWith('//')) {
    const _base = withLeadingSlash(withTrailingSlash(useRuntimeConfig().app.baseURL))
    if (_base !== '/' && !props.src.startsWith(_base)) {
      return joinURL(_base, props.src)
    }
  }
  return props.src
})
</script>

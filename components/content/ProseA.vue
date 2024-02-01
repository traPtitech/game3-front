<!-- https://github.com/nuxt-modules/mdc/blob/820d5d7fe4e7bdc8b57070bd82de2929f75a485c/src/runtime/components/prose/ProseA.vue -->
<template>
  <NuxtLink
    :href="href"
    :target="target"
    class="text-text-link visited:text-text-visited underline hover:no-underline"
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps({
  href: {
    type: String,
    default: ''
  },
  target: {
    type: String,
    default: undefined,
    required: false
  }
})
</script>

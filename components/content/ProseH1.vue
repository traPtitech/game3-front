<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

type Props = {
  breadcrumbs?: {
    label: string
    to: RouteLocationRaw
  }[]
}
const props = defineProps<Props>()
</script>

<template>
  <div class="relative mb-12 w-full py-8 text-text-white text-shadow-4 before:(absolute left-[min(0px,calc(50%-50vw))] top-0 block h-full w-100vw bg-brand-violet content-['']) h1-text">
    <div v-if="props.breadcrumbs">
      <UIBreadCrumbs :items="props.breadcrumbs" />
    </div>
    <h1>
      <StrokedText :width="4">
        <slot />
      </StrokedText>
    </h1>
  </div>
</template>

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
  <div class="relative left-[min(0px,calc(50%-50vw))] mb-12 w-100vw overflow-hidden bg-brand-violet px-[max(calc(50vw-50%),1rem)] py-8 text-text-white text-shadow-4 h1-text">
    <div v-if="props.breadcrumbs">
      <UIBreadCrumbs :items="props.breadcrumbs" />
    </div>
    <h1>
      <StrokedText>
        <slot />
      </StrokedText>
    </h1>
  </div>
</template>

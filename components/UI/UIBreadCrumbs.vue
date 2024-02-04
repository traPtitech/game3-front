<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

type Props = {
  items: {
    label: string
    to: RouteLocationRaw
  }[]
}
const props = defineProps<Props>()
</script>

<template>
  <div class="flex gap-2 text-shadow-3 h5-text">
    <div v-for="(item, index) in props.items" :key="index">
      <NuxtLink :to="item.to">
        <StrokedText>
          {{ item.label }}
          >
        </StrokedText>
      </NuxtLink>
    </div>
  </div>
</template>

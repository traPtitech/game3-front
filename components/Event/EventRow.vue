<script setup lang="ts">
import type { Event } from '~/lib/api'

type Props = {
  event: Event
}
const props = defineProps<Props>()
</script>

<template>
  <NuxtLink :to="`/event/${event.slug}`" class="block flex items-center gap-8 text-text-secondary">
    <img
      :src="useEventImageUrl(props.event.slug)"
      class="h-30 w-30 b-1 b-border-primary"
    >
    <div class="flex flex-col gap-2">
      <h3 class="text-12 text-text-primary font-500">
        {{ props.event.title }}
      </h3>
      <div class="flex items-center gap-1 text-caption">
        <div class="i-tabler:clock h-6 w-6" />
        <!-- TODO: 開催日に変更 -->
        {{ props.event.gameSubmissionPeriodStart.toLocaleDateString("ja-JP") }}
      </div>
    </div>
    <div class="i-tabler:circle-chevron-right ml-auto mr-3 h-12 w-12" />
  </NuxtLink>
</template>

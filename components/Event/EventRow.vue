<script setup lang="ts">
import type { Event } from '~/lib/api'

type Props = {
  event: Event
}
const props = defineProps<Props>()
</script>

<template>
  <NuxtLink :to="`/event/${event.slug}`" class="block flex items-center gap-8 text-text-secondary">
    <NuxtImg
      :src="useEventImageUrl(props.event.slug)"
      placeholder="/img/placeholder.png"
      class="b-1 b-border-primary object-cover"
      width="180px"
      height="180px"
    />
    <div class="flex flex-col gap-2">
      <h3 class="text-text-primary font-500 h2-text">
        {{ props.event.title }}
      </h3>
      <div class="flex items-center gap-1 body">
        <div class="i-tabler:clock h-1.5em w-1.5em" />
        {{ props.event.date.toLocaleDateString("ja-JP") }}
      </div>
    </div>
    <div class="i-tabler:circle-chevron-right ml-auto mr-3 h-12 w-12" />
  </NuxtLink>
</template>

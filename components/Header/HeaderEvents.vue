<script setup lang="ts">
const { data: events, suspense: suspenseEvents } = useEventsQuery()
const top3Events = computed(() => {
  if (!events.value) {
    return []
  }
  return events.value
    .toSorted((a, b) =>
      b.gameSubmissionPeriodEnd < a.gameSubmissionPeriodEnd ? -1 : 1
    )
    .slice(0, 3)
})

onServerPrefetch(async () => {
  // https://github.com/TanStack/query/discussions/5688#discussioncomment-6652179
  await suspenseEvents().catch(() => {})
})
</script>

<template>
  <nav v-if="top3Events" class="text-button text-brand-violet">
    <ul class="space-y-4">
      <li v-for="event in top3Events" :key="event.slug">
        <NuxtLink
          class="w-full inline-flex items-center gap-2"
          :to="`/event/${event.slug}`"
        >
          <NuxtImg
            width="24"
            height="24"
            src="/img/list-marker.svg"
            aria-hidden
          />
          <StrokedText class="text-stroke-white" :width="3">
            {{ event.title }}
          </StrokedText>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink class="w-full inline-flex items-center gap-2" to="/event">
          <NuxtImg
            width="24"
            height="24"
            src="/img/list-marker.svg"
            aria-hidden
          />
          <StrokedText class="text-stroke-white" :width="3">
            開催一覧
          </StrokedText>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

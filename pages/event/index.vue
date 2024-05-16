<!-- `/event` -->
<script setup lang="ts">
const { data: events, suspense: suspenseEvents } = useEventsQuery()
onServerPrefetch(async () => {
  await suspenseEvents().catch(() => {})
})

const sortedEvents = computed(() => {
  return events.value?.toSorted((a, b) => (a.date > b.date ? -1 : 1)) ?? []
})

useSeoMeta({
  title: '過去の開催',
  ogTitle: '過去の開催',
})
</script>

<template>
  <div>
    <ProseH1> 過去の開催 </ProseH1>
    <ProseH2> 開催イベント一覧 </ProseH2>
    <ul class="divide-y-2">
      <li
        v-for="event in sortedEvents"
        :key="event.slug"
        class="py-5"
      >
        <EventRow :event="event" />
      </li>
    </ul>
  </div>
</template>

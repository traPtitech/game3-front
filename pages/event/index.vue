<!-- `/event` -->
<script setup lang="ts">
const { data: events, suspense: suspenseEvents } = useEventsQuery()
onServerPrefetch(async () => {
  await suspenseEvents().catch(() => {})
})

useSeoMeta({
  title: '過去の開催'
})
</script>

<template>
  <div>
    <ProseH1>
      過去の開催
    </ProseH1>
    <ProseH2>
      開催イベント一覧
    </ProseH2>
    <ul class="divide-y-2">
      <li v-for="event in events" :key="event.slug" class="py-5">
        <EventRow
          :event="event"
        />
      </li>
    </ul>
  </div>
</template>

<!-- `/admin/event/:slug` -->
<script setup lang="ts">
import { getParamsArray } from '~/lib/url'

definePageMeta({
  middleware: ['need-admin']
})

const route = useRoute()
const slugArray = getParamsArray(route.params.slug)
const eventSlug = slugArray?.[0]
if (!eventSlug) {
  throw createError({
    statusCode: 404,
    statusMessage: 'イベントが見つかりませんでした'
  })
}

const { data: event, suspense: suspenseEvent } = useEventQuery({ eventSlug })
onServerPrefetch(async () => {
  await suspenseEvent().catch(() => {})
})
</script>

<template>
  <div v-if="event">
    <ProseH1>{{ event.title }}</ProseH1>
    <EventInfo :event="event" />
    <EventEdit :event="event" />
    <EventGames :event-slug="event.slug" />
    <EventTerms :event-slug="event.slug" />
  </div>
</template>

<script setup lang="ts">
const eventSlug = usePathParams('slug')
const { data: games, suspense: suspenseGames } = useGamesQuery({
  eventSlug
})
const { data: event, suspense: suspenseEvent } = useEventQuery({
  eventSlug
})
onServerPrefetch(async () => {
  await Promise.all([suspenseGames(), suspenseEvent()]).catch(() => {})
})

useSeoMeta({
  title: () =>
    event.value ? `${event.value.title} Game³ ゲーム一覧` : 'Game³ ゲーム一覧'
})
</script>

<template>
  <div v-if="event">
    <ProseH1
      :breadcrumbs="[{ label: event.title, to: `/event/${event.slug}` }]"
    >
      ゲーム一覧
    </ProseH1>
    <ul class="space-y-6">
      <li v-for="game in games" :key="game.id">
        <EntryRow :game="game" />
      </li>
    </ul>
  </div>
</template>

<!-- `/admin/event/:slug/event-paper` -->
<script setup lang="ts">
definePageMeta({
  middleware: ['need-admin'],
})

const eventSlug = usePathParams('slug')

const { data: event, suspense: suspenseEvent } = useEventQuery({ eventSlug })
const { data: games, suspense: suspenseGames } = useGamesQuery({ eventSlug })
onServerPrefetch(async () => {
  await Promise.all([suspenseEvent(), suspenseGames()])
})
</script>

<template>
  <div v-if="event && games">
    <ProseH1
      :breadcrumbs="[
        { label: '管理者ページ', to: '/admin' },
        { label: 'イベント管理', to: '/admin/event' },
        { label: event?.title, to: `/admin/event/${event?.slug}` },
      ]"
    >
      イベントペーパー
    </ProseH1>
    <div class="paper h-297mm w-210mm bg-gray">
      {{ event.slug }} Game3
    </div>
    <div class="paper h-297mm w-210mm bg-gray">
      <ul>
        <li
          v-for="game in games"
          :key="game.id"
        >
          {{ game.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

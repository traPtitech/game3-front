<!-- `/event/:slug/games` -->
<script setup lang="ts">
import { getParamsArray } from '~/lib/url'

const route = useRoute()
const slug = getParamsArray(route.params.slug)
if (!slug) {
  throw createError({
    statusCode: 404,
    statusMessage: 'ゲームが見つかりませんでした'
  })
}

const { data, error, suspense } = useEventGamesQuery(slug[0])
onServerPrefetch(async () => {
  await suspense()
})

if (error) {
  throw createError({
    statusCode: 500,
    statusMessage: error.value?.message
  })
}
</script>

<template>
  <div>
    <h2>{{ slug[0] }}ゲーム一覧</h2>
    <ul>
      <li v-for="game in data" :key="game.id">
        <nuxt-link :to="`/entry/${game.id}`">
          <div>
            <div>{{ game.title }}</div>
            <div>{{ game.creatorName }}</div>
          </div>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

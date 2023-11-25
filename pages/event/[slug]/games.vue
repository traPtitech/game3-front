<!-- `/event/:slug/games` -->
<script setup lang="ts">
import { getParamsArray } from '~/lib/url'

const route = useRoute()
const slug = getParamsArray(route.params.slug)
if (!slug) {
  throw new Error('slug is not found')
}

// TODO: not found error handling
const { data, status, suspense } = useGamesQuery(slug[0])

onServerPrefetch(async () => {
  await suspense()
})
</script>

<template>
  <div v-if="status === 'pending'">
    <div>読み込み中</div>
  </div>
  <div v-else-if="data">
    <h2>{{ slug[0] }}ゲーム一覧</h2>
    <ul>
      <li v-for="game in data?.games" :key="game.gameId">
        <nuxt-link :to="`/entry/${game.gameId}`">
          <div>
            <div>{{ game.title }}</div>
            <div>{{ game.creatorName }}</div>
          </div>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

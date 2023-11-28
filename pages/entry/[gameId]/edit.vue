<!-- `/entry/:gameId/edit` -->
<script setup lang="ts">
import { getParamsArray } from '~/lib/url'

const route = useRoute()
const gameId = getParamsArray(route.params.gameId)
if (!gameId) {
  throw new Error('gameId is not found')
}

// TODO: not found error handling
const { data, status, suspense } = useGameQuery(gameId[0])
onServerPrefetch(async () => {
  await suspense()
})
</script>

<template>
  <div v-if="status === 'pending'">
    <div>読み込み中</div>
  </div>
  <div v-else-if="data">
    <h2>{{ data.title }}の作品編集</h2>
  </div>
</template>

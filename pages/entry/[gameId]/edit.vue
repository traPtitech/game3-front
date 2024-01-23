<!-- `/entry/:gameId/edit` -->
<script setup lang="ts">
import { getParamsArray } from '~/lib/url'

const route = useRoute()
const gameId = getParamsArray(route.params.gameId)
if (!gameId) {
  throw createError({
    statusCode: 404,
    statusMessage: 'ゲームが見つかりませんでした'
  })
}

const { data, error, suspense } = useGameQuery(gameId[0])
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
  <div v-if="data">
    <h2>{{ data.title }}の作品編集</h2>
  </div>
</template>

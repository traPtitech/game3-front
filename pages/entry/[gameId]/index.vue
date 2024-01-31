<!-- `/entry/:gameId` -->
<script setup lang="ts">
import { getParamsArray } from '~/lib/url'

const route = useRoute()
const gameIdArray = getParamsArray(route.params.gameId)
const gameId = gameIdArray?.[0]
if (!gameId) {
  throw createError({
    statusCode: 404,
    statusMessage: 'ゲームが見つかりませんでした'
  })
}

const { data, error, suspense } = useGameQuery({ gameId })
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
    <h2>{{ data.title }}</h2>
    <div>
      <div>タイトル</div>
      <div>{{ data.title }}</div>
    </div>
    <div>
      <div>説明</div>
      <div>{{ data.description }}</div>
    </div>
    <div>
      <div>展示者名</div>
      <div>{{ data.creatorName }}</div>
    </div>
  </div>
</template>

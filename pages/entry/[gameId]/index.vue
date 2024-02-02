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

const { data: game, suspense: suspenseGame } = useGameQuery({ gameId })
onServerPrefetch(async () => {
  await suspenseGame().catch(() => {})
})

useSeoMeta({
  title: () => game.value ? `${game.value.title} by ${game.value.creatorName}` : 'ゲーム詳細'
})
</script>

<template>
  <div v-if="game">
    <ProseH1>{{ game.title }}</ProseH1>
    <div>
      <img
        :src="useGameImageUrl(gameId)"
        alt=""
        class="mx-auto h-120 w-auto object-contain"
        @error="
          (e) => {
            if (
              (e.currentTarget as HTMLImageElement).src !==
              useGameIconUrl(gameId)
            ) {
              (e.currentTarget as HTMLImageElement).src =
                useGameIconUrl(gameId);
            }
          }
        "
      >
      <div class="flex gap-4 text-caption text-text-secondary!">
        <div class="flex items-center gap-1">
          <div class="i-tabler:user h-6 w-6" />
          <ProseA
            :href="game.creatorPageUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ game.creatorName }}
          </ProseA>
        </div>
        <div class="flex items-center gap-1">
          <div class="i-tabler:link h-6 w-6" />
          <ProseA
            :href="game.gamePageUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ game.gamePageUrl }}
          </ProseA>
        </div>
      </div>
      <ProseP>{{ game.description }}</ProseP>
    </div>
  </div>
</template>

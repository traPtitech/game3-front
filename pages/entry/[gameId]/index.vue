<!-- `/entry/:gameId` -->
<script setup lang="ts">
const gameId = usePathParams('gameId')

const { data: game, suspense: suspenseGame } = useGameQuery({ gameId })
onServerPrefetch(async () => {
  await suspenseGame().catch(() => {})
})

const { useMeStore } = useLogin()
const me = useMeStore()

const canEdit = computed(() => {
  return (
    me.value.user?.role === 'admin' ||
    (me.value.user && me.value.user.userId === game.value?.discordUserId)
  )
})

const seoDescription = computed(() =>
  game.value
    ? `Game3展示作品 「${game.value.title}」 by ${game.value.creatorName} - ${game.value.description}`
    : undefined
)

const img = useImage()

const ogImageUrl = computed(() =>
  img(useGameIconUrl(gameId, true))
)

useSeoMeta({
  title: () =>
    game.value
      ? `「${game.value.title}」 by ${game.value.creatorName}`
      : 'ゲーム詳細',
  ogTitle: () =>
    game.value
      ? `「${game.value.title}」 by ${game.value.creatorName}`
      : 'ゲーム詳細',
  description: () => seoDescription.value,
  ogDescription: () => seoDescription.value,
  ogImage: () => ogImageUrl.value,
  twitterImage: () => ogImageUrl.value,
  twitterDescription: () => seoDescription.value,
  twitterCard: 'summary'
})

if (game.value) {
  defineOgImageComponent('EntryPage', {
    title: game.value.title,
    creatorName: game.value.creatorName,
    imgSrc: ogImageUrl.value
  })
}
</script>

<template>
  <div v-if="game">
    <ProseH1>{{ game.title }}</ProseH1>
    <div class="space-y-4">
      <NuxtImg
        :src="useGameImageUrl(gameId)"
        :alt="`${game.title}紹介画像`"
        class="mx-auto h-auto max-h-120 w-full object-contain"
        :placeholder="useGameIconUrl(gameId)"
        format="webp"
        height="480px"
      />
      <div class="flex flex-col gap-2 md:(flex-row gap-4) text-text-secondary!">
        <div class="flex items-center gap-1">
          <div class="i-tabler:user h-1.5em w-1.5em" />
          <ProseA
            v-if="game.creatorPageUrl"
            :href="game.creatorPageUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ game.creatorName }}
          </ProseA>
          <ProseP v-else>
            {{ game.creatorName }}
          </ProseP>
        </div>
        <div v-if="game.creatorPageUrl" class="flex items-center gap-1">
          <div class="i-tabler:link h-1.5em w-1.5em" />
          <ProseA
            :href="game.gamePageUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ game.gamePageUrl }}
          </ProseA>
        </div>
        <div v-if="game.place" class="flex items-center gap-1">
          <div class="i-tabler:map-pin h-1.5em w-1.5em" />
          {{ game.place }}
        </div>
      </div>
      <ProseP>{{ game.description }}</ProseP>
      <div v-if="canEdit" class="w-full flex justify-center">
        <UIButton @click="navigateTo(`/entry/${gameId}/edit`)">
          ゲーム情報を編集する
        </UIButton>
      </div>
    </div>
  </div>
</template>

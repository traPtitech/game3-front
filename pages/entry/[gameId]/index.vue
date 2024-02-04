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
    ? `Game3展示作品 「${game.value.title}」 by ${game.value.creatorName} ${game.value.description}`
    : undefined
)

const ogImageUrl = computed(() =>
  game.value ? useGameIconUrl(gameId, true) : undefined
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
</script>

<template>
  <div v-if="game">
    <ProseH1>{{ game.title }}</ProseH1>
    <div class="space-y-4">
      <NuxtImg
        :src="useGameImageUrl(gameId)"
        :alt="`${game.title}紹介画像`"
        class="mx-auto h-120 w-auto object-contain"
        :placeholder="useGameIconUrl(gameId)"
      />
      <div class="flex gap-4 text-text-secondary!">
        <div class="flex items-center gap-1">
          <div class="i-tabler:user h-1.5em w-1.5em" />
          <ProseA
            :href="game.creatorPageUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ game.creatorName }}
          </ProseA>
        </div>
        <div class="flex items-center gap-1">
          <div class="i-tabler:link h-1.5em w-1.5em" />
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
      <div v-if="canEdit" class="w-full flex justify-center">
        <UIButton @click="navigateTo(`/entry/${gameId}/edit`)">
          ゲーム情報を編集する
        </UIButton>
      </div>
    </div>
  </div>
</template>

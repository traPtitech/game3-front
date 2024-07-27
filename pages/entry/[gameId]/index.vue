<!-- `/entry/:gameId` -->
<script setup lang="ts">
const gameId = usePathParams('gameId')

const { data: game, suspense: suspenseGame } = useGameQuery({ gameId })
onServerPrefetch(async () => {
  await suspenseGame().catch(() => {
    throw createError({
      statusCode: 404,
      statusMessage: 'Game Not Found',
      message: '作品が見つかりませんでした',
    })
  })
})

const { useMeStore } = useLogin()
const me = useMeStore()

const canEdit = computed(() => {
  if (import.meta.server) {
    // SSR時はログイン情報が取得できない
    return undefined
  }
  else if (me.value.user === undefined) {
    return false // 未ログイン
  }
  else {
    return (
      me.value.user.role === 'admin' // admin
      || me.value.user.userId === game.value?.discordUserId
    ) // creator
  }
})

const isVisible = computed(() => {
  // TODO: 本来はgetレスポンスが404かどうかで判定するべき
  // 現在は非admin/非作者でもゲームが取得できる
  if (game.value === undefined) {
    return undefined
  }
  else {
    return game.value.isPublished || canEdit.value
  }
})

watchEffect(() => {
  if (isVisible.value === false && me.value.user === undefined) {
    // 未ログイン
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: 'ログインが必要です',
      fatal: true,
    })
  }
  else if (isVisible.value === false) {
    // ログイン済み かつ 編集権限なし
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden',
      message: 'この作品は非公開です',
      fatal: true,
    })
  }
})

const seoDescription = computed(() =>
  game.value
    ? `Game3展示作品 「${game.value.title}」 by ${game.value.creatorName} - ${game.value.description}`
    : undefined,
)

const ogImageUrl = useGameIconUrl(gameId, true)

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
  twitterDescription: () => seoDescription.value,
  twitterCard: 'summary',
  // ogImage: () => ogImageUrl,
  // twitterImage: () => ogImageUrl,
})

defineOgImageComponent('EntryPage', {
  title: game.value?.title,
  creatorName: game.value?.creatorName,
  imgSrc: ogImageUrl,
})

const loadFallbackImage = (e: Event) => {
  if (e.target instanceof HTMLImageElement) {
    e.target.src = useGameIconUrl(gameId)
  }
}
</script>

<template>
  <ClientOnly v-if="game !== undefined && isVisible === true">
    <div
      v-if="game.isPublished === false"
      class="relative w-full break-anywhere py-4 text-center text-text-primary before:(absolute left-[min(0px,calc(50%-50vw))] top-0 z--1 block h-full w-100vw bg-brand-orange content-['']) h5-text"
    >
      ⚠この作品は運営による内容確認が完了していないため、作品登録者と運営のみが閲覧できる状態になっています。運営による確認作業をお待ちください
    </div>
    <ProseH1>{{ game.title }}</ProseH1>
    <div class="space-y-4">
      <img
        :src="useGameImageUrl(gameId)"
        :alt="`${game.title}紹介画像`"
        class="mx-auto h-auto max-h-120 w-full object-contain"
        @error="loadFallbackImage"
      >
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
        <div
          v-if="game.creatorPageUrl"
          class="flex items-center gap-1"
        >
          <div class="i-tabler:link h-1.5em w-1.5em" />
          <ProseA
            :href="game.gamePageUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ game.gamePageUrl }}
          </ProseA>
        </div>
        <div
          v-if="game.place"
          class="flex items-center gap-1"
        >
          <div class="i-tabler:map-pin h-1.5em w-1.5em" />
          {{ game.place }}
        </div>
      </div>
      <ProseP>{{ game.description }}</ProseP>
      <div
        v-if="canEdit"
        class="w-full flex justify-center"
      >
        <UIButton @click="navigateTo(`/entry/${gameId}/edit`)">
          ゲーム情報を編集する
        </UIButton>
      </div>
    </div>
  </ClientOnly>
  <LoadingIndicator v-else />
</template>

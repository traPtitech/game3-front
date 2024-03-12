<script setup lang="ts">
const { data: currentEvent, suspense: suspenseCurrentEvent } =
  useCurrentEventQuery()
const canPost = currentEvent.value?.slug
  ? useCanPostGame(currentEvent.value?.slug)
  : undefined
onServerPrefetch(async () => {
  await suspenseCurrentEvent().catch(() => {})
})
</script>

<template>
  <header class="bg-surface-primary">
    <nav class="flex items-center gap-4 px-4 py-2">
      <NuxtLink to="/" class="mr-auto">
        <picture>
          <source
            srcset="/img/logo/Gamecube_symbol.svg"
            media="(max-width: 360px)"
            alt="Game³ロゴ"
            class="h-16"
          >
          <img
            src="/img/logo/Gamecube_logo_full.svg"
            alt="Game³ロゴ"
            class="h-16"
          >
        </picture>
      </NuxtLink>
      <div class="hidden items-center gap-4 xl:flex">
        <NuxtLink
          v-if="canPost?.state === 'enabled'"
          to="/entry/register"
        >
          <UIButton variant="secondary">
            作品登録
          </UIButton>
        </NuxtLink>
        <HeaderEventNavButton />
        <HeaderEventsButton />
      </div>
      <div class="xl:hidden">
        <HeaderCompactNav />
      </div>
    </nav>
  </header>
</template>

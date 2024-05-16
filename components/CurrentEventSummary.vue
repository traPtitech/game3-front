<script setup lang="ts">
const { data: currentEvent, suspense: suspenseCurrentEvent }
  = useCurrentEventQuery()
const canPost = currentEvent.value?.slug
  ? useCanPostGame(currentEvent.value?.slug)
  : undefined
onServerPrefetch(async () => {
  await suspenseCurrentEvent().catch(() => {})
})
</script>

<template>
  <div v-if="currentEvent">
    <div class="w-full flex justify-center gap-4">
      <NuxtLink
        v-if="canPost?.state === 'enabled'"
        to="/entry/register"
      >
        <UIButton>作品登録</UIButton>
      </NuxtLink>
      <NuxtLink :to="`/event/${currentEvent.slug}`">
        <UIButton> {{ currentEvent.title }} 詳細はこちら </UIButton>
      </NuxtLink>
    </div>
  </div>
</template>

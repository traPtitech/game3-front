<script setup lang="ts">
const { data: currentEvent, suspense: suspenseCurrentEvent } =
  useCurrentEventQuery()
onServerPrefetch(async () => {
  await suspenseCurrentEvent().catch(() => {})
})
</script>

<template>
  <div v-if="currentEvent">
    <div class="w-full flex justify-center">
      <NuxtLink :to="`/event/${currentEvent.slug}`">
        <UIButton> {{ currentEvent.title }} 詳細はこちら </UIButton>
      </NuxtLink>
    </div>
  </div>
</template>

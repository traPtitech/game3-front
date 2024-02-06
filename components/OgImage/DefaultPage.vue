<script setup lang="ts">
import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'

const { data: currentEvent, suspense: suspenseCurrentEvent } =
  useCurrentEventQuery()

onServerPrefetch(async () => {
  await suspenseCurrentEvent().catch(() => {})
})

const topImageUrl = computed(() =>
  currentEvent.value
    ? useEventImageUrl(currentEvent.value?.slug, true)
    : useDefaultOgpImageUrl()
)
</script>

<template>
  <div class="h-full w-full flex bg-white font-700">
    <img :src="topImageUrl" width="600" height="600" class="object-cover">
    <div class="flex flex-col justify-center bg-[#3d1192] pl-4 pr-16 text-white">
      <span class="text-12">
        ゲーム制作者交流イベント
      </span>
      <span class="mb--16 text-8">
        ゲームキューブ
      </span>
      <h1 class="text-36">
        Game³
      </h1>
      <div v-if="currentEvent">
        <div class="text-16">
          {{ currentEvent.slug }} Game³
        </div>
        <div class="text-20">
          {{ format(currentEvent.date, "M/d (E)", { locale: enUS }) }}
        </div>
      </div>
    </div>
  </div>
</template>

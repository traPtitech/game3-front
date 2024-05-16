<script setup lang="ts">
import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'

defineProps<{
  title: string
  creatorName: string
  imgSrc: string
}>()

const { data: currentEvent, suspense: suspenseCurrentEvent }
  = useCurrentEventQuery()

onServerPrefetch(async () => {
  await suspenseCurrentEvent().catch(() => {})
})
</script>

<template>
  <div class="h-full w-full flex bg-white font-700">
    <img
      :src="imgSrc"
      width="600"
      height="600"
      class="object-cover"
    >
    <div class="w-600px justify-center bg-[#3d1192] pl-4 pr-16 text-white">
      <div
        class="text-wrap text-16"
        v-text="title"
      />
      <div
        class="mb-8 text-wrap text-8"
        v-text="`by ${creatorName}`"
      />
      <div class="text-20" />
      <span class="text-8">
        ゲーム制作者交流イベント
      </span>
      <div class="flex items-end">
        <div class="mr-8">
          <span class="mb--6 text-6">
            ゲームキューブ
          </span>
          <div class="mb--4 text-20">
            Game³
          </div>
        </div>
        <div v-if="currentEvent">
          <div class="text-12">
            {{ format(currentEvent.date, "M/d (E)", { locale: enUS }) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

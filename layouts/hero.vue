<script setup lang="ts">
import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'

const { data: currentEvent, suspense } = useCurrentEventQuery()
onServerPrefetch(async () => {
  // https://github.com/TanStack/query/discussions/5688#discussioncomment-6652179
  await suspense().catch(() => {})
})
</script>

<template>
  <div>
    <div class="grid grid-cols-[1fr_auto] h-100vh w-full overflow-hidden">
      <!-- TODO: use event image from api -->
      <!-- <NuxtImg :src="`/api/events/${data?.slug}/image`" alt=""> -->
      <div class="relative h-full w-full overflow-hidden">
        <NuxtImg src="/hero-resized.png" class="h-full w-full object-cover" />
        <NuxtImg
          src="/img/logo/Gamecube_logo_full.svg"
          class="absolute bottom-0 right-0 w-[min(100%,max(60%,500px))] p-4"
        />
      </div>
      <div
        class="h-full flex flex-col justify-center gap-12 bg-brand-violet p-6 text-text-white"
      >
        <div>
          <div class="mb-4 text-9 font-700">
            ゲーム制作者交流イベント
          </div>
          <div class="mb--4 text-5 font-700">
            ゲームキューブ
          </div>
          <h1 class="text-24 font-700">
            Game³
          </h1>
        </div>
        <a v-if="currentEvent" :href="`/event/${currentEvent?.slug}`">
          <div class="flex items-center gap-8">
            <div class="text-16 text-brand-violet font-700 space-y-6">
              <div class="w-fit bg-surface-primary px-5">
                {{ currentEvent.slug }} Game³
              </div>
              <div class="w-fit bg-surface-primary px-5">
                {{ format(currentEvent.date, "M/d (E)", { locale: enUS }) }}
              </div>
            </div>
            <div class="i-tabler:chevron-right h-24 w-24 color-text-white" />
          </div>
        </a>
      </div>
    </div>
    <div grid min-h-screen class="grid-rows-[auto_1fr_auto]">
      <AppHeader />
      <div class="h-full w-full flex flex-col items-center px-8 pb-16 pt-4">
        <div class="max-w-240 w-full">
          <slot />
        </div>
      </div>
      <AppFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: currentEvent, suspense } = useCurrentEventQuery()
onServerPrefetch(async () => {
  await suspense()
})
</script>

<template>
  <div>
    <div class="grid grid-cols-[1fr_auto] h-100vh w-full overflow-hidden">
      <!-- TODO: use event image from api -->
      <!-- <img :src="`/api/events/${data?.slug}/image`" alt=""> -->
      <img src="/hero.png" class="h-full w-auto object-cover">
      <div class="h-full flex flex-col justify-center gap-12 bg-brand-violet p-6 text-text-white">
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
        <a :href="`/event/${currentEvent?.slug}`">
          <div class="flex items-center gap-18">
            <div class="text-16 text-brand-violet font-700 space-y-6">
              <div class="w-fit bg-surface-primary px-5">
                {{ currentEvent?.slug }} Game³
              </div>
              <div class="w-fit bg-surface-primary px-5">
                3/16 (Sun)
              </div>
            </div>
            <div class="i-tabler:chevron-right h-32 w-32 color-text-white" />
          </div>
        </a>
      </div>
    </div>
    <div
      grid
      min-h-screen
      class="grid-rows-[auto_1fr_auto]"
    >
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

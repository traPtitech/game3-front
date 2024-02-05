<script setup lang="ts">
import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'

const { data: currentEvent, suspense } = useCurrentEventQuery()
onServerPrefetch(async () => {
  // https://github.com/TanStack/query/discussions/5688#discussioncomment-6652179
  await suspense().catch(() => {})
})

const pageLoaded = useState('loaded', () => false)

const onLoad = () => {
  pageLoaded.value = true
}
onMounted(onLoad)
</script>

<template>
  <div>
    <!-- TODO: add effect animation -->
    <div
      class="grid grid-cols-[auto] grid-rows-[1fr_auto] h-100dvh w-full overflow-hidden lg:(grid-cols-[1fr_auto] grid-rows-[auto])"
    >
      <div class="relative h-full w-full overflow-hidden">
        <NuxtImg
          v-if="currentEvent"
          :src="useEventImageUrl(currentEvent.slug)"
          class="h-full w-full object-cover"
          sizes="768px lg:1280px"
          format="webp"
        />
        <NuxtImg
          width="500px"
          src="/img/logo/Gamecube_logo_full.svg"
          class="absolute bottom-0 right-0 max-w-500px w-full p-4 lg:w-500px"
        />
        <div
          :class="['absolute bottom-0 right-0 h-full w-full bg-brand-violet transition-property-[width,height] duration-300 ease-out', {
            'lg:(w-0! h-full!) h-0! w-full!': pageLoaded,
          }]"
        />
      </div>
      <div
        class="h-full w-full flex flex-col items-end bg-brand-violet p-4 text-text-white sm:items-start lg:justify-center md:p-6"
      >
        <div class="mb-2 break-keep break-anywhere text-right font-700 sm:text-left h4-text lg:h2-text sm:h3-text">
          ゲーム制作者<wbr>交流イベント
        </div>
        <div
          class="w-full flex flex-col items-end sm:(flex-row items-center justify-between) lg:(flex-col items-start gap-16)"
        >
          <div>
            <div class="mb--4 font-700 h5-text">
              ゲームキューブ
            </div>
            <h1 class="text-12 font-700 lg:text-20 md:text-18 xl:text-24">
              Game³
            </h1>
          </div>
          <a v-if="currentEvent" :href="`/event/${currentEvent?.slug}`">
            <div class="flex items-center gap-4">
              <div
                class="text-brand-violet font-700 space-y-2 h3-text lg:(text-12 space-y-6) md:text-8 xl:text-16"
              >
                <div class="w-fit bg-surface-primary px-5 text-nowrap">
                  {{ currentEvent.slug }} Game³
                </div>
                <div class="w-fit bg-surface-primary px-5">
                  {{ format(currentEvent.date, "M/d (E)", { locale: enUS }) }}
                </div>
              </div>
              <div
                class="i-tabler:chevron-right h-12 w-12 color-text-white lg:(h-20 w-20)"
              />
            </div>
          </a>
        </div>
      </div>
    </div>
    <div grid min-h-screen class="grid-rows-[auto_1fr_auto]">
      <div class="sticky top-0 z-1 shadow">
        <AppHeader />
      </div>
      <main class="h-full w-full flex flex-col items-center px-4 pb-16 pt-0">
        <div class="max-w-240 w-full">
          <slot />
        </div>
      </main>
      <AppFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { utcToJst } from '~/lib/date'

const { data: currentEvent, suspense } = useCurrentEventQuery()
onServerPrefetch(async () => {
  // https://github.com/TanStack/query/discussions/5688#discussioncomment-6652179
  await suspense().catch(() => {})
})

const pageLoaded = useState('loaded', () => false)
const handlePageLoaded = () => {
  pageLoaded.value = true
}

const isPageTop = useState('isPageTop', () => true)
const handleScroll = () => {
  isPageTop.value = window.scrollY === 0
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handlePageLoaded()

  return () => {
    window.removeEventListener('scroll', handleScroll)
  }
})
</script>

<template>
  <div>
    <!-- TODO: add effect animation -->
    <div
      :class="[
        'fixed z-1 w-full shadow transition-property-[top] transition-200',
        {
          'top--100px': isPageTop,
          'top-0': !isPageTop,
        },
      ]"
    >
      <AppHeader />
    </div>
    <div
      class="grid grid-cols-[auto] grid-rows-[1fr_auto] h-100dvh w-full animate-duration-200 animate-ease-out overflow-hidden lg:(grid-cols-[1fr_auto] grid-rows-[auto])"
    >
      <div class="relative h-full w-full overflow-hidden">
        <img
          v-if="currentEvent"
          :src="useEventImageUrl(currentEvent.slug)"
          class="h-full w-full object-cover"
        >
        <img
          width="500px"
          src="/img/logo/Gamecube_logo_full.svg"
          class="absolute bottom-0 right-0 max-w-500px w-full p-4 lg:w-500px"
        >
        <div
          :class="[
            'absolute bottom-0 right-0 w-full h-full bg-brand-orange',
            {
              '[--delay:1100ms] max-lg:animate-[300ms_var(--delay)_ease-out_forwards_slide-out-y] lg:animate-[300ms_var(--delay)_ease-out_forwards_slide-out-x]':
                pageLoaded,
            },
          ]"
        />
        <div
          :class="[
            'absolute bottom-0 right-0 w-full h-full bg-brand-violet',
            {
              '[--delay:1000ms] max-lg:animate-[300ms_var(--delay)_ease-out_forwards_slide-out-y] lg:animate-[300ms_var(--delay)_ease-out_forwards_slide-out-x]':
                pageLoaded,
            },
          ]"
        />
        <div
          v-if="!pageLoaded"
          class="absolute inset-0"
        >
          <LoadingIndicator class="color-white" />
        </div>
        <div
          v-else
          class="[--delay:0ms] absolute inset-0 flex animate-[1000ms_var(--delay)_ease_forwards_show-hide] items-center justify-center"
        >
          <div
            class="flex flex-col items-center justify-center gap-2 text-nowrap text-text-white h2-text"
          >
            <div
              :class="[
                'w-full b-l-4 b-white from-brand-cyan/80 to-brand-cyan/30 bg-gradient-to-r pl-4 pr-32 text-left text-brand-violet',
                {
                  '[--delay:0ms] animate-[300ms_var(--delay)_forwards_button-select]':
                    pageLoaded,
                },
              ]"
            >
              New Game
            </div>
            <div
              class="w-full b-l-4 b-white from-brand-cyan/20 to-transparent bg-gradient-to-r pl-4 pr-32"
            >
              Continue
            </div>
            <div
              class="w-full b-l-4 b-white from-brand-cyan/20 to-transparent bg-gradient-to-r pl-4 pr-32"
            >
              Settings
            </div>
          </div>
        </div>
      </div>
      <div
        class="h-full w-full flex flex-col items-end bg-brand-violet p-4 text-text-white sm:items-start lg:justify-center md:p-6"
      >
        <div
          class="mb-2 break-keep break-anywhere text-right font-700 sm:text-left h4-text lg:h2-text sm:h3-text"
        >
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
          <NuxtLink
            v-if="currentEvent"
            :to="`/event/${currentEvent?.slug}`"
          >
            <div class="flex items-center gap-4">
              <div
                class="text-brand-violet font-700 space-y-2 h3-text lg:(text-12 space-y-6) md:text-8 xl:text-16"
              >
                <div class="w-fit bg-surface-primary px-5 text-nowrap">
                  {{ currentEvent.slug }} Game³
                </div>
                <div class="w-fit bg-surface-primary px-5">
                  {{
                    format(utcToJst(currentEvent.date), "M/d (E)", {
                      locale: enUS,
                    })
                  }}
                </div>
              </div>
              <div
                class="i-tabler:chevron-right h-12 w-12 animate-[2s_infinite_shake-x] color-text-white lg:(h-20 w-20)"
              />
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div
      grid
      min-h-screen
      class="grid-rows-[1fr_auto]"
    >
      <main class="h-full w-full flex flex-col items-center px-4 pb-16 pt-0">
        <div class="max-w-240 w-full">
          <slot />
        </div>
      </main>
      <AppFooter />
    </div>
  </div>
</template>

<style lang="scss">
@use "~/assets/css/top-page.scss";
</style>

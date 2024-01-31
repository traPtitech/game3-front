<script setup lang="ts">
import {
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger
} from 'radix-vue'
import ListImage from '~/assets/list-marker.svg'

const { data: currentEvent, suspense: suspenseCurrentEvent } = useCurrentEventQuery()
const { data: events, suspense: suspenseEvents } = useEventsQuery()
const top3Events = computed(() => {
  if (!events.value) { return [] }
  return events.value.sort(
    (a, b) => b.gameSubmissionPeriodEnd < a.gameSubmissionPeriodEnd ? -1 : 1
  ).slice(0, 3)
})

onServerPrefetch(async () => {
  await suspenseCurrentEvent()
  await suspenseEvents()
})
</script>

<template>
  <header>
    <nav class="flex items-center gap-4 p-4">
      <NuxtLink to="/" class="mr-auto">
        <img
          src="/img/logo/Gamecube_logo_full.svg"
          alt="Game3ロゴ"
          class="h-16"
        >
      </NuxtLink>
      <PopoverRoot v-if="currentEvent">
        <PopoverTrigger as-child class="group">
          <UIButton>
            <template #label>
              {{ currentEvent.title }}
            </template>
            <template #suffix>
              <img :src="ListImage" aria-hidden class="transition-transform group-data-[state=closed]:rotate-90 group-data-[state=open]:rotate-270">
            </template>
          </UIButton>
        </PopoverTrigger>
        <PopoverPortal>
          <PopoverContent
            class="w-[var(--radix-popover-trigger-width)] bg-#6A49AA px-6 py-4 text-button text-brand-violet"
          >
            <nav>
              <ul class="space-y-4">
                <li>
                  <NuxtLink
                    class="w-full inline-flex items-center gap-2"
                    :to="`/event/${currentEvent.slug}`"
                  >
                    <img :src="ListImage" aria-hidden>
                    <StrokedText
                      class="text-stroke-white"
                      width="text-stroke-3"
                    >
                      開催概要
                    </StrokedText>
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink
                    class="w-full inline-flex items-center gap-2"
                    :to="`/event/${currentEvent.slug}/games`"
                  >
                    <img :src="ListImage" aria-hidden>
                    <StrokedText
                      class="text-stroke-white"
                      width="text-stroke-3"
                    >
                      出展者一覧
                    </StrokedText>
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink class="w-full inline-flex items-center gap-2" to="/entry/register">
                    <img :src="ListImage" aria-hidden>
                    <StrokedText
                      class="text-stroke-white"
                      width="text-stroke-3"
                    >
                      参加登録/ログイン
                    </StrokedText>
                  </NuxtLink>
                </li>
              </ul>
            </nav>
          </PopoverContent>
        </PopoverPortal>
      </PopoverRoot>
      <PopoverRoot v-if="events">
        <PopoverTrigger as-child class="group">
          <UIButton>
            <template #label>
              過去の開催
            </template>
            <template #suffix>
              <img :src="ListImage" aria-hidden class="transition-transform group-data-[state=closed]:rotate-90 group-data-[state=open]:rotate-270">
            </template>
          </UIButton>
        </PopoverTrigger>
        <PopoverPortal>
          <PopoverContent
            class="w-[var(--radix-popover-trigger-width)] bg-#6A49AA px-6 py-4 text-button text-brand-violet"
          >
            <nav>
              <ul class="space-y-4">
                <li
                  v-for="event in top3Events"
                  :key="event.slug"
                >
                  <NuxtLink
                    class="w-full inline-flex items-center gap-2"
                    :to="`/event/${event.slug}`"
                  >
                    <img :src="ListImage" aria-hidden>
                    <StrokedText
                      class="text-stroke-white"
                      width="text-stroke-3"
                    >
                      {{ event.title }}
                    </StrokedText>
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink
                    class="w-full inline-flex items-center gap-2"
                    to="/event"
                  >
                    <img :src="ListImage" aria-hidden>
                    <StrokedText
                      class="text-stroke-white"
                      width="text-stroke-3"
                    >
                      開催一覧
                    </StrokedText>
                  </NuxtLink>
                </li>
              </ul>
            </nav>
          </PopoverContent>
        </PopoverPortal>
      </PopoverRoot>
    </nav>
  </header>
</template>

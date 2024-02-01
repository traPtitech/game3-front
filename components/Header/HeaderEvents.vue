<script setup lang="ts">
import {
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger
} from 'radix-vue'
import ListImage from '~/assets/list-marker.svg'

const { data: events, suspense: suspenseEvents } = useEventsQuery()
const top3Events = computed(() => {
  if (!events.value) { return [] }
  return events.value.sort(
    (a, b) => b.gameSubmissionPeriodEnd < a.gameSubmissionPeriodEnd ? -1 : 1
  ).slice(0, 3)
})

onServerPrefetch(async () => {
  // https://github.com/TanStack/query/discussions/5688#discussioncomment-6652179
  await suspenseEvents().catch(() => {})
})
</script>

<template>
  <PopoverRoot v-if="top3Events.length > 0">
    <PopoverTrigger as-child class="group">
      <UIButton
        variant="secondary"
      >
        過去の開催
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
</template>

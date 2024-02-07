<script setup lang="ts">
import {
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger
} from 'radix-vue'

const { data: events, suspense: suspenseEvents } = useEventsQuery()
const top3Events = computed(() => {
  if (!events.value) { return [] }
  return events.value.toSorted(
    (a, b) => b.gameSubmissionPeriodEnd < a.gameSubmissionPeriodEnd ? -1 : 1
  ).slice(0, 3)
})

onServerPrefetch(async () => {
  // https://github.com/TanStack/query/discussions/5688#discussioncomment-6652179
  await suspenseEvents().catch(() => {})
})
</script>

<template>
  <PopoverRoot v-if="top3Events">
    <PopoverTrigger as-child class="group">
      <UIButton
        variant="secondary"
      >
        過去の開催
        <template #suffix>
          <img width="24" height="24" src="/img/list-marker.svg" aria-hidden class="transition-transform group-data-[state=closed]:rotate-90 group-data-[state=open]:rotate-270">
        </template>
      </UIButton>
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent
        class="z-10 w-[var(--radix-popover-trigger-width)] bg-#6A49AA px-6 py-4"
      >
        <HeaderEvents />
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>

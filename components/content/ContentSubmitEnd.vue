<script setup lang="ts">
type Props = {
  slug?: string;
};
const props = defineProps<Props>()
const loadedSlug = usePathParams('slug')
const eventSlug = computed(() => props.slug || loadedSlug)

const { data: event, suspense: suspenseEvent } = useEventQuery({
  eventSlug: eventSlug.value
})

onServerPrefetch(async () => {
  await suspenseEvent().catch(() => {})
})
</script>

<template>
  <div v-if="event">
    {{
      event.gameSubmissionPeriodEnd.toLocaleString("ja-JP", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        weekday: "short",
      })
    }}
  </div>
</template>

<!-- `/event` -->
<script setup lang="ts">
const { data, error, suspense } = useEventsQuery()
onServerPrefetch(async () => {
  await suspense()
})

if (error) {
  throw createError({
    statusCode: 500,
    statusMessage: error.value?.message
  })
}
</script>

<template>
  <ul>
    <li v-for="event in data" :key="event.id">
      <NuxtLink :to="`/event/${event.id}`">
        {{ event.title }}
      </NuxtLink>
    </li>
  </ul>
</template>

<!-- `/event` -->
<script setup lang="ts">
const { data, suspense } = useEventsQuery()
onServerPrefetch(async () => {
  await suspense()
})
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

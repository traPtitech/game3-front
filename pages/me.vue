<!-- `/me` -->
<script setup lang="ts">
definePageMeta({
  middleware: ['need-login'],
})

const { useMeStore } = useLogin()
const me = useMeStore()

useSeoMeta({
  title: 'マイページ',
  ogTitle: 'マイページ',
})
</script>

<template>
  <div v-if="me.user">
    <ProseH1>
      マイページ
    </ProseH1>
    <MeInfo :user="me.user" />
    <MeEntry />
    <MeEntries :user="me.user" />
  </div>
  <div v-else>
    <LoadingIndicator />
  </div>
</template>

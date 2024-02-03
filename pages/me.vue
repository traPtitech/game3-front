<!-- `/me` -->
<script setup lang="ts">
const { useMeStore } = useLogin()
const me = useMeStore()

useSeoMeta({
  title: 'マイページ'
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
</template>

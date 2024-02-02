<!-- `/admin` -->
<script setup lang="ts">
definePageMeta({
  middleware: ['need-admin']
})

useSeoMeta({
  title: '管理者ページ'
})
</script>

<template>
  <div>
    <ProseH1>
      管理者ページ
    </ProseH1>
    <ProseA to="/admin/event">
      イベント管理ページ
    </ProseA>
  </div>
</template>

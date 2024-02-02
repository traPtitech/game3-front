<!-- `/admin` -->
<script setup lang="ts">
definePageMeta({
  middleware: ['need-admin']
})
</script>

<template>
  <div>
    <ProseH1>
      管理者ページ
    </ProseH1>
    <NuxtLink to="/admin/event">
      イベント管理ページ
    </NuxtLink>
  </div>
</template>

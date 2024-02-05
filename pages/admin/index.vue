<!-- `/admin` -->
<script setup lang="ts">
definePageMeta({
  middleware: ['need-admin']
})

useSeoMeta({
  title: '管理者ページ',
  ogTitle: '管理者ページ'
})
</script>

<template>
  <div>
    <ProseH1>
      管理者ページ
    </ProseH1>
    <ProseUl>
      <li>
        <ProseA to="/admin/document">
          管理者ページ操作説明
        </ProseA>
      </li>
      <li>
        <ProseA to="/admin/event">
          イベント管理ページ
        </ProseA>
      </li>
    </ProseUl>
  </div>
</template>

<!-- `/event/:slug/pamphlet` -->
<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug
// TODO: slugからイベント情報, 作品一覧を取得

</script>

<template>
  <div>
    {{ slug }}のパンフレット
  </div>
</template>

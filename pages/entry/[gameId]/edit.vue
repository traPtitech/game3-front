<!-- `/entry/:gameId/edit` -->
<script setup lang="ts">
const route = useRoute()
const gameId = route.params.gameId
// TODO: gameIdから作品情報を取得
</script>

<template>
  <div>
    <h2>{{ gameId }}の作品編集</h2>
  </div>
</template>

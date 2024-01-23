<!-- `/entry/register` -->
<script setup lang="ts">
const { data, error, suspense } = useCurrentEventQuery()
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
  <div>
    <h2>GAME<sup>3</sup>展示作品登録</h2>
    <div v-if="data">
      <div>
        申し込み対象：{{ data.title }} GAME<sup>3</sup>
      </div>
      <form class="flex flex-col gap-4">
        <label>
          ブース展示者名
          <input type="text" required>
        </label>
        <label>
          所属団体名
          <input type="text">
        </label>
        <label>
          参加予定人数
          <input type="number" required>
        </label>
        <label>
          作品タイトル
          <input type="text" required>
        </label>
        <label>
          作品ジャンル
          <input type="text">
        </label>
        <label>
          開発環境
          <input type="text">
        </label>
        <label>
          作品の説明
          <input type="text">
        </label>
        <label>
          紹介画像
          <input type="file" accept="image/*">
        </label>
        <label>
          X アカウント
          <input type="text">
        </label>
        <label>
          WebサイトURL
          <input type="text">
        </label>
      </form>
    </div>
    <div v-else>
      申し込み対象のイベントがありません
    </div>
  </div>
</template>

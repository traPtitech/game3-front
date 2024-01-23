<!-- `/admin/event/:slug/edit` -->
<script setup lang="ts">
import { getParamsArray } from '~/lib/url'

const route = useRoute()
const slug = getParamsArray(route.params.slug)
if (!slug) {
  throw createError({
    statusCode: 404,
    statusMessage: 'イベントが見つかりませんでした'
  })
}

const { data, error, suspense } = useEventQuery(slug[0])
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
  <div v-if="data">
    <h2>{{ data.title }}の編集</h2>
    <div>
      <div>開始日：{{ data.gameSubmissionPeriodStart.toLocaleString("ja-JP") }}</div>
      <div>終了日：{{ data.gameSubmissionPeriodEnd.toLocaleString("ja-JP") }}</div>
    </div>
  </div>
</template>

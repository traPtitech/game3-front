<!-- `/event/:slug/edit` -->
<script setup lang="ts">
import { getParamsArray } from '~/lib/url'

const route = useRoute()
const slug = getParamsArray(route.params.slug)
if (!slug) {
  throw new Error('slug is not found')
}

// TODO: not found error handling
const { data, status, suspense } = useEventQuery(slug[0])

onServerPrefetch(async () => {
  await suspense()
})
</script>

<template>
  <div v-if="status === 'pending'">
    <div>読み込み中</div>
  </div>
  <div v-else-if="data">
    <h2>{{ data.title }}の編集</h2>
    <div>
      <div>開始日：{{ data.startAt.toLocaleString("ja-JP") }}</div>
      <div>終了日：{{ data.endAt.toLocaleString("ja-JP") }}</div>
    </div>
  </div>
</template>

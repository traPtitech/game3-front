<!-- `/entry/:gameId` -->
<script setup lang="ts">
import { getParamsArray } from '~/lib/url'

const route = useRoute()
const gameId = getParamsArray(route.params.gameId)
if (!gameId) {
  throw new Error('gameId is not found')
}

// TODO: not found error handling
const { data, status, suspense } = useGameQuery(gameId[0])
onServerPrefetch(async () => {
  await suspense()
})
</script>

<template>
  <div v-if="status === 'pending'">
    <div>読み込み中</div>
  </div>
  <div v-else-if="data">
    <h2>{{ data?.title }}</h2>
    <div>
      <div>タイトル</div>
      <div>{{ data?.title }}</div>
    </div>
    <div>
      <div>ジャンル</div>
      <div>{{ data?.genre }}</div>
    </div>
    <div>
      <div>説明</div>
      <div>{{ data?.description }}</div>
    </div>
    <div>
      <div>開発環境</div>
      <div>{{ data?.developmentEnvironment }}</div>
    </div>
    <div>
      <div>展示者名</div>
      <div>{{ data?.creatorName }}</div>
    </div>
    <div v-if="data?.organization">
      <div>所属</div>
      <div>{{ data.organization }}</div>
    </div>
    <div v-if="data?.twitterId">
      <div>Twitter (X) ID</div>
      <div>
        {{ data?.twitterId }}
      </div>
    </div>
    <div v-if="data?.websiteUrl">
      <div>Webサイト</div>
      <div>
        <a :href="data.websiteUrl">
          {{ data.websiteUrl }}
        </a>
      </div>
    </div>
  </div>
</template>

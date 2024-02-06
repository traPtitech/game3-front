<script setup lang="ts">
const { data: currentEvent, suspense } = useCurrentEventQuery()
onServerPrefetch(async () => {
  await suspense().catch(() => {})
})
</script>

<template>
  <div v-if="currentEvent">
    <ProseH2> 作品登録 </ProseH2>
    <div class="w-full flex flex-col items-center gap-4">
      <div class="body text-center text-brand-violet font-700">
        <div>現在の出展対象イベント：{{ currentEvent.title }} Game³</div>
        <div>
          出展締め切り：{{
            currentEvent.gameSubmissionPeriodEnd.toLocaleString("ja-JP")
          }}
        </div>
        <div class="text-text-semantic-error">出展に関するご案内はDiscordサーバーで行います</div>
      </div>
      <UIButton @click="navigateTo('/entry/register')">
        登録ページへ
      </UIButton>
    </div>
  </div>
</template>

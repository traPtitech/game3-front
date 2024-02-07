<script setup lang="ts">
const { data: currentEvent, isLoading } = useCurrentEventQuery()
const canSubmit = computed(() => {
  if (!currentEvent.value) { return false }
  const today = new Date()
  return currentEvent.value.gameSubmissionPeriodStart <= today && today <= currentEvent.value.gameSubmissionPeriodEnd
})
</script>

<template>
  <div>
    <ProseH2> 作品登録 </ProseH2>
    <div v-if="isLoading">
      <LoadingIndicator class="color-brand-violet" />
    </div>
    <div v-else>
      <div v-if="currentEvent && canSubmit" class="w-full flex flex-col gap-4">
        <div class="text-center text-brand-violet font-700 body">
          <div>現在の出展対象イベント：{{ currentEvent.title }} Game³</div>
          <div>
            出展締め切り：{{
              currentEvent.gameSubmissionPeriodEnd.toLocaleString("ja-JP")
            }}
          </div>
          <div class="text-text-semantic-error">
            出展に関するご案内はDiscordサーバーで行います
          </div>
          <UIButton class="mt-2" @click="navigateTo('/entry/register')">
            登録ページへ
          </UIButton>
        </div>
      </div>
      <div v-else-if="currentEvent && !canSubmit">
        <div class="text-center text-brand-violet font-700 body">
          <div>イベント：{{ currentEvent.title }} Game³</div>
          <div>
            登録開始日時：{{
              currentEvent.gameSubmissionPeriodStart.toLocaleString("ja-JP")
            }}
          </div>
          <div>
            登録締切日時：{{
              currentEvent.gameSubmissionPeriodEnd.toLocaleString("ja-JP")
            }}
          </div>
          <div class="text-text-semantic-error">
            登録期間外のため現在は出展登録ができません
          </div>
        </div>
      </div>
      <div v-else class="text-center text-text-semantic-error">
        現在申し込み対象のイベントがありません
      </div>
    </div>
  </div>
</template>

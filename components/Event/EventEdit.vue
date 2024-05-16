<script setup lang="ts">
import { useForm } from 'vee-validate'
import { object, string, minLength, blob, optional, date } from 'valibot'
import { toTypedSchema } from '@vee-validate/valibot'
import { DialogRoot } from 'radix-vue'
import type { Event } from '~/lib/api'

type Props = {
  event: Event
}
const props = defineProps<Props>()

const { handleSubmit, meta, values, setValues, isSubmitting } = useForm({
  validationSchema: toTypedSchema(
    object({
      title: string([
        minLength(1, 'イベントタイトルは1文字以上で入力してください'),
      ]),
      date: date(),
      gameSubmissionPeriodStart: date(),
      gameSubmissionPeriodEnd: date(),
      image: optional(blob()),
    }),
  ),
  initialValues: {
    ...props.event,
  },
})

// useQueryを使うと`Cannot stringify arbitrary non-POJOs`エラーで落ちるので直接呼ぶ
const imageDataPromise = eventsApi.getEventImage({
  eventSlug: props.event.slug,
})
const setImageData = imageDataPromise.then((data) => {
  setValues({
    image: data,
  })
})
const { pending } = useLazyAsyncData(() => setImageData)

const confirmModalOpen = ref(false)
const { $toast } = useNuxtApp()

const { mutateAsync } = useMutatePatchEvent()
const onSubmit = handleSubmit(async (values) => {
  try {
    await mutateAsync({
      ...values,
      eventSlug: props.event.slug,
    })
    $toast.success('イベントの編集が完了しました！')
    confirmModalOpen.value = false
  }
  catch (e) {
    $toast.error('イベントの編集に失敗しました')
    console.error(e)
  }
})
</script>

<template>
  <div>
    <ProseH2>イベント編集フォーム</ProseH2>
    <div
      v-if="!pending"
      class="w-full flex flex-col gap-4"
    >
      <form class="flex flex-col gap-4">
        <UITextField
          label="イベントタイトル"
          helper-text="'第n回'のフォーマットでの入力を推奨。画面右上の開催回数名表示などで使用します。"
          name="title"
          placeholder="第99回"
        />
        <UIDatePicker
          label="開催日"
          helper-text="イベント開催日"
          name="date"
        />
        <UIDatePicker
          label="出展受付開始日時"
          helper-text="ゲーム登録期間開始日時"
          name="gameSubmissionPeriodStart"
        />
        <UIDatePicker
          label="出展受付終了日時"
          helper-text="ゲーム登録期間終了日時"
          name="gameSubmissionPeriodEnd"
        />
        <UIFileField
          label="イベントトップ画像"
          helper-text="最大辺のサイズ1024px程度を推奨。トップページ等で使用します。"
          accept="image/png, image/jpeg"
          name="image"
        />
        <div class="flex justify-center">
          <DialogRoot v-model:open="confirmModalOpen">
            <UIButton
              type="button"
              :disabled="!meta.valid"
              @click="confirmModalOpen = true"
            >
              更新確認
            </UIButton>
            <UIDialog>
              <div class="space-y-6 body">
                <h3 class="h3-text">
                  以下の内容で更新します。よろしいですか？
                </h3>
                <div class="space-y-2">
                  <div>イベント名：{{ values.title }}</div>
                  <div>
                    開催日{{
                      values.date?.toLocaleString("ja-JP", {
                        timeZone: "Asia/Tokyo",
                      })
                    }}
                  </div>
                  <div>
                    申し込み開始日時{{
                      values.gameSubmissionPeriodStart?.toLocaleString(
                        "ja-JP",
                        {
                          timeZone: "Asia/Tokyo",
                        },
                      )
                    }}
                  </div>
                  <div>
                    申し込み終了日時{{
                      values.gameSubmissionPeriodEnd?.toLocaleString("ja-JP", {
                        timeZone: "Asia/Tokyo",
                      })
                    }}
                  </div>
                </div>
                <div class="flex flex-col items-center gap-2 md:flex-row">
                  <UIButton
                    type="button"
                    variant="secondary"
                    @click="confirmModalOpen = false"
                  >
                    キャンセル
                  </UIButton>
                  <UIButton
                    type="submit"
                    :is-loading="isSubmitting"
                    @click="onSubmit"
                  >
                    登録する
                  </UIButton>
                </div>
              </div>
            </UIDialog>
          </DialogRoot>
        </div>
      </form>
    </div>
    <div v-else>
      <LoadingIndicator />
    </div>
  </div>
</template>

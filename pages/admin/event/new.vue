<!-- `/entry/register` -->
<script setup lang="ts">
import { useForm } from 'vee-validate'
import {
  object,
  string,
  minLength,
  blob,
  optional,
  regex,
  date
} from 'valibot'
import { toTypedSchema } from '@vee-validate/valibot'
import {
  DialogRoot
} from 'radix-vue'

definePageMeta({
  middleware: ['login']
})

const { handleSubmit, meta, values } = useForm({
  validationSchema: toTypedSchema(
    object({
      title: string([
        minLength(1, 'イベントタイトルは1文字以上で入力してください')
      ]),
      slug: string([
        minLength(1, 'slugは1文字以上で入力してください'),
        regex(/^[a-z0-9]+$/, 'slugは半角英数字のみで入力してください')
      ]),
      gameSubmissionPeriodStart: date(),
      gameSubmissionPeriodEnd: date(),
      image: optional(blob())
    })
  )
})

const confirmModalOpen = ref(false)
const { $toast } = useNuxtApp()

const { mutateAsync } = useMutatePostEvent()
const onSubmit = handleSubmit(async (values) => {
  try {
    const submittedEvent = await mutateAsync(values)
    $toast.success('イベントの登録が完了しました！')
    await navigateTo(`/admin/event/${submittedEvent.slug}`)
  } catch (e) {
    $toast.error('イベントの登録に失敗しました')
    console.error(e)
  }
})
</script>

<template>
  <div>
    <ProseH1>
      イベント新規作成ページ
    </ProseH1>
    <ProseH2>
      イベント情報入力フォーム
    </ProseH2>
    <div class="w-full flex flex-col gap-4">
      <form class="flex flex-col gap-4">
        <UITextField label="イベントタイトル" helper-text="'第n回'のフォーマットでの入力を推奨。画面右上の開催回数名表示などで使用します。" name="title" placeholder="第99回" />
        <UITextField label="イベントslug" helper-text="半角英数字で入力。'/event/99th/...'などのURL内やトップページでの表示に使用します。" name="slug" placeholder="99th" />
        <UIDatePicker label="出展受付開始日時" helper-text="ゲーム登録期間開始日時" name="gameSubmissionPeriodStart" type="date" />
        <UIDatePicker label="出展受付終了日時" helper-text="ゲーム登録期間終了日時" name="gameSubmissionPeriodEnd" type="date" />
        <UIFileField label="イベントトップ画像" helper-text="最大辺のサイズ1024px程度を推奨。トップページ等で使用します。" accept="image/*" name="image" />
        <div class="flex justify-center">
          <DialogRoot
            v-model:open="confirmModalOpen"
          >
            <UIButton
              type="button"
              :disabled="!meta.valid"
              @click="confirmModalOpen = true"
            >
              登録確認
            </UIButton>
            <UIDialog>
              <div class="text-body">
                <div class="text-5 font-500">
                  以下の内容で登録します。よろしいですか？
                </div>
                <div class="mb-8 space-y-2">
                  <div>イベント名：{{ values.title }}</div>
                  <div>イベントslug：{{ values.slug }}</div>
                  <div>申し込み開始日時{{ values.gameSubmissionPeriodStart?.toLocaleString("ja-JP") }}</div>
                  <div>申し込み終了日時{{ values.gameSubmissionPeriodEnd?.toLocaleString("ja-JP") }}</div>
                </div>
                <div class="flex gap-4">
                  <UIButton
                    type="button"
                    variant="secondary"
                  >
                    キャンセル
                  </UIButton>
                  <UIButton
                    type="submit"
                    :disabled="meta.pending"
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
  </div>
</template>
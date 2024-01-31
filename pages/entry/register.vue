<!-- `/entry/register` -->
<script setup lang="ts">
import { useForm } from 'vee-validate'
import {
  object,
  string,
  minLength,
  url,
  blob,
  optional,
  union,
  literal
} from 'valibot'
import { toTypedSchema } from '@vee-validate/valibot'
import {
  DialogRoot
} from 'radix-vue'

const { data, suspense } = useCurrentEventQuery()
onServerPrefetch(async () => {
  await suspense()
})

const { handleSubmit, meta, values } = useForm({
  validationSchema: toTypedSchema(
    object({
      title: string([
        minLength(1, '作品タイトルは1文字以上で入力してください')
      ]),
      gamePageUrl: optional(
        union([
          string([url('ゲームページURLは正しいURL形式で入力してください')]),
          literal('')
        ])
      ),
      creatorName: string([
        minLength(1, '出展者名は1文字以上で入力してください')
      ]),
      creatorPageUrl: optional(
        union([
          string([url('出展者ページURLは正しいURL形式で入力してください')]),
          literal('')
        ])
      ),
      icon: blob(),
      description: optional(string(), ''),
      image: optional(blob())
    })
  )
})

const confirmModalOpen = ref(false)

const { mutateAsync } = useMutatePostGame()
const onSubmit = handleSubmit(async (values) => {
  try {
    // TODO: show confirm dialog
    await mutateAsync(values)
    // TODO: redirect
    // TODO: toast
  } catch (e) {
    console.error(e)
  }
})
</script>

<template>
  <div class="flex flex-col items-center gap-4 px-8 pb-16 pt-4">
    <h2 class="text-center text-h2 text-text-white text-shadow-4">
      <StrokedText>
        作品情報入力フォーム
      </StrokedText>
    </h2>
    <div v-if="data" class="max-w-1000px w-full">
      <div class="text-center text-brand-violet font-700">
        <div>現在の出展対象イベント：{{ data.title }} Game<sup>3</sup></div>
        <div>出展締め切り：{{ data.gameSubmissionPeriodEnd.toLocaleString("ja-JP") }}</div>
      </div>
      <form class="flex flex-col gap-4">
        <UITextField label="ゲーム名" name="title" />
        <UITextField label="ゲームページリンク" name="gamePageUrl" placeholder="https://example.com" />
        <UITextField label="出展者名" name="creatorName" />
        <UITextField label="出展者ホームページ" name="creatorPageUrl" placeholder="https://example.com" />
        <UITextAreaField label="ゲーム詳細" name="description" />
        <UIFileField label="ゲーム画像" accept="image/*" name="image" />
        <UIFileField
          label="アイコン画像"
          accept="image/*"
          name="icon"
          use-crop
          :aspect-ratio="1"
        />
        <!-- TODO: preview -->
        <span>※運営による内容確認で問題がなかった場合、ホームページに公開されます</span>
        <div class="flex justify-center">
          <DialogRoot
            v-model:open="confirmModalOpen"
          >
            <UIButton
              type="button"
              :disabled="!meta.valid || meta.pending || !meta.dirty"
              @click="confirmModalOpen = true"
            >
              <template #label>
                登録確認
              </template>
            </UIButton>
            <UIDialog>
              <div>
                以下の内容で登録します。よろしいですか？
                <div>
                  <div>ゲーム名：{{ values.title }}</div>
                  <div>ゲームページリンク：{{ values.gamePageUrl }}</div>
                  <div>出展者名：{{ values.creatorName }}</div>
                  <div>出展者ホームページ：{{ values.creatorPageUrl }}</div>
                  <div>ゲーム詳細：{{ values.description }}</div>
                </div>
                <div class="flex gap-4">
                  <UIButton
                    type="button"
                  >
                    <template #label>
                      キャンセル
                    </template>
                  </UIButton>
                  <UIButton
                    type="submit"
                    @click="onSubmit"
                  >
                    <template #label>
                      登録する
                    </template>
                  </UIButton>
                </div>
              </div>
            </UIDialog>
          </DialogRoot>
        </div>
      </form>
    </div>
    <div v-else>
      申し込み対象のイベントがありません
    </div>
  </div>
</template>

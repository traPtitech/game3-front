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
  await suspense().catch(() => {})
})

const { handleSubmit, meta, values } = useForm({
  validationSchema: toTypedSchema(
    object({
      title: string([
        minLength(1, '作品タイトルは1文字以上で入力してください')
      ]),
      gamePageUrl: optional(
        union([
          literal(''),
          string([url('ゲームページURLは正しいURL形式で入力してください')])
        ], 'ゲームページURLは正しいURL形式で入力してください')
      ),
      creatorName: string([
        minLength(1, '出展者名は1文字以上で入力してください')
      ]),
      creatorPageUrl: optional(
        union([
          string([url('出展者ページURLは正しいURL形式で入力してください')]),
          literal('')
        ], 'ゲームページURLは正しいURL形式で入力してください')
      ),
      icon: blob(),
      description: optional(string(), ''),
      image: optional(blob())
    })
  )
})

const confirmModalOpen = ref(false)
const { $toast } = useNuxtApp()

const { mutateAsync } = useMutatePostGame()
const onSubmit = handleSubmit(async (values) => {
  try {
    const submittedGame = await mutateAsync(values)
    $toast.success('ゲームの登録が完了しました！')
    await navigateTo(`/entry/${submittedGame.id}`)
  } catch (e) {
    $toast.error('ゲームの登録に失敗しました')
    console.error(e)
  }
})
</script>

<template>
  <div>
    <ProseH1>
      作品登録ページ
    </ProseH1>
    <ProseH2>
      作品情報入力フォーム
    </ProseH2>
    <div v-if="data" class="w-full flex flex-col gap-4">
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
        <ProseH3>
          登録内容プレビュー
        </ProseH3>
        <EntryPreview
          :game-req="values"
        />
        <span>※運営による内容確認で問題がなかった場合、ホームページに公開されます</span>
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
                  <div>ゲーム名：{{ values.title }}</div>
                  <div>ゲームページリンク：{{ values.gamePageUrl ?? "未指定" }}</div>
                  <div>出展者名：{{ values.creatorName }}</div>
                  <div>出展者ホームページ：{{ values.creatorPageUrl ?? "未指定" }}</div>
                  <div>ゲーム詳細：{{ values.description ?? "未指定" }}</div>
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
    <div v-else>
      現在申し込み対象のイベントがありません
    </div>
  </div>
</template>

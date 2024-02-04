<!-- `/entry/:gameId/edit` -->
<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/valibot'
import { DialogRoot } from 'radix-vue'
import {
  object,
  string,
  minLength,
  url,
  blob,
  optional,
  union,
  literal,
  boolean
} from 'valibot'
import { useForm } from 'vee-validate'
import { useMe } from '~/store/me'

definePageMeta({
  middleware: ['need-login']
})

const gameId = usePathParams('gameId')

const { useMeStore } = useMe()
const me = useMeStore()

const { data: game, suspense: suspenseGame } = useGameQuery({ gameId })
const { suspense: suspenseIcon } = useGameIconQuery({ gameId })
const { suspense: suspenseImage } = useGameImageQuery({
  gameId
})

const { handleSubmit, meta, values, setFieldValue } = useForm({
  validationSchema: toTypedSchema(
    object({
      gameId: string(),
      title: string([
        minLength(1, '作品タイトルは1文字以上で入力してください')
      ]),
      gamePageUrl: optional(
        union(
          [
            literal(''),
            string([url('ゲームページURLは正しいURL形式で入力してください')])
          ],
          'ゲームページURLは正しいURL形式で入力してください'
        )
      ),
      creatorName: string([
        minLength(1, '出展者名は1文字以上で入力してください')
      ]),
      creatorPageUrl: optional(
        union(
          [
            string([url('出展者ページURLは正しいURL形式で入力してください')]),
            literal('')
          ],
          'ゲームページURLは正しいURL形式で入力してください'
        )
      ),
      icon: blob(),
      description: optional(string(), ''),
      place: optional(string(), ''),
      image: optional(blob()),
      isPublished: optional(boolean())
    })
  ),
  initialValues: {
    gameId
  }
})

suspenseGame().then((res) => {
  if (res) {
    setFieldValue('title', res.data?.title)
    setFieldValue('gamePageUrl', res.data?.gamePageUrl)
    setFieldValue('creatorName', res.data?.creatorName)
    setFieldValue('creatorPageUrl', res.data?.creatorPageUrl)
    setFieldValue('description', res.data?.description)
    setFieldValue('place', res.data?.place)
    setFieldValue('isPublished', res.data?.isPublished)
  }
})
suspenseIcon().then((res) => {
  if (res) {
    setFieldValue('icon', res.data)
  }
}).catch(() => {})
suspenseImage().then((res) => {
  if (res) {
    setFieldValue('image', res.data)
  }
}).catch(() => {})

const confirmModalOpen = ref(false)
const { $toast } = useNuxtApp()

const { mutateAsync } = useMutatePatchGame()
const onSubmit = handleSubmit(async (values) => {
  try {
    await mutateAsync(values)
    $toast.success('ゲームの編集が完了しました！')
    await navigateTo(`/entry/${values.gameId}`)
  } catch (e) {
    $toast.error('ゲームの編集に失敗しました')
    console.error(e)
  }
})

useSeoMeta({
  title: () => game.value ? `${game.value.title} by ${game.value.creatorName} | 編集ページ` : 'ゲーム編集',
  ogTitle: () => game.value ? `${game.value.title} by ${game.value.creatorName} | 編集ページ` : 'ゲーム編集'
})
</script>

<template>
  <div>
    <ProseH1> 作品編集ページ </ProseH1>
    <ProseH2> 作品情報入力フォーム </ProseH2>
    <div class="w-full flex flex-col gap-4">
      <form class="flex flex-col gap-4">
        <UITextField label="ゲーム名" name="title" />
        <UITextField
          label="ゲームページリンク"
          name="gamePageUrl"
          placeholder="https://example.com"
        />
        <UITextField label="出展者名" name="creatorName" />
        <UITextField
          label="出展者ホームページ"
          name="creatorPageUrl"
          placeholder="https://example.com"
        />
        <UITextAreaField label="ゲーム詳細" name="description" />
        <UIFileField label="ゲーム画像" accept="image/*" name="image" />
        <UIFileField
          label="アイコン画像"
          accept="image/*"
          name="icon"
          use-crop
          :aspect-ratio="1"
        />
        <UITextField
          v-if="me.user?.role === 'admin'"
          label="展示場所 (admin only)"
          name="place"
          placeholder="1-A"
        />
        <EntryTermSelect
          v-if="me.user?.role === 'admin'"
          label="ターム (admin only)"
          name="termId"
        />
        <UISwitch
          v-if="me.user?.role === 'admin'"
          label="公開状態 (admin only)"
          name="isPublished"
          true-state="全体に公開 (非ログインユーザー含む全員がページ上で閲覧可能)"
          false-state="非公開 (管理者/登録申請したユーザーのみがページ上で閲覧可能)"
        />
        <ProseH3> 登録内容プレビュー </ProseH3>
        <EntryPreview :game-req="values" />
        <span>※運営による内容確認で問題がなかった場合、ホームページに公開されます</span>
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
                  <div>ゲーム名：{{ values.title }}</div>
                  <div>
                    ゲームページリンク：{{ values.gamePageUrl ?? "未指定" }}
                  </div>
                  <div>出展者名：{{ values.creatorName }}</div>
                  <div>
                    出展者ホームページ：{{ values.creatorPageUrl ?? "未指定" }}
                  </div>
                  <div>ゲーム詳細：{{ values.description ?? "未指定" }}</div>
                </div>
                <div class="flex gap-4">
                  <UIButton
                    type="button"
                    variant="secondary"
                    @click="confirmModalOpen = false"
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

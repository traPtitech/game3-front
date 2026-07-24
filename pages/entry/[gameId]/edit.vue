<!-- `/entry/:gameId/edit` -->
<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/valibot'
import { DialogRoot } from 'radix-vue'
import * as v from 'valibot'
import { useForm } from 'vee-validate'
import { gamesApi } from '~/composables/useQuery'
import type { PatchGameRequest } from '~/lib/api'
import { zipFile } from '~/lib/file'
import { useMe } from '~/store/me'

type EditFormValues = Omit<PatchGameRequest, 'teamSize'> & {
  teamSize?: number
}

definePageMeta({
  middleware: ['need-login'],
})

const gameId = usePathParams('gameId')

const { useMeStore } = useMe()
const me = useMeStore()

const { data: game, suspense: suspenseGame } = useGameQuery({ gameId })

// useQueryを使うと`Cannot stringify arbitrary non-POJOs`エラーで落ちるので直接呼ぶ
const iconDataPromise = gamesApi.getGameIcon({ gameId })
const imageDataPromise = gamesApi.getGameImage({ gameId })

const { handleSubmit, meta, values, setFieldValue, isSubmitting }
  = useForm<EditFormValues>({
    validationSchema: toTypedSchema(
      v.object({
        gameId: v.string(),
        termId: v.optional(v.string()),
        title: v.pipe(
          v.string(),
          v.minLength(1, '作品タイトルは1文字以上で入力してください'),
        ),
        gamePageUrl: v.optional(
          v.union(
            [
              v.literal(''),
              v.pipe(
                v.string(),
                v.url('ゲームページURLは正しいURL形式で入力してください'),
              ),
            ],
            'ゲームページURLは正しいURL形式で入力してください',
          ),
        ),
        creatorName: v.pipe(
          v.string(),
          v.minLength(1, '出展団体名は1文字以上で入力してください'),
        ),
        representativeName: v.pipe(
          v.string(),
          v.minLength(1, '団体の代表者名は1文字以上で入力してください'),
        ),
        isStudentOrganization: v.boolean(),
        teamSize: v.pipe(
          v.number('当日のチーム人数は1以上の整数で入力してください'),
          v.integer('当日のチーム人数は1以上の整数で入力してください'),
          v.minValue(1, '当日のチーム人数は1以上の整数で入力してください'),
        ),
        creatorPageUrl: v.optional(
          v.union(
            [
              v.pipe(
                v.string(),
                v.url('出展団体ページURLは正しいURL形式で入力してください'),
              ),
              v.literal(''),
            ],
            'ゲームページURLは正しいURL形式で入力してください',
          ),
        ),
        icon: v.blob(),
        description: v.optional(v.string(), ''),
        place: v.optional(v.string(), ''),
        image: v.optional(v.blob()),
        build: v.optional(zipFile()),
        isPublished: v.optional(v.boolean()),
      }),
    ),
    initialValues: {
      gameId,
      isStudentOrganization: false,
    },
  })

const setGameData = suspenseGame().then((gameData) => {
  setFieldValue('title', gameData.data?.title)
  setFieldValue('gamePageUrl', gameData.data?.gamePageUrl)
  setFieldValue('creatorName', gameData.data?.creatorName)
  setFieldValue('representativeName', gameData.data?.representativeName)
  setFieldValue('isStudentOrganization', gameData.data?.isStudentOrganization)
  setFieldValue('teamSize', gameData.data?.teamSize)
  setFieldValue('creatorPageUrl', gameData.data?.creatorPageUrl)
  setFieldValue('description', gameData.data?.description)

  if (me.value.user?.role === 'admin') {
    setFieldValue('termId', gameData.data?.termId)
    setFieldValue('place', gameData.data?.place)
    setFieldValue('isPublished', gameData.data?.isPublished)
  }
})

const setIconData = iconDataPromise.then((icon) => {
  setFieldValue('icon', icon)
})

const setImageData = imageDataPromise.then((image) => {
  // 画像が存在しない場合も200が返るので、サイズで判定
  if (image.size === 0) {
    return
  }
  setFieldValue('image', image)
})

const { pending } = useLazyAsyncData(() =>
  Promise.all([setGameData, setIconData, setImageData]),
)
const previewValues = computed(() => ({
  ...values,
}))

const confirmModalOpen = ref(false)
const { $toast } = useNuxtApp()

const { mutateAsync } = useMutatePatchGame()
const onSubmit = handleSubmit(async (values) => {
  try {
    if (me.value.user?.role === 'admin') {
      await mutateAsync({
        ...values,
      })
    }
    else {
      await mutateAsync({
        gameId: values.gameId,
        title: values.title,
        gamePageUrl: values.gamePageUrl,
        creatorName: values.creatorName,
        representativeName: values.representativeName,
        isStudentOrganization: values.isStudentOrganization,
        teamSize: values.teamSize,
        creatorPageUrl: values.creatorPageUrl,
        description: values.description,
        icon: values.icon,
        image: values.image,
        build: values.build,
      })
    }
    $toast.success('ゲームの編集が完了しました！')
    await navigateTo(`/entry/${values.gameId}`)
  }
  catch (e) {
    $toast.error('ゲームの編集に失敗しました')
    console.error(e)
  }
})

useSeoMeta({
  title: () =>
    game.value
      ? `${game.value.title} by ${game.value.creatorName} | 編集ページ`
      : 'ゲーム編集',
  ogTitle: () =>
    game.value
      ? `${game.value.title} by ${game.value.creatorName} | 編集ページ`
      : 'ゲーム編集',
})
</script>

<template>
  <div>
    <ProseH1> 作品編集ページ </ProseH1>
    <ProseH2> 作品情報入力フォーム </ProseH2>
    <div
      v-if="!pending"
      class="w-full flex flex-col gap-4"
    >
      <form class="flex flex-col gap-4">
        <UITextField
          label="ゲーム名"
          name="title"
        />
        <UITextField
          label="ゲームページリンク"
          name="gamePageUrl"
          placeholder="https://example.com"
        />
        <UITextField
          label="出展団体名"
          name="creatorName"
        />
        <UITextField
          label="団体の代表者名"
          name="representativeName"
        />
        <UISwitch
          label="学生団体かどうか"
          name="isStudentOrganization"
          true-state="学生団体"
          false-state="学生団体ではない"
        />
        <UINumberField
          label="当日のチーム人数"
          name="teamSize"
          placeholder="3"
        />
        <UITextField
          label="出展団体ホームページ"
          name="creatorPageUrl"
          placeholder="https://example.com"
        />
        <UITextAreaField
          label="ゲーム詳細"
          name="description"
        />
        <UIFileField
          label="ゲーム画像"
          accept="image/png, image/jpeg"
          name="image"
          helper-text="作品詳細ページに表示されます。"
        />
        <UIFileField
          label="アイコン画像"
          accept="image/png, image/jpeg"
          name="icon"
          use-crop
          :aspect-ratio="1"
          helper-text="作品一覧ページやSNSシェア時に表示されます。正方形にトリミングされます。"
        />
        <UIZipFileField
          label="ゲームビルド"
          accept=".zip,application/zip"
          name="build"
          helper-text="差し替える場合のみZIPファイルを選択してください。"
        />
        <UITextField
          v-if="me.user?.role === 'admin'"
          label="展示場所 (admin only)"
          name="place"
          placeholder="1-A"
          helper-text="イベント内での展示場所の表示に使用されます。"
        />
        <EntryTermSelect
          v-if="me.user?.role === 'admin'"
          label="ターム (admin only)"
          name="termId"
          helper-text="出展対象のイベントタームを選択してください。対象イベントに注意。"
        />
        <UISwitch
          v-if="me.user?.role === 'admin'"
          label="公開状態 (admin only)"
          name="isPublished"
          true-state="全体に公開 (非ログインユーザー含む全員がページ上で閲覧可能)"
          false-state="非公開 (管理者/登録申請したユーザーのみがページ上で閲覧可能)"
        />
        <ProseH3> 登録内容プレビュー </ProseH3>
        <div class="b-1 b-border-secondary rounded p-4">
          <EntryPreview :game-req="previewValues" />
        </div>
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
                  <div>出展団体名：{{ values.creatorName }}</div>
                  <div>団体の代表者名：{{ values.representativeName }}</div>
                  <div>
                    学生団体かどうか：{{
                      values.isStudentOrganization ? "学生団体" : "学生団体ではない"
                    }}
                  </div>
                  <div>当日のチーム人数：{{ values.teamSize ?? "未指定" }}人</div>
                  <div>
                    出展団体ホームページ：{{ values.creatorPageUrl ?? "未指定" }}
                  </div>
                  <div>ゲーム詳細：{{ values.description ?? "未指定" }}</div>
                  <div>
                    ゲームビルド：{{ values.build ? "差し替えあり" : "差し替えなし" }}
                  </div>
                  <div v-if="me.user?.role === 'admin'">
                    タームID：{{ values.termId ?? "未指定" }}
                  </div>
                  <div>
                    公開状態：{{ values.isPublished ? "全体に公開" : "非公開" }}
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

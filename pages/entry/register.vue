<!-- `/entry/register` -->
<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as v from 'valibot'
import { toTypedSchema } from '@vee-validate/valibot'
import { DialogRoot } from 'radix-vue'
import type { PostGameRequest } from '~/lib/api'
import { useMe } from '~/store/me'

definePageMeta({
  middleware: ['need-login'],
})

const { useMeStore } = useMe()
const me = useMeStore()

const { data: currentEvent, isLoading } = useCurrentEventQuery()
const canSubmit = computed(() => {
  // 現在のイベントが取得できなかったら出展登録できない
  if (!currentEvent.value) {
    return false
  }

  // Adminなら応募期間に関係なく出展登録できる
  if (me.value.user?.role === 'admin') {
    return true
  }

  // 応募期間内なら出展登録できる
  const today = new Date()
  return (
    currentEvent.value.gameSubmissionPeriodStart <= today
    && today <= currentEvent.value.gameSubmissionPeriodEnd
  )
})

const { handleSubmit, meta, values, isSubmitting } = useForm<PostGameRequest>({
  validationSchema: toTypedSchema(
    v.object({
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
        v.minLength(1, '出展者名は1文字以上で入力してください'),
      ),
      creatorPageUrl: v.optional(
        v.union(
          [
            v.pipe(
              v.string(),
              v.url('出展者ページURLは正しいURL形式で入力してください'),
            ),
            v.literal(''),
          ],
          'ゲームページURLは正しいURL形式で入力してください',
        ),
      ),
      icon: v.blob(),
      description: v.optional(v.string(), ''),
      image: v.optional(v.blob()),
    }),
  ),
})

const confirmModalOpen = ref(false)
const { $toast } = useNuxtApp()

const { mutateAsync } = useMutatePostGame()
const onSubmit = handleSubmit(async (values) => {
  try {
    const submittedGame = await mutateAsync(values)
    $toast.success('ゲームの登録が完了しました！')
    await navigateTo(`/entry/${submittedGame.id}`)
  }
  catch (e) {
    $toast.error('ゲームの登録に失敗しました')
    console.error(e)
  }
})

useSeoMeta({
  title: '作品登録ページ',
  ogTitle: '作品登録ページ',
})
</script>

<template>
  <div>
    <ProseH1> 作品登録ページ </ProseH1>
    <ProseH2> 作品情報入力フォーム </ProseH2>
    <div v-if="isLoading">
      <LoadingIndicator class="color-brand-violet" />
    </div>
    <div v-else>
      <div
        v-if="currentEvent && canSubmit"
        class="w-full flex flex-col gap-4"
      >
        <div class="text-center text-brand-violet font-700 body">
          <div>現在の出展対象イベント：{{ currentEvent.title }} Game³</div>
          <div>
            出展締め切り：{{
              currentEvent.gameSubmissionPeriodEnd.toLocaleString("ja-JP", {
                timeZone: "Asia/Tokyo",
              })
            }}
          </div>
          <div
            v-if="me.user?.role === 'admin'"
            class="text-text-semantic-error"
          >
            <span>管理者としてアクセスしているため出展期間外でも出展可能になっています</span>
          </div>
          <div class="text-text-semantic-error">
            出展に関するご案内は
            <ProseA
              href="https://discord.gg/nJCpsttgUU"
              target="_blank"
              rel="noopener noreferrer"
            >
              Game³ Discordサーバー
            </ProseA>
            で行います
          </div>
        </div>
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
            label="出展者名"
            name="creatorName"
          />
          <UITextField
            label="出展者ホームページ"
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
          <ProseH3> 登録内容プレビュー </ProseH3>
          <div class="b-1 b-border-secondary rounded p-4">
            <EntryPreview :game-req="values" />
          </div>
          <span>※運営による内容確認で問題がなかった場合、ホームページに公開されます</span>
          <div class="flex justify-center">
            <DialogRoot v-model:open="confirmModalOpen">
              <UIButton
                type="button"
                :disabled="!meta.valid"
                @click="confirmModalOpen = true"
              >
                登録確認
              </UIButton>
              <UIDialog>
                <div class="space-y-6 body">
                  <div class="h3-text">
                    以下の内容で登録します。よろしいですか？
                  </div>
                  <div class="space-y-2">
                    <div>ゲーム名：{{ values.title }}</div>
                    <div>
                      ゲームページリンク：{{ values.gamePageUrl ?? "未指定" }}
                    </div>
                    <div>出展者名：{{ values.creatorName }}</div>
                    <div>
                      出展者ホームページ：{{
                        values.creatorPageUrl ?? "未指定"
                      }}
                    </div>
                    <div>ゲーム詳細：{{ values.description ?? "未指定" }}</div>
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
      <div v-else-if="currentEvent && !canSubmit">
        <div class="text-center text-brand-violet font-700 body">
          <div>イベント：{{ currentEvent.title }} Game³</div>
          <div>
            登録開始日時：{{
              currentEvent.gameSubmissionPeriodStart.toLocaleString("ja-JP", {
                timeZone: "Asia/Tokyo",
              })
            }}
          </div>
          <div>
            登録締切日時：{{
              currentEvent.gameSubmissionPeriodEnd.toLocaleString("ja-JP", {
                timeZone: "Asia/Tokyo",
              })
            }}
          </div>
          <div class="text-text-semantic-error">
            登録期間外のため現在は出展登録ができません
          </div>
        </div>
      </div>
      <div
        v-else
        class="text-center text-text-semantic-error"
      >
        現在申し込み対象のイベントがありません
      </div>
    </div>
  </div>
</template>

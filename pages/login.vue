<script setup lang="ts">
import { getFirstQuery } from '~/lib/url'

const { useMeStore, login } = useLogin()
const me = useMeStore()

const route = useRoute()
const query = computed(() => getFirstQuery(route.query.redirect))
const { $toast } = useNuxtApp()

watchEffect(() => {
  if (me.value.user !== undefined) {
    $toast.info('ログイン済みのためマイページにリダイレクトします')
    navigateTo('/me')
  }
})

callOnce(() => {
  if (query.value !== undefined) {
    $toast.info(`${query.value}からリダイレクトしました`)
  }
})

useSeoMeta({
  title: 'ログイン'
})
</script>

<template>
  <div v-if="me.user === undefined">
    <ProseH1>
      ログインページ
    </ProseH1>
    <ProseH2>
      Discordでログイン
    </ProseH2>
    <ProseP>
      Game³への参加登録にはDiscordでのGame³サーバーへの参加によるログインが必須です。
      Discordのアカウントをお持ちでない方は
      <ProseA
        href="https://discord.com/login"
        target="_blank"
        rel="noopener noreferrer"
      >
        https://discord.com/login
      </ProseA>
      から新規アカウントを作成してください。
      下のボタンからログインすることで、作品情報の登録・編集が可能になります。
    </ProseP>
    <div class="w-full flex justify-center">
      <UIButton
        @click="login"
      >
        Discordでログイン
      </UIButton>
    </div>
  </div>
</template>

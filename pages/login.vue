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
  title: 'ログイン',
  ogTitle: 'ログイン',
})
</script>

<template>
  <div v-if="me.user === undefined">
    <ProseH1> ログインページ </ProseH1>
    <ProseH2> Discordでログイン </ProseH2>
    <ProseP>
      Game³への参加登録にはDiscordアカウントによるログインとGame³サーバーへの参加が必須です。
      Discordのアカウントをお持ちでない方は
      <ProseA
        href="https://discord.com/login"
        target="_blank"
        rel="noopener noreferrer"
      >
        https://discord.com/login
      </ProseA>
      から新規アカウントを作成してください。
      下のボタンからログインすることで、Game³サーバーに自動的に参加し、作品の登録が可能になります。
    </ProseP>
    <div class="w-full flex justify-center">
      <UIButton @click="login">
        <div class="flex gap-2">
          <div class="i-logos:discord-icon h-1.5em w-1.5em" />
          ログイン
        </div>
      </UIButton>
    </div>
  </div>
</template>

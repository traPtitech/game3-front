<script setup lang="ts">
import { getFirstQuery } from '~/lib/url'

const { useMeStore, login, logout } = useLogin()
const me = useMeStore()

const route = useRoute()
const query = computed(() => getFirstQuery(route.query.redirect))
const { $toast } = useNuxtApp()

callOnce(() => {
  if (query.value !== undefined) {
    $toast.info(`${query.value}からリダイレクトしました`)
  }
})

</script>

<template>
  <div>
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
    <div v-else>
      <ProseH1>
        ログイン済み
      </ProseH1>
      <ProseP>
        {{ me.user.username }}としてログインしています。
      </ProseP>
      <div class="w-full flex justify-center gap-4">
        <UIButton
          @click="async () => await navigateTo('/me')"
        >
          マイページを開く
        </UIButton>
        <UIButton
          @click="logout"
        >
          ログアウトする
        </UIButton>
      </div>
    </div>
  </div>
</template>

<!-- `/me` -->
<script setup lang="ts">
const { useMeStore, logout } = useLogin()
const me = useMeStore()

const isAdmin = computed(() => me.value.user?.role === 'admin')

useSeoMeta({
  title: 'マイページ'
})
</script>

<template>
  <div v-if="me.user">
    <ProseH1>
      マイページ
    </ProseH1>
    <ProseP>
      {{ me.user.username }}{{ isAdmin ? " (admin) " : "" }}としてログインしています。
    </ProseP>
    <div class="w-full flex justify-center gap-4">
      <UIButton
        v-if="isAdmin"
        @click="navigateTo('/admin')"
      >
        管理者ページへ
      </UIButton>
      <UIButton
        @click="logout"
      >
        ログアウトする
      </UIButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type User } from '~/lib/api'

const { logout } = useLogin()

type Props = {
  user: User;
};
const props = defineProps<Props>()

const isAdmin = computed(() => props.user.role === 'admin')
</script>

<template>
  <div class="w-full flex items-center justify-around gap-4">
    <NuxtImg
      :src="props.user.profileImageUrl"
      placeholder="/img/placeholder.png"
      class="h-24 w-24 rounded-full object-cover"
    />
    {{ props.user.username
    }}{{ isAdmin ? " (admin) " : "" }}としてログインしています
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
</template>

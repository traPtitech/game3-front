<script setup lang="ts">
const canPost = useCanPostGame()
</script>

<template>
  <div v-if="canPost">
    <div v-if="canPost === 'enabled'" class="w-full flex justify-center">
      <UIButton
        @click="navigateTo('/entry/register')"
      >
        作品を登録する
      </UIButton>
    </div>
    <div v-else-if="canPost === 'notLoggedIn'" class="w-full flex justify-center">
      <UIButton
        @click="navigateTo('/entry/register')"
      >
        ログインして作品を登録する
      </UIButton>
    </div>
    <div v-else-if="canPost === 'prePeriod'" class="text-center text-h3 text-brand-violet">
      応募はまだ開始されていません
    </div>
    <div v-else-if="canPost === 'postPeriod'" class="text-center text-h3 text-brand-violet">
      応募は締め切りました！
    </div>
  </div>
</template>

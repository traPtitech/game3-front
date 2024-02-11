<script setup lang="ts">
type Props = {
  slug?: string;
};
const props = defineProps<Props>()
const loadedSlug = usePathParams('slug')
const eventSlug = computed(() => props.slug || loadedSlug)
const canPost = useCanPostGame(eventSlug.value)
</script>

<template>
  <div v-if="canPost">
    <div v-if="canPost.state === 'enabled'" class="w-full flex justify-center">
      <UIButton @click="navigateTo('/entry/register')">
        作品を登録する
      </UIButton>
    </div>
    <div
      v-else-if="canPost.state === 'notLoggedIn'"
      class="w-full flex justify-center"
    >
      <UIButton @click="navigateTo('/entry/register')">
        ログインして作品を登録する
      </UIButton>
    </div>
    <div
      v-else-if="canPost.state === 'prePeriod'"
      class="text-center text-brand-violet h3-text"
    >
      応募は{{
        canPost.startAt.toLocaleString("ja-JP", {
          timeZone: "Asia/Tokyo",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        })
      }}から開始します！
    </div>
    <div
      v-else-if="canPost.state === 'postPeriod'"
      class="text-center text-brand-violet h3-text"
    >
      応募は締め切りました！
    </div>
  </div>
</template>

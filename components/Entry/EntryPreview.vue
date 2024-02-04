<script setup lang="ts">
import type { PostGameRequest, PatchGameRequest } from '~/lib/api'

type Props = {
  gameReq: Partial<PostGameRequest | PatchGameRequest> & {
    place?: string;
  };
};
const props = defineProps<Props>()

const iconImgSrc = computed(() => {
  if (props.gameReq.icon) {
    return URL.createObjectURL(props.gameReq.icon)
  }
  return undefined
})

onUnmounted(() => {
  if (iconImgSrc.value) {
    URL.revokeObjectURL(iconImgSrc.value)
  }
})
</script>

<template>
  <div class="block w-full flex gap-5">
    <img
      :src="iconImgSrc ?? '/img/placeholder.png'"
      width="200px"
      height="200px"
      class="aspect-ratio-square h-50 w-50 shrink-0 b-1 b-border-primary"
    >
    <div class="w-full flex flex-col gap2">
      <div class="h2-text font-700">
        {{ props.gameReq.title ?? "ゲームタイトルを入力してください" }}
      </div>
      <div class="body flex gap-4 text-text-secondary!">
        <div class="flex items-center gap-1">
          <div class="i-tabler:user h-1.5em w-1.5em" />
          {{ props.gameReq.creatorName ?? "出展者名を入力してください" }}
        </div>
        <div class="flex items-center gap-1">
          <div class="i-tabler:map-pin h-1.5em w-1.5em" />
          {{ props.gameReq.place ?? "1-A" }}
        </div>
      </div>
      <div class="body line-clamp-3 text-ellipsis">
        {{ props.gameReq.description ?? "ゲーム詳細を入力してください" }}
      </div>
    </div>
  </div>
</template>

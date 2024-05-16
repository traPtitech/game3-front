<script setup lang="ts">
import type { PostGameRequest, PatchGameRequest } from '~/lib/api'

type Props = {
  gameReq: Partial<PostGameRequest | PatchGameRequest> & {
    place?: string
  }
}
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
  <div class="block h-fit w-full flex flex-col items-center gap-5 md:(flex-row items-start)">
    <img
      :src="iconImgSrc ?? '/img/placeholder.png'"
      width="200px"
      height="200px"
      class="aspect-ratio-square aspect-square h-auto max-w-280px w-full shrink-0 b-1 b-border-primary md:max-w-200px"
    >
    <div class="w-full flex flex-col gap2">
      <div class="break-anywhere text-wrap font-700 h2-text">
        {{ props.gameReq.title ?? "ゲームタイトルを入力してください" }}
      </div>
      <div class="flex flex-col gap-1 lg:(flex-row gap-4) body text-text-secondary!">
        <div class="flex items-center gap-1">
          <div class="i-tabler:user h-1.5em w-1.5em" />
          {{ props.gameReq.creatorName ?? "出展者名を入力してください" }}
        </div>
        <div class="flex items-center gap-1">
          <div class="i-tabler:map-pin h-1.5em w-1.5em" />
          {{ props.gameReq.place ?? "1-A" }}
        </div>
      </div>
      <div class="line-clamp-3 w-full text-ellipsis break-anywhere text-wrap body">
        {{ props.gameReq.description ?? "ゲーム詳細を入力してください" }}
      </div>
    </div>
  </div>
</template>

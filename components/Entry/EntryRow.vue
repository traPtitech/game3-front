<script setup lang="ts">
import type { Game } from '~/lib/api'
import { gameIconUrl } from '~/lib/url'

type Props = {
  game: Game;
};

const props = defineProps<Props>()
</script>

<template>
  <NuxtLink :to="`/entry/${props.game.id}`" class="block w-full flex gap-5">
    <!-- TODO: 画像URL取得関数に切り出し -->
    <img :src="gameIconUrl(props.game.id)" width="200px" height="200px" class="aspect-ratio-square h-50 w-50 shrink-0 b-1 b-border-primary">
    <div class="w-full flex flex-col gap2">
      <div class="text-8 font-700">
        {{ props.game.title }}
      </div>
      <div class="flex gap-4 text-caption text-text-secondary!">
        <div class="flex items-center gap-1">
          <div class="i-tabler:user h-6 w-6" />
          {{ props.game.creatorName }}
        </div>
        <div class="flex items-center gap-1">
          <div class="i-tabler:map-pin h-6 w-6" />
          {{ props.game.place }}
        </div>
      </div>
      <div
        class="line-clamp-3 text-ellipsis text-body"
      >
        {{ props.game.description }}
      </div>
    </div>
  </NuxtLink>
</template>

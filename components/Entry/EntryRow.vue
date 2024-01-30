<script setup lang="ts">
import type { Game } from '~/lib/api'

type Props = {
  game: Game;
};

const props = defineProps<Props>()
</script>

<template>
  <div>
    <!-- TODO: 画像URL取得関数に切り出し -->
    <img :src="`/api/games/${props.game.id}/icon`">
    <div>
      <div>{{ props.game.title }}</div>
      <div>
        <div>{{ props.game.creatorName }}</div>
        <div>{{ props.game.place }}</div>
      </div>
      <div>{{ props.game.description }}</div>
    </div>
  </div>
</template>

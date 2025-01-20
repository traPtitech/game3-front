<script setup lang="ts">
import StrokedText from '../StrokedText.vue'
import type { Game } from '~/lib/api'

type Props = {
  game: Game
}
const props = defineProps<Props>()
</script>

<template>
  <div class="relative h-auto w-full @container">
    <div class="absolute left-0 top-0 z--1 mt--15cqw h-85cqw w-85cqw rotate-5 b-1mm b-brand-violet bg-brand-cyan outline-1mm outline-white outline" />
    <div class="pl-5cqw pt-15cqw">
      <div class="b-1mm b-brand-violet bg-brand-yellow outline-1mm outline-white outline">
        <div
          class="grid grid-cols-[minmax(0,1fr)_auto] h-60cqw"
        >
          <div
            class="relative ml-[calc(-5cqw-1mm)]"
          >
            <img
              :src="useGameIconUrl(props.game.id)"
              class="height-auto absolute bottom-0 aspect-square w-full b-1mm b-brand-yellow bg-white object-contain"
            >
          </div>
          <div class="mt-1 text-3 font-bold write-vertical-left">
            <StrokedText
              class="c-brand-violet text-stroke-white!"
              :width="1"
            >
              {{ props.game.place }}
            </StrokedText>
          </div>
        </div>
        <div class="px-1mm text-3 font-bold">
          <StrokedText
            class="c-brand-violet text-stroke-white!"
            :width="1"
          >
            {{ props.game.title }}
          </StrokedText>
        </div>
      </div>
    </div>
  </div>
</template>

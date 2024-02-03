<script setup lang="ts">
import {
  TooltipContent,
  TooltipPortal,
  TooltipRoot,
  TooltipTrigger
} from 'radix-vue'
import type { Game } from '~/lib/api'

type Props = {
  game: Game;
  variant?: 'eventPage' | 'myPage';
};

const props = withDefaults(defineProps<Props>(), {
  variant: 'eventPage'
})

const { data: events, suspense: suspenseEvents } = useEventsQuery()
const { data: terms, suspense: suspenseTerms } = useTermsQuery()
onServerPrefetch(async () => {
  await Promise.all([suspenseEvents(), suspenseTerms()]).catch(() => {})
})

const term = computed(
  () => terms.value?.find(term => term.id === props.game.termId)
)
const event = computed(
  () => events.value?.find(event => event.slug === term.value?.eventSlug)
)
</script>

<template>
  <NuxtLink :to="`/entry/${props.game.id}`" class="block w-full flex gap-5">
    <NuxtImg
      :src="useGameIconUrl(props.game.id)"
      placeholder="/img/placeholder.png"
      width="200px"
      height="200px"
      class="aspect-ratio-square h-50 w-50 shrink-0 b-1 b-border-primary"
    />
    <div class="w-full flex flex-col gap2">
      <div class="text-8 font-700">
        {{ props.game.title }}
      </div>
      <div class="flex gap-4 text-caption text-text-secondary!">
        <div v-if="props.variant === 'myPage' && term">
          <div v-if="!term.isDefault">
            公開中
          </div>
          <TooltipRoot v-else>
            <TooltipTrigger>
              <div class="text-brand-orange">
                公開保留中
              </div>
            </TooltipTrigger>
            <TooltipPortal>
              <TooltipContent
                :side-offset="4"
                class="select-none rounded bg-surface-primary p-2 text-caption shadow data-[state=delayed-open]:animate-fade-in animate-duration-100!"
              >
                運営によるチェックの終了後に全体公開されます
              </TooltipContent>
            </TooltipPortal>
          </TooltipRoot>
        </div>
        <div class="flex items-center gap-1">
          <div class="i-tabler:user h-6 w-6" />
          {{ props.game.creatorName }}
        </div>
        <div
          v-if="props.variant === 'eventPage'"
          class="flex items-center gap-1"
        >
          <div class="i-tabler:map-pin h-6 w-6" />
          {{ props.game.place }}
        </div>
        <div
          v-if="props.variant === 'myPage' && event"
          class="flex items-center gap-1"
        >
          <div class="i-tabler:clock h-6 w-6" />
          {{ event?.title }} {{ event?.date.toLocaleDateString("ja-JP") }}
        </div>
      </div>
      <div class="line-clamp-3 text-ellipsis text-body">
        {{ props.game.description }}
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import {
  TooltipContent,
  TooltipPortal,
  TooltipRoot,
  TooltipTrigger,
} from 'radix-vue'
import type { Game } from '~/lib/api'

type Props = {
  game: Game
  variant?: 'eventPage' | 'myPage'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'eventPage',
})

const { data: events, suspense: suspenseEvents } = useEventsQuery()
const { data: terms, suspense: suspenseTerms } = useTermsQuery()
onServerPrefetch(async () => {
  await Promise.all([suspenseEvents(), suspenseTerms()]).catch(() => {})
})

const term = computed(
  () => terms.value?.find(term => term.id === props.game.termId),
)
const event = computed(
  () => events.value?.find(event => event.slug === term.value?.eventSlug),
)
</script>

<template>
  <NuxtLink
    :to="`/entry/${props.game.id}`"
    class="block h-fit w-full flex flex-col items-center gap-5 md:(flex-row items-start)"
  >
    <img
      :src="useGameIconUrl(props.game.id)"
      width="200px"
      height="200px"
      loading="lazy"
      class="aspect-ratio-square aspect-square h-auto max-w-280px w-full shrink-0 b-1 b-border-primary md:max-w-200px"
    >
    <div class="w-full flex flex-col gap2">
      <div class="break-anywhere text-wrap font-700 h2-text">
        {{ props.game.title }}
      </div>
      <div
        class="flex flex-col gap-1 lg:(flex-row gap-4) body text-text-secondary!"
      >
        <div v-if="props.variant === 'myPage'">
          <div v-if="props.game.isPublished">
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
                class="select-none rounded bg-surface-primary p-2 shadow data-[state=delayed-open]:animate-fade-in animate-duration-100! caption"
              >
                運営によるチェックの終了後に全体公開されます
              </TooltipContent>
            </TooltipPortal>
          </TooltipRoot>
        </div>
        <div class="flex items-center gap-1">
          <div class="i-tabler:user h-1.5em w-1.5em" />
          {{ props.game.creatorName }}
        </div>
        <div
          v-if="props.variant === 'eventPage'"
          class="flex items-center gap-1"
        >
          <div class="i-tabler:map-pin h-1.5em w-1.5em" />
          {{ props.game.place }}
        </div>
        <div
          v-if="props.variant === 'myPage' && event"
          class="flex items-center gap-1"
        >
          <div class="i-tabler:clock h-1.5em w-1.5em" />
          {{ event?.title }}
          {{
            event?.date.toLocaleDateString("ja-JP", { timeZone: "Asia/Tokyo" })
          }}
        </div>
      </div>
      <div class="line-clamp-3 text-ellipsis break-anywhere text-wrap body">
        {{ props.game.description }}
      </div>
    </div>
  </NuxtLink>
</template>

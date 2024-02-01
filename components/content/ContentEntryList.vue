<script setup lang="ts">
import {
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsRoot,
  TabsTrigger
} from 'radix-vue'
type Props = {
  eventSlug: string;
};
const props = defineProps<Props>()

const { data: eventGames, suspense: suspenseEventGames } = useGamesQuery({
  eventSlug: props.eventSlug
})
const { data: eventTerms, suspense: suspenseEventTerms } = useEventTermsQuery({
  eventSlug: props.eventSlug
})

const termGamesMap = computed(() => {
  if (!eventGames.value || !eventTerms.value) {
    return []
  }
  const termIdMap = Object.groupBy(eventGames.value, game => game.termId)
  return eventTerms.value
    .filter(term => !term.isDefault)
    .sort((a, b) => (a.startAt && b.startAt && a.startAt > b.startAt ? 1 : -1))
    .map(term => ({
      term,
      games: termIdMap[term.id!] || []
    }))
})

onServerPrefetch(async () => {
  // https://github.com/TanStack/query/discussions/5688#discussioncomment-6652179
  await Promise.all([suspenseEventGames(), suspenseEventTerms()]).catch(
    () => {}
  )
})

const localeTimeStringOptions: Intl.DateTimeFormatOptions = {
  hour: 'numeric',
  minute: 'numeric'
}
</script>

<template>
  <TabsRoot v-if="termGamesMap[0]" :default-value="termGamesMap[0].term.id">
    <TabsList class="relative mb-8 flex justify-around">
      <TabsIndicator class="absolute bottom-0 left-0 h-2px w-[--radix-tabs-indicator-size] translate-x-[--radix-tabs-indicator-position] transition-transform duration-300">
        <div class="h-full w-full rounded-full bg-brand-violet" />
      </TabsIndicator>
      <TabsTrigger
        v-for="(term, i) in termGamesMap"
        :key="term.term.id"
        :value="term.term.id!"
        class="data-[state=inactive]:text-text-secondary!"
      >
        <div class="text-8 font-500">
          ターム{{ i + 1 }}
        </div>
        <div class="text-6 font-500">
          {{
            term.term.startAt?.toLocaleTimeString(
              "ja-JP",
              localeTimeStringOptions
            )
          }}
          ~
          {{
            term.term.endAt?.toLocaleTimeString(
              "ja-JP",
              localeTimeStringOptions
            )
          }}
        </div>
      </TabsTrigger>
    </TabsList>
    <TabsContent
      v-for="term in termGamesMap"
      :key="term.term.id"
      :value="term.term.id!"
    >
      <ul class="space-y-6">
        <li v-for="game in term.games" :key="game.id">
          <EntryRow :game="game" />
        </li>
      </ul>
    </TabsContent>
  </TabsRoot>
</template>

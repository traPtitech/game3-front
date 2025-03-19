<script setup lang="ts">
import {
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsRoot,
  TabsTrigger,
} from 'radix-vue'

type Props = {
  slug?: string
}
const props = defineProps<Props>()
const loadedSlug = usePathParams('slug')
const eventSlug = computed(() => props.slug || loadedSlug)

const { data: eventGames, suspense: suspenseEventGames } = useGamesQuery({
  eventSlug: eventSlug.value,
})
const { data: eventTerms, suspense: suspenseEventTerms } = useEventTermsQuery({
  eventSlug: eventSlug.value,
})

const termGamesMap = computed(() => {
  if (!eventGames.value || !eventTerms.value) {
    return []
  }
  const gameMap = Object.groupBy(eventGames.value, game => game.termId)
  return eventTerms.value
    .filter(term => !term.isDefault)
    .map(term => ({
      term,
      games: gameMap[term.id] || [],
    }))
})

const showTerms = computed(
  () => eventTerms.value && eventTerms.value.length > 1,
)

onServerPrefetch(async () => {
  // https://github.com/TanStack/query/discussions/5688#discussioncomment-6652179
  await Promise.all([suspenseEventGames(), suspenseEventTerms()]).catch(
    () => {},
  )
})

const localeTimeStringOptions: Intl.DateTimeFormatOptions = {
  hour: 'numeric',
  minute: 'numeric',
  timeZone: 'Asia/Tokyo',
}

const route = useRoute()
const router = useRouter()
// クエリパラメータの `term` を取得し、デフォルト値を設定
const selectedTab = ref(
  route.query.term && typeof route.query.term === 'string' && termGamesMap.value.some(t => t.term.id === route.query.term)
    ? route.query.term
    : termGamesMap.value.length > 0
      ? termGamesMap.value[0].term.id
      : '',
)

// タブ変更時にクエリパラメータを更新
watch(selectedTab, (newTab) => {
  if (newTab) {
    router.replace({ query: { ...route.query, term: newTab } })
  }
})

// クエリパラメータの変化を監視し、タブを更新
watch(() => route.query.tab, (newTab) => {
  if (newTab && typeof newTab === 'string' && termGamesMap.value.some(t => t.term.id === newTab)) {
    selectedTab.value = newTab
  }
})
</script>

<template>
  <div v-if="eventGames && eventGames.length > 0">
    <ProseH2>
      出展情報
    </ProseH2>
    <TabsRoot
      v-if="showTerms"
      v-model="selectedTab"
      :default-value="termGamesMap[0].term.id"
    >
      <TabsList class="relative mb-8 flex justify-around">
        <TabsIndicator
          class="absolute bottom-0 left-0 h-2px w-[--radix-tabs-indicator-size] translate-x-[--radix-tabs-indicator-position] transition-transform duration-300"
        >
          <div class="h-full w-full rounded-full bg-brand-violet" />
        </TabsIndicator>
        <TabsTrigger
          v-for="term in termGamesMap"
          :key="term.term.id"
          :value="term.term.id"
          class="data-[state=inactive]:text-text-secondary!"
        >
          <div class="font-500 h3-text">
            {{ term.term.name }}
          </div>
          <div class="font-500 h4-text">
            {{
              term.term.startAt?.toLocaleTimeString(
                "ja-JP",
                localeTimeStringOptions,
              )
            }}
            ~
            {{
              term.term.endAt?.toLocaleTimeString(
                "ja-JP",
                localeTimeStringOptions,
              )
            }}
          </div>
        </TabsTrigger>
      </TabsList>
      <TabsContent
        v-for="term in termGamesMap"
        :key="term.term.id"
        :value="term.term.id"
      >
        <ul class="space-y-6">
          <li
            v-for="game in term.games"
            :key="game.id"
          >
            <EntryRow :game="game" />
          </li>
        </ul>
      </TabsContent>
    </TabsRoot>
    <div v-else>
      <ul class="space-y-6">
        <li
          v-for="game in eventGames"
          :key="game.id"
        >
          <EntryRow :game="game" />
        </li>
      </ul>
    </div>
  </div>
</template>

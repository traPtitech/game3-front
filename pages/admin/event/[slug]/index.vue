<!-- `/admin/event/:slug` -->
<script setup lang="ts">
import {
  FlexRender,
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  useVueTable,
  type SortingState
} from '@tanstack/vue-table'
import { eventImageUrl, getParamsArray } from '~/lib/url'

definePageMeta({
  middleware: ['redirect-login']
})

const route = useRoute()
const slugArray = getParamsArray(route.params.slug)
const eventSlug = slugArray?.[0]
if (!eventSlug) {
  throw createError({
    statusCode: 404,
    statusMessage: 'イベントが見つかりませんでした'
  })
}

const { data: event, suspense: suspenseEvent } = useEventQuery({ eventSlug })
const { data: terms, suspense: suspenseTerms } = useEventTermsQuery({
  eventSlug
})
const { data: games, suspense: suspenseGames } = useGamesQuery({ eventSlug })
onServerPrefetch(async () => {
  await Promise.all([suspenseEvent(), suspenseTerms(), suspenseGames()]).catch(
    () => {}
  )
})

const termMap = computed(
  () =>
    new Map(
      terms.value
        ?.sort((a, b) =>
          a.startAt && b.startAt && a.startAt > b.startAt ? 1 : -1
        )
        .map((term, i) => [
          term.id,
          {
            term,
            termName: term.isDefault ? 'ターム未割当' : `ターム${i}`
          }
        ]) ?? []
    )
)

const displayGames = computed(
  () =>
    games.value?.map(game => ({
      ...game,
      ...termMap.value.get(game.termId)
    })) ?? []
)

const termColumnHelper =
  createColumnHelper<(typeof displayGames)['value'][number]>()
const columns = [
  termColumnHelper.accessor('termName', {
    cell: info => info.getValue(),
    header: 'ターム名'
  }),
  termColumnHelper.accessor('term', {
    cell: info => info.getValue()?.startAt?.toLocaleString('ja-JP'),
    header: 'ターム開始時刻'
  }),
  termColumnHelper.accessor('term', {
    cell: info => info.getValue()?.endAt?.toLocaleString('ja-JP'),
    header: 'ターム終了時刻'
  }),
  termColumnHelper.accessor('title', {
    cell: info => info.getValue(),
    header: 'ゲームタイトル'
  })
]

const sorting = ref<SortingState>([])

const table = useVueTable({
  get data () {
    return displayGames.value
  },
  columns,
  state: {
    get sorting () {
      return sorting.value
    }
  },
  onSortingChange: (updaterOrValue) => {
    sorting.value =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(sorting.value)
        : updaterOrValue
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  debugTable: true
})
</script>

<template>
  <div>
    <div v-if="event">
      <ProseH1>{{ event.title }}</ProseH1>
      <div class="flex flex-col gap-4">
        <ProseImg :src="eventImageUrl(eventSlug)" />
        <div>タイトル:{{ event.title }}</div>
        <div>slug: {{ event.slug }}</div>
        <div>
          出展受付開始日時:{{
            event.gameSubmissionPeriodStart.toLocaleString("ja-JP")
          }}
        </div>
        <div>
          出展受付終了日時:{{
            event.gameSubmissionPeriodEnd.toLocaleString("ja-JP")
          }}
        </div>
        <UIButton
          @click="async () => await navigateTo(`/admin/event/${eventSlug}/edit`)"
        >
          イベント編集ページへ
        </UIButton>
      </div>
    </div>
    <ProseH2> ゲーム一覧 </ProseH2>
    <ProseTable>
      <thead>
        <tr
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
        >
          <th
            v-for="header in headerGroup.headers"
            :key="header.id"
            :colSpan="header.colSpan"
            :class="
              header.column.getCanSort() ? 'cursor-pointer select-none' : ''
            "
            @click="header.column.getToggleSortingHandler()?.($event)"
          >
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
            {{
              { asc: " 🔼", desc: " 🔽" }[header.column.getIsSorted() as string]
            }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in table.getRowModel().rows"
          :key="row.id"
          class="cursor-pointer hover:bg-gray-100"
        >
          <td v-for="cell in row.getVisibleCells()" :key="cell.id">
            <FlexRender
              :render="cell.column.columnDef.cell"
              :props="cell.getContext()"
            />
          </td>
        </tr>
      </tbody>
    </ProseTable>
  </div>
</template>

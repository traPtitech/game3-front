<script setup lang="ts">
import {
  FlexRender,
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  useVueTable,
  type SortingState
} from '@tanstack/vue-table'

type Props = {
  eventSlug: string;
};
const props = defineProps<Props>()

const { data: terms, suspense: suspenseTerms } = useEventTermsQuery({
  eventSlug: props.eventSlug
})
const { data: games, suspense: suspenseGames } = useGamesQuery({
  eventSlug: props.eventSlug
})
onServerPrefetch(async () => {
  await Promise.all([suspenseTerms(), suspenseGames()]).catch(
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
    header: 'ターム'
  }),
  termColumnHelper.accessor('title', {
    cell: info => info.getValue(),
    header: 'ゲームタイトル'
  }),
  termColumnHelper.accessor('creatorName', {
    cell: info => info.getValue(),
    header: '出展者名'
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

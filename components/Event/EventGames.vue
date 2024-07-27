<script setup lang="ts">
import {
  FlexRender,
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  useVueTable,
  type SortingState,
} from '@tanstack/vue-table'
import ProseA from '../content/ProseA.vue'
import EventEntryTermSelect from './EventEntryTermSelect.vue'

type Props = {
  eventSlug: string
}
const props = defineProps<Props>()

const { data: terms, suspense: suspenseTerms } = useEventTermsQuery({
  eventSlug: props.eventSlug,
})
const { data: games, suspense: suspenseGames } = useGamesQuery({
  eventSlug: props.eventSlug,
  includeUnpublished: true,
})
onServerPrefetch(async () => {
  await Promise.all([suspenseTerms(), suspenseGames()]).catch(() => {})
})

const termMap = computed(() =>
  Object.groupBy(terms.value ?? [], term => term.id),
)

const displayGames = computed(
  () => {
    return games.value?.map(game => ({
      ...game,
      term: termMap.value[game.termId]?.[0],
    })) ?? []
  },
)

const termColumnHelper
  = createColumnHelper<(typeof displayGames)['value'][number]>()
const columns = [
  termColumnHelper.accessor('term', {
    cell: info =>
      h(EventEntryTermSelect, {
        termName: info.row.original.term?.name ?? '',
        gameId: info.row.original.id,
        defaultTermId: info.row.original.termId,
        eventSlug: props.eventSlug,
        isDefault: info.row.original.term?.isDefault ?? true,
      }),
    header: 'ターム',
  }),
  termColumnHelper.accessor('title', {
    cell: info => info.getValue(),
    header: 'ゲームタイトル',
  }),
  termColumnHelper.accessor('creatorName', {
    cell: info => info.getValue(),
    header: '出展者名',
  }),
  termColumnHelper.accessor('isPublished', {
    cell: info => (info.getValue() ? '全体公開中' : '非公開'),
    header: '公開状態',
  }),
  termColumnHelper.display({
    id: 'links',
    cell: info =>
      h(
        'div',
        {
          class: 'flex gap-2',
        },
        [
          h(
            ProseA,
            {
              to: `/entry/${info.row.original.id}`,
            },
            ['詳細ページ'],
          ),
          h(
            ProseA,
            {
              to: `/entry/${info.row.original.id}/edit`,
            },
            ['編集ページ'],
          ),
        ],
      ),
    header: 'リンク',
  }),
]

const sorting = ref<SortingState>([])

const table = useVueTable({
  get data() {
    return displayGames.value
  },
  columns,
  state: {
    get sorting() {
      return sorting.value
    },
  },
  onSortingChange: (updaterOrValue) => {
    sorting.value
      = typeof updaterOrValue === 'function'
        ? updaterOrValue(sorting.value)
        : updaterOrValue
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
})
</script>

<template>
  <div>
    <ProseH2> 申請済みゲーム一覧 </ProseH2>
    <ProseP>
      タームを割り当て済みの作品のみがイベント詳細ページのゲーム一覧に表示されます。
      ユーザーが申請した直後のゲームにはタームが割り当てられていません(未割当用タームになっているゲーム)。ターム列をクリックしてタームを割り当てることができます。
    </ProseP>
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
            <div class="flex items-center gap-1">
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
              <div v-if="header.column.getCanSort()">
                <div
                  v-if="header.column.getIsSorted() === 'asc'"
                  class="i-tabler:arrow-narrow-up"
                />
                <div
                  v-else-if="header.column.getIsSorted() === 'desc'"
                  class="i-tabler:arrow-narrow-down"
                />
                <div
                  v-else
                  class="i-tabler:arrows-sort"
                />
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in table.getRowModel().rows"
          :key="row.id"
        >
          <td
            v-for="cell in row.getVisibleCells()"
            :key="cell.id"
          >
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

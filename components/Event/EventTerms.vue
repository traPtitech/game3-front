<script setup lang="ts">
import {
  FlexRender,
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  useVueTable,
  type SortingState
} from '@tanstack/vue-table'
import { h } from 'vue'
import EventTermEditButton from './EventTermEditButton.vue'
import type { TermWithName } from '~/lib/term'

type Props = {
  eventSlug: string;
};
const props = defineProps<Props>()

const { data: terms, suspense: suspenseTerms } = useEventTermsQuery({
  eventSlug: props.eventSlug
})
onServerPrefetch(async () => {
  await suspenseTerms().catch(() => {})
})

const termColumnHelper =
  createColumnHelper<TermWithName>()
const columns = [
  termColumnHelper.accessor('name', {
    cell: info => info.getValue(),
    header: 'ターム'
  }),
  termColumnHelper.accessor('startAt', {
    cell: info => info.getValue().toLocaleTimeString('ja-JP'),
    header: '開始時刻'
  }),
  termColumnHelper.accessor('endAt', {
    cell: info => info.getValue().toLocaleTimeString('ja-JP'),
    header: '終了時刻'
  }),
  termColumnHelper.display({
    id: 'edit',
    cell: term =>
      h(EventTermEditButton, {
        term: term.row.original
      })
  })
]

const sorting = ref<SortingState>([])

const table = useVueTable({
  get data () {
    return terms.value ?? []
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
  getSortedRowModel: getSortedRowModel()
})
</script>

<template>
  <div>
    <ProseH2> ターム一覧 </ProseH2>
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
                <div v-else class="i-tabler:arrows-sort" />
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in table.getRowModel().rows" :key="row.id">
          <td v-for="cell in row.getVisibleCells()" :key="cell.id">
            <FlexRender
              :render="cell.column.columnDef.cell"
              :props="cell.getContext()"
            />
          </td>
        </tr>
      </tbody>
    </ProseTable>
    <div class="mt-4 w-full flex justify-center">
      <EventTermCreateButton :event-slug="props.eventSlug" />
    </div>
  </div>
</template>

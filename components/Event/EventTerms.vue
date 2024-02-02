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

const termsWithName = computed(
  () =>
    terms.value
      ?.sort((a, b) =>
        a.startAt && b.startAt && a.startAt > b.startAt ? 1 : -1
      )
      .map((term, i) =>
        ({
          ...term,
          termName: term.isDefault ? '未割当用ターム' : `ターム${i}`
        })
      ) ?? []
)

const termColumnHelper =
  createColumnHelper<(typeof termsWithName)['value'][number]>()
const columns = [
  termColumnHelper.accessor('termName', {
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
    cell: term => h(EventTermEditButton, {
      term: term.row.original
    })
  })
]

const sorting = ref<SortingState>([])

const table = useVueTable({
  get data () {
    return termsWithName.value
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
    <div class="mt-4 w-full flex justify-center">
      <EventTermCreateButton
        :event-slug="props.eventSlug"
      />
    </div>
  </div>
</template>

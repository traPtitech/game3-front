<script setup lang="ts">
import { FlexRender, createColumnHelper, getCoreRowModel, useVueTable } from '@tanstack/vue-table'
import UIButton from '~/components/UI/UIButton.vue'
import type { Event } from '~/lib/api'

definePageMeta({
  middleware: ['need-admin']
})

const { data: events, suspense } = useEventsQuery()
onServerPrefetch(async () => {
  await suspense().catch(() => {})
})

const columnHelper = createColumnHelper<Event>()
const columns = [
  columnHelper.accessor('slug', {
    cell: info => info.getValue(),
    header: 'イベントslug (URL内ID)'
  }),
  columnHelper.accessor('title', {
    cell: info => info.getValue(),
    header: 'イベントタイトル'
  }),
  columnHelper.accessor('gameSubmissionPeriodStart', {
    cell: info => info.getValue().toLocaleString('ja-JP'),
    header: '出展受付開始日時'
  }),
  columnHelper.accessor('gameSubmissionPeriodEnd', {
    cell: info => info.getValue().toLocaleString('ja-JP'),
    header: '出展受付終了日時'
  })
]

const table = useVueTable({
  get data () {
    return events.value ?? []
  },
  columns,
  getCoreRowModel: getCoreRowModel()
})
</script>

<template>
  <div>
    <ProseH1>
      イベント管理ページ
    </ProseH1>
    <UIButton
      @click="async () => await navigateTo('/admin/event/new')"
    >
      新規イベント作成ページへ
    </UIButton>
    <ProseH2>
      イベント一覧
    </ProseH2>
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
          >
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in table.getRowModel().rows"
          :key="row.id"
          class="cursor-pointer hover:bg-gray-100"
          @click="async () => await navigateTo(`/admin/event/${row.getValue('slug')}`)"
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

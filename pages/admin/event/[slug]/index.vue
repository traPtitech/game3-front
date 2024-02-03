<!-- `/admin/event/:slug` -->
<script setup lang="ts">
import {
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsRoot,
  TabsTrigger
} from 'radix-vue'

definePageMeta({
  middleware: ['need-admin']
})

const eventSlug = usePathParams('slug')

const { data: event, suspense: suspenseEvent } = useEventQuery({ eventSlug })
onServerPrefetch(async () => {
  await suspenseEvent().catch(() => {})
})
</script>

<template>
  <div v-if="event">
    <ProseH1
      :breadcrumbs="[
        { label: '管理者ページ', to: '/admin' },
        { label: 'イベント管理', to: '/admin/event' },
      ]"
    >
      {{ event.title }}
    </ProseH1>
    <TabsRoot default-value="info">
      <TabsList class="relative flex justify-around gap-2 pb-2 text-button">
        <TabsTrigger
          class="data-[state=inactive]:text-text-secondary!"
          value="info"
        >
          イベント情報
        </TabsTrigger>
        <TabsTrigger
          class="data-[state=inactive]:text-text-secondary!"
          value="edit"
        >
          イベント編集
        </TabsTrigger>
        <TabsTrigger
          class="data-[state=inactive]:text-text-secondary!"
          value="games"
        >
          申請済みゲーム一覧
        </TabsTrigger>
        <TabsTrigger
          class="data-[state=inactive]:text-text-secondary!"
          value="terms"
        >
          ターム一覧
        </TabsTrigger>
        <TabsIndicator
          class="absolute bottom-0 left-0 h-2px w-[--radix-tabs-indicator-size] translate-x-[--radix-tabs-indicator-position] transition-transform duration-300"
        >
          <div class="h-full w-full rounded-full bg-brand-violet" />
        </TabsIndicator>
      </TabsList>
      <TabsContent value="info">
        <EventInfo :event="event" />
      </TabsContent>
      <TabsContent value="edit">
        <EventEdit :event="event" />
      </TabsContent>
      <TabsContent value="games">
        <EventGames :event-slug="event.slug" />
      </TabsContent>
      <TabsContent value="terms">
        <EventTerms :event-slug="event.slug" />
      </TabsContent>
    </TabsRoot>
  </div>
</template>

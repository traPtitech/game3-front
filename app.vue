<script setup lang="ts">
import { TooltipProvider } from 'radix-vue'
import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { basePath } from './lib/url'

const { data: currentEvent, suspense: suspenseCurrentEvent } =
  useCurrentEventQuery()

onServerPrefetch(async () => {
  // https://github.com/TanStack/query/discussions/5688#discussioncomment-6652179
  await suspenseCurrentEvent().catch(() => {})
})

const img = useImage()

const ogImageUrl = computed(() =>
  img(
    currentEvent.value
      ? useEventImageUrl(currentEvent.value?.slug)
      : useDefaultOgpImageUrl(false),
    { width: 600 }
  )
)

const description = computed(
  () =>
    (currentEvent.value
      ? `${
          currentEvent.value.title
        }Game³は${currentEvent.value.date.toLocaleDateString(
          'ja-JP'
        )}に開催予定です。`
      : '') +
    'Game³（ゲームキューブ）とは、クリエイター同士の交流を目的としたゲーム展示イベントです。ターム制の採用や懇親会など、ほか展示イベントよりも交流を重視したプログラムが特徴です。主に関東圏の同人ゲーム制作者・サークル様に数多くご参加頂いています。本イベントは「すべてのゲームクリエイターへ。」をコンセプトに、学生などの「はじめての出展」を応援しています。「ゲームを作ったけど人に見せる機会がない」「プレイヤーから直接フィードバックを受けたい」などでお困りの方が、まず作品を公開してみようと思える場を目指しています。'
)

const route = useRoute()

useSeoMeta({
  title: 'トップページ',
  ogTitle: 'トップページ',
  titleTemplate: title => `${title} | ゲーム制作者交流イベントGame³`,
  description: () => description.value,
  ogDescription: () => description.value,
  twitterDescription: () => description.value,
  ogImage: () => ogImageUrl.value,
  twitterImage: () => ogImageUrl.value,
  twitterCard: 'summary_large_image',
  ogUrl: () => basePath + route.fullPath
})

defineOgImageComponent('DefaultPage', {
  title: currentEvent.value?.title,
  displayDate: currentEvent.value?.date
    ? format(currentEvent.value.date, 'M/d (E)', { locale: enUS })
    : undefined,
  imgSrc: ogImageUrl.value
})

useHead({
  htmlAttrs: {
    lang: 'ja'
  },
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/favicon.svg'
    }
  ]
})
</script>

<template>
  <div class="body">
    <TooltipProvider :delay-duration="500">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </TooltipProvider>
  </div>
</template>

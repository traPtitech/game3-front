<script setup lang="ts">
const { useMeStore } = useLogin()
const me = useMeStore()
const { data: currentEvent, suspense: suspenseCurrentEvent } = useCurrentEventQuery()

onServerPrefetch(async () => {
  // https://github.com/TanStack/query/discussions/5688#discussioncomment-6652179
  await suspenseCurrentEvent().catch(() => {})
})
</script>

<template>
  <nav class="text-button text-brand-violet">
    <ul v-if="currentEvent" class="space-y-4">
      <li>
        <NuxtLink
          class="w-full inline-flex items-center gap-2"
          :to="`/event/${currentEvent.slug}#開催概要`"
        >
          <NuxtImg width="24" height="24" src="/img/list-marker.svg" aria-hidden />
          <StrokedText
            class="text-stroke-white"
            :width="3"
          >
            開催概要
          </StrokedText>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          class="w-full inline-flex items-center gap-2"
          :to="`/event/${currentEvent.slug}#出展情報`"
        >
          <NuxtImg width="24" height="24" src="/img/list-marker.svg" aria-hidden />
          <StrokedText
            class="text-stroke-white"
            :width="3"
          >
            出展者一覧
          </StrokedText>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink class="w-full inline-flex items-center gap-2" to="/entry/register">
          <NuxtImg width="24" height="24" src="/img/list-marker.svg" aria-hidden />
          <StrokedText
            class="text-stroke-white"
            :width="3"
          >
            {{
              me.user === undefined
                ? "ログイン/作品登録"
                : "作品登録"
            }}
          </StrokedText>
        </NuxtLink>
      </li>
      <li v-if="me.user">
        <NuxtLink class="w-full inline-flex items-center gap-2" to="/me">
          <NuxtImg width="24" height="24" src="/img/list-marker.svg" aria-hidden />
          <StrokedText
            class="text-stroke-white"
            :width="3"
          >
            マイページ
          </StrokedText>
        </NuxtLink>
      </li>
    </ul>
    <ul v-else class="space-y-4">
      <li v-if="me.user">
        <NuxtLink class="w-full inline-flex items-center gap-2" to="/me">
          <NuxtImg width="24" height="24" src="/img/list-marker.svg" aria-hidden />
          <StrokedText
            class="text-stroke-white"
            :width="3"
          >
            マイページ
          </StrokedText>
        </NuxtLink>
      </li>
      <li v-else>
        <NuxtLink class="w-full inline-flex items-center gap-2" to="/login">
          <NuxtImg width="24" height="24" src="/img/list-marker.svg" aria-hidden />
          <StrokedText
            class="text-stroke-white"
            :width="3"
          >
            ログイン
          </StrokedText>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

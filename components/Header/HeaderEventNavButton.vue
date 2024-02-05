<script setup lang="ts">
import {
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger
} from 'radix-vue'

const { useMeStore } = useLogin()
const me = useMeStore()
const { data: currentEvent, suspense: suspenseCurrentEvent } = useCurrentEventQuery()

onServerPrefetch(async () => {
  // https://github.com/TanStack/query/discussions/5688#discussioncomment-6652179
  await suspenseCurrentEvent().catch(() => {})
})
</script>

<template>
  <div>
    <PopoverRoot v-if="currentEvent">
      <PopoverTrigger as-child class="group">
        <UIButton
          variant="secondary"
        >
          {{ currentEvent.title }}
          <template #suffix>
            <NuxtImg width="24" height="24" src="/img/list-marker.svg" aria-hidden class="transition-transform group-data-[state=closed]:rotate-90 group-data-[state=open]:rotate-270" />
          </template>
        </UIButton>
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent
          class="w-[var(--radix-popover-trigger-width)] bg-#6A49AA px-6 py-4"
        >
          <HeaderEventNav />
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>
    <div v-else>
      <UIButton
        v-if="me.user !== undefined"
        variant="secondary"
        @click="navigateTo('/me')"
      >
        マイページ
      </UIButton>
      <UIButton
        v-else
        variant="secondary"
        @click="navigateTo('/login')"
      >
        ログイン
      </UIButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTrigger
} from 'radix-vue'

const { data: currentEvent, suspense: suspenseCurrentEvent } = useCurrentEventQuery()

onServerPrefetch(async () => {
  // https://github.com/TanStack/query/discussions/5688#discussioncomment-6652179
  await suspenseCurrentEvent().catch(() => {})
})
</script>

<template>
  <DialogRoot>
    <DialogTrigger
      class="inline-flex items-center justify-center rounded p-4"
    >
      <div class="i-tabler:menu-2 h-6 w-6" />
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay class="fixed inset-0 z-30 bg-black/50 data-[state=open]:animate-fade-in animate-duration-100!" />
      <DialogContent
        class="fixed right-0 top-0 z-100 h-100vh max-w-full overflow-y-auto bg-#6A49AA p-4 pr-16 shadow data-[state=closed]:animate-slide-out-right data-[state=open]:animate-slide-in-right animate-duration-100! focus:outline-none"
      >
        <DialogClose
          class="fixed right-2 top-2 inline-flex items-center justify-center rounded p-4 color-text-white"
          aria-label="Close"
        >
          <div class="i-tabler:x h-6 w-6" />
        </DialogClose>
        <DialogDescription class="p-4">
          <ProseH2 class="mt-6 text-left">
            {{ currentEvent?.title }}
          </ProseH2>
          <HeaderEventNav />
          <ProseH2 class="mt-6 text-left">
            過去の開催
          </ProseH2>
          <HeaderEvents />
        </DialogDescription>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

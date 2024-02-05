<script setup lang="ts">
import {
  DialogContent,
  type DialogContentEmits,
  type DialogContentProps,
  DialogOverlay,
  DialogPortal,
  useEmitAsProps,
  DialogClose
} from 'radix-vue'

const props = defineProps<DialogContentProps>()
const emits = defineEmits<DialogContentEmits>()

const emitsAsProps = useEmitAsProps(emits)
</script>

<template>
  <DialogPortal>
    <DialogOverlay class="fixed inset-0 z-100 bg-#0008 animate-duration-100! motion-safe:data-[state=open]:animate-fade-in" />
    <DialogContent
      v-bind="{ ...props, ...emitsAsProps }"
      class="fixed left-50% top-50% z-1000 max-h-[calc(100%-16px)] max-w-[calc(100%-16px)] translate-x--50% translate-y--50% rounded-2 bg-surface-primary p-8 shadow data-[state=open]:animate-fade-in animate-duration-100! focus:outline-none"
    >
      <slot />
      <DialogClose
        class="absolute right-2 top-2 appearance-none items-center justify-center rounded-full p-1 hover:bg-#0002"
        aria-label="Close"
      >
        <div class="i-tabler:x h-4 w-4" />
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>

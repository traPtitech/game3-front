<script setup lang="ts">
import type { Events } from 'vue'

interface ButtonProps {
  variant?: 'primary';
  full?: boolean;
  disabled?: boolean;
  onClick?: (event: Events['onClick']) => void;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  full: false,
  disabled: false,
  onClick: () => {}
})
</script>

<template>
  <button
    class="group relative h-14 w-fit appearance-none disabled:(cursor-not-allowed opacity-50)"
    :disabled="props.disabled"
    @click="props.onClick"
  >
    <div
      class="absolute bottom-0 h-2 w-full bg-brand-violet"
    />
    <div
      :class="[
        'h-12 inline-flex items-center justify-center min-w-64 bg-brand-cyan b-4 b-brand-violet text-brand-violet text-button transition-all duration-200 ease-in-out translate-y--1 group-enabled-active:translate-y-1 group-enabled-hover:translate-y--0.5 outline-4 outline outline-white outline-offset--8',
        {
          'w-full': props.full,
        }
      ]"
    >
      <StrokedText class="text-stroke-white" width="text-stroke-4">
        <slot />
      </StrokedText>
    </div>
  </button>
</template>

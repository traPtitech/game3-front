<script setup lang="ts">
import type { Events } from 'vue'

interface ButtonProps {
  type?: 'primary';
  full?: boolean;
  disabled?: boolean;
  onClick?: (event: Events['onClick']) => void;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'primary',
  full: false,
  disabled: false,
  onClick: () => {}
})
</script>

<template>
  <button
    class="group relative h-20"
    @click="props.onClick"
  >
    <div
      class="absolute bottom-0 h-2 w-full bg-brand-violet"
    />
    <div
      :class="[
        'h-18 inline-flex items-center justify-center min-w-64 bg-brand-cyan b-4 b-brand-violet text-brand-violet text-button font-bold transition-all duration-200 ease-in-out translate-y--1 group-active:translate-y-1 group-hover:translate-y--0.5 outline-4 outline outline-white outline-offset--8',
        {
          'w-full': props.full,
          'opacity-50 cursor-not-allowed': props.disabled
        }
      ]"
    >
      <StrokedText class="text-stroke-white" width="text-stroke-6">
        <slot />
      </StrokedText>
    </div>
  </button>
</template>

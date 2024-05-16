<script setup lang="ts">
import type { Events } from 'vue'

interface ButtonProps {
  variant?: 'primary' | 'secondary'
  full?: boolean
  ignoreMinWidth?: boolean
  disabled?: boolean
  isLoading?: boolean
  onClick?: (event: Events['onClick']) => void
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  full: false,
  ignoreMinWidth: false,
  disabled: false,
  isLoading: false,
  onClick: () => {},
})
</script>

<template>
  <button
    class="group relative h-14 w-fit appearance-none disabled:(cursor-not-allowed opacity-50) data-[loading=true]:cursor-wait!"
    :disabled="props.disabled || props.isLoading"
    :data-loading="props.isLoading"
    @click="props.onClick"
  >
    <div
      class="absolute bottom-0 h-2 w-full bg-brand-violet"
    />
    <div
      :class="[
        'h-12 inline-flex items-center justify-center b-4 b-brand-violet text-brand-violet text-button transition-all duration-200 ease-in-out translate-y--1 group-enabled-active:translate-y-1 group-enabled-hover:not-active:translate-y--0.5 outline-4 outline outline-white outline-offset--8 relative px-4',
        {
          'min-w-64': !props.ignoreMinWidth,
          'w-full': props.full,
          'bg-brand-yellow': props.variant === 'primary',
          'bg-brand-cyan': props.variant === 'secondary',
        },
      ]"
    >
      <div class="absolute left-4">
        <slot name="prefix">
          <div />
        </slot>
      </div>
      <StrokedText
        class="text-stroke-white!"
        :width="4"
      >
        <slot />
      </StrokedText>
      <div class="absolute right-4">
        <slot name="suffix">
          <div />
        </slot>
      </div>
    </div>
  </button>
</template>

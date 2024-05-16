<script setup lang="ts">
interface StrokedTextProps {
  width?: number
}
const props = withDefaults(defineProps<StrokedTextProps>(), {
  width: 2,
})
</script>

<template>
  <div class="relative text-stroke-black">
    <span
      class="select-none"
      :style="{
        '-webkit-text-stroke-width': `${props.width}px`,
      }"
      aria-hidden
    >
      <slot />
    </span>
    <span class="absolute left-0 top-0 w-full">
      <slot />
    </span>
  </div>
</template>

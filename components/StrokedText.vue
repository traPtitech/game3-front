<script setup lang="ts">
interface StrokedTextProps {
  width?: `text-stroke-${number}`;
}
const props = withDefaults(defineProps<StrokedTextProps>(), {
  width: 'text-stroke-2'
})

</script>

<template>
  <span :class="`relative ${props.width} text-stroke-black`">
    <span class="absolute text-stroke-0">
      <slot />
    </span>
    <slot />
  </span>
</template>

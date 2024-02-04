<script setup lang="ts">
interface StrokedTextProps {
  width?: `text-stroke-${number}`;
}
const props = withDefaults(defineProps<StrokedTextProps>(), {
  width: 'text-stroke-2'
})

</script>

<template>
  <span :class="`relative ${props.width} text-stroke-black text-nowrap`">
    <span class="absolute text-center text-nowrap text-stroke-0">
      <slot />
    </span>
    <slot />
  </span>
</template>

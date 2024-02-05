<script setup lang="ts">
  type Props = {
    src: string;
    media?: string;
    sizes?: string;
  }

const props = defineProps<Props>()

const img = useImage()
const cSizes = computed(() => {
  return img.getSizes(props.src, {
    sizes: props.sizes
  })
})

</script>

<template>
  <source :media="media" :srcset="cSizes.srcset" :sizes="cSizes.sizes">
</template>

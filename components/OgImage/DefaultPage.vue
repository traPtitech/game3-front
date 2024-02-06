<script setup lang="ts">
defineProps<{
  title?: string
  displayDate?: string,
  imgSrc: string
}>()
</script>

<template>
  <div class="h-full w-full flex bg-white font-700">
    <img :src="imgSrc" width="600" height="600" class="object-cover">
    <div
      class="flex flex-col justify-center bg-[#3d1192] pl-4 pr-16 text-white"
    >
      <span class="text-12"> ゲーム制作者交流イベント </span>
      <span class="mb--16 text-8"> ゲームキューブ </span>
      <h1 class="text-36">
        Game³
      </h1>
      <div v-if="title && displayDate">
        <div class="text-16">
          {{ title }} Game³
        </div>
        <div class="text-20">
          {{ displayDate }}
        </div>
      </div>
    </div>
  </div>
</template>

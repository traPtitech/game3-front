<script setup lang="ts">
const props = defineProps<{
  error: {
    url: string;
    statusCode: number;
    statusMessage: string;
    message: string;
    description: string;
    data: any;
  };
}>()
</script>

<template>
  <div>
    <h1>{{ props.error.statusCode }}</h1>
    <NuxtLink to="/">
      Go back home
    </NuxtLink>
  </div>
</template>

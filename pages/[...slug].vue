<!-- `/`以下の全てのパスにマッチ -->
<!-- see: https://nuxt.com/docs/guide/directory-structure/pages#catch-all-route -->
<script setup>
const { path } = useRoute()

const { data, error } = await useAsyncData(`content-${path}`, () => {
  return queryContent().where({ _path: path }).findOne()
})
if (error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}

useContentHead(data)
</script>

<template>
  <ContentRenderer :value="data" />
</template>

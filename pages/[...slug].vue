<!-- `/`以下の全てのパスにマッチ -->
<!-- see: https://nuxt.com/docs/guide/directory-structure/pages#catch-all-route -->
<template>
  <main>
    <!-- `/content`以下のMarkdownファイルを表示 -->
    <ContentDoc>
      <template #not-found>
        <!-- マッチするMarkdownファイルがない場合は404ページを表示 -->
        <ErrorPage />
      </template>
    </ContentDoc>
  </main>
</template>

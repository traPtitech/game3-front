<template>
  <main>
    <!-- `/content`以下のMarkdownファイルを表示 -->
    <ContentDoc>
      <template #not-found>
        <p>Page not found</p>
        <h1>ページが見つかりませんでした＞＜</h1>
        <iframe src="https://buriclicker.trap.games/" style="height:600px; width:100%;" loading="lazy" />
        <p>
          Buri Clicker by <a href="https://twitter.com/deka0106">@deka0106</a>
        </p>
      </template>
    </ContentDoc>
  </main>
</template>

<template>
  <footer class="flex flex-col gap-6 bg-brand-violet px-12 py-16 text-body font-700 text-text-primary">
    <div class="flex">
      <img src="/img/logo/traP_logo_full.svg" alt="東京工業大学デジタル創作同好会traPロゴ" class="mr-auto">
      <a href="https://twitter.com/traPtitech" class="h-16 w-16 flex items-center justify-center">
        <img src="/img/logo/x_logo.svg" alt="X(Twitter)ロゴ" class="h-9">
      </a>
      <a href="https://twitter.com/GAME3_Staff" class="h-16 w-16 flex items-center justify-center">
        <img src="/img/logo/x_logo.svg" alt="X(Twitter)ロゴ" class="h-9">
      </a>
    </div>
    <hr
      class=""
    >
    <div class="flex gap-6">
      <NuxtLink to="/">
        <StrokedText>
          トップページへ
        </StrokedText>
      </NuxtLink>
      <NuxtLink to="/contact">
        <StrokedText>
          お問い合わせ
        </StrokedText>
      </NuxtLink>
      <NuxtLink to="/policy">
        <StrokedText>
          プライバシーポリシー
        </StrokedText>
      </NuxtLink>
      <NuxtLink to="/login">
        <StrokedText>
          ログイン
        </StrokedText>
      </NuxtLink>
      <StrokedText class="ml-auto">
        © 2024 traP TokyoTech
      </StrokedText>
    </div>
  </footer>
</template>

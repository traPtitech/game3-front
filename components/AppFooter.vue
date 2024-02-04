<script setup lang="ts">
const { useMeStore } = useLogin()
const me = useMeStore()
</script>

<template>
  <footer
    class="flex flex-col gap-4 bg-brand-violet px-12 py-8 text-text-white font-700 body"
  >
    <div class="flex items-end">
      <a href="https://trap.jp" class="mr-auto">
        <NuxtImg
          src="/img/logo/traP_logo_full_white.svg"
          alt="東京工業大学デジタル創作同好会traPロゴ"
          class="h-auto w-64 object-contain"
        /></a>
      <a
        href="https://twitter.com/traPtitech"
        class="h-10 w-10 flex items-center justify-center p-2"
      >
        <NuxtImg
          src="/img/logo/x_logo.svg"
          alt="X(Twitter)ロゴ"
        /></a>
      <a
        href="https://twitter.com/GAME3_Staff"
        class="h-10 w-10 flex items-center justify-center p-2"
      >
        <NuxtImg
          src="/img/logo/x_logo.svg"
          alt="X(Twitter)ロゴ"
        /></a>
    </div>
    <hr class="">
    <div class="flex gap-6">
      <NuxtLink to="/">
        <StrokedText> トップページへ </StrokedText>
      </NuxtLink>
      <NuxtLink to="/contact">
        <StrokedText> お問い合わせ </StrokedText>
      </NuxtLink>
      <NuxtLink to="/about-google-analytics">
        <StrokedText> Googleアナリティクスについて </StrokedText>
      </NuxtLink>
      <NuxtLink v-if="me.user" to="/me">
        <StrokedText> マイページ </StrokedText>
      </NuxtLink>
      <NuxtLink v-else to="/login">
        <StrokedText> ログイン </StrokedText>
      </NuxtLink>
      <StrokedText class="ml-auto">
        © 2024 traP TokyoTech
      </StrokedText>
    </div>
  </footer>
</template>

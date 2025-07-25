<script setup lang="ts">
const { useMeStore } = useLogin()
const me = useMeStore()
</script>

<template>
  <footer
    class="flex flex-col gap-4 bg-brand-violet px-4 py-6 text-text-white font-700 lg:(px-12 py-8) body"
  >
    <div class="flex items-center gap-2">
      <a
        href="https://trap.jp"
        class="w-full"
      >
        <img
          src="/img/logo/traP_logo_full_white.svg"
          alt="東京科学大学デジタル創作同好会traPロゴ"
          class="h-auto max-w-full w-64 object-contain"
        ></a>
      <a
        href="https://x.com/traPisct"
        class="ml-auto h-10 w-10 flex shrink-0 items-center justify-center p-2"
      >
        <img
          src="/img/logo/x_logo.svg"
          alt="X(Twitter)ロゴ"
        ></a>
    </div>
    <hr class="bg-surface-primary">
    <div class="flex flex-col gap-2 lg:(flex-row gap-6)">
      <NuxtLink to="/">
        <StrokedText> トップページへ </StrokedText>
      </NuxtLink>
      <NuxtLink to="/contact">
        <StrokedText> お問い合わせ </StrokedText>
      </NuxtLink>
      <NuxtLink to="/about-google-analytics">
        <StrokedText> Googleアナリティクスについて </StrokedText>
      </NuxtLink>
      <NuxtLink
        v-if="me.user"
        to="/me"
      >
        <StrokedText> マイページ </StrokedText>
      </NuxtLink>
      <NuxtLink
        v-else
        to="/login"
      >
        <StrokedText> ログイン </StrokedText>
      </NuxtLink>
      <StrokedText class="ml-auto">
        © 2025 Digital Creators Club traP
      </StrokedText>
    </div>
  </footer>
</template>

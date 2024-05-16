<script setup lang="ts">
const props = defineProps<{
  error: {
    url: string
    statusCode: number
    statusMessage: string
    message: string
    description: string
    data: unknown
  }
}>()
</script>

<template>
  <div
    grid
    min-h-screen
    class="grid-rows-[auto_1fr_auto]"
  >
    <div class="sticky top-0 z-1 shadow">
      <header class="bg-surface-primary">
        <nav class="flex items-center gap-4 px-4 py-2">
          <NuxtLink
            to="/"
            class="mr-auto"
          >
            <picture>
              <source
                srcset="/img/logo/Gamecube_symbol.svg"
                media="(max-width: 360px)"
                alt="Game³ロゴ"
                class="h-16"
              >
              <img
                src="/img/logo/Gamecube_logo_full.svg"
                alt="Game³ロゴ"
                class="h-16"
              >
            </picture>
          </NuxtLink>
        </nav>
      </header>
    </div>
    <main
      class="h-full w-full flex flex-col items-center overflow-x-hidden px-4 pb-16 pt-0"
    >
      <div class="max-w-240 w-full">
        <ProseH1>
          {{ props.error.statusCode }} {{ props.error.statusMessage }}
        </ProseH1>
        <ProseP>
          {{ props.error.message ?? "予期せぬエラーが発生しました" }}
        </ProseP>
        <ProseP>
          <ProseA to="/">
            トップページへ戻る
          </ProseA>
        </ProseP>
        <iframe
          src="https://buriclicker.trap.games/"
          style="height: 600px; width: 100%"
          loading="lazy"
        />
        <ProseP>
          Buri Clicker by
          <ProseA href="https://twitter.com/deka0106">
            @deka0106
          </ProseA>
        </ProseP>
      </div>
    </main>
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
            alt="東京工業大学デジタル創作同好会traPロゴ"
            class="h-auto max-w-full w-64 object-contain"
          ></a>
        <a
          href="https://twitter.com/traPtitech"
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
        <StrokedText class="ml-auto">
          © 2024 traP TokyoTech
        </StrokedText>
      </div>
    </footer>
  </div>
</template>

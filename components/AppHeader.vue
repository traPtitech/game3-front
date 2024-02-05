<template>
  <header class="bg-surface-primary">
    <nav class="flex items-center gap-4 px-4 py-2">
      <NuxtLink to="/" class="mr-auto">
        <picture>
          <NuxtSource
            src="/img/logo/Gamecube_symbol.svg"
            media="(max-width: 320px)"
            alt="Game³ロゴ"
            class="h-16"
          />
          <NuxtImg
            src="/img/logo/Gamecube_logo_full.svg"
            alt="Game³ロゴ"
            class="h-16"
          />
        </picture>
      </NuxtLink>
      <div class="hidden items-center gap-4 lg:flex">
        <HeaderEventNavButton />
        <HeaderEventsButton />
      </div>
      <div class="lg:hidden">
        <HeaderCompactNav />
      </div>
    </nav>
  </header>
</template>

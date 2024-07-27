<template>
  <div
    grid
    min-h-screen
    class="grid-rows-[auto_1fr_auto]"
  >
    <div class="sticky top-0 z-1 shadow">
      <AppHeader />
    </div>
    <main class="h-full min-w-0 w-full flex flex-col items-center overflow-x-hidden px-4 pb-16 pt-0">
      <div class="h-full max-w-240 w-full">
        <slot />
      </div>
    </main>
    <AppFooter />
  </div>
</template>

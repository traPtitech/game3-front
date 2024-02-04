<template>
  <div
    grid
    min-h-screen
    class="grid-rows-[auto_1fr_auto] overflow-x-hidden"
  >
    <AppHeader />
    <main class="h-full w-full flex flex-col items-center px-8 pb-16 pt-0">
      <div class="max-w-240 w-full">
        <slot />
      </div>
    </main>
    <AppFooter />
  </div>
</template>

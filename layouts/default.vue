<template>
  <div
    grid
    min-h-screen
    class="grid-rows-[auto_1fr_auto]"
  >
    <AppHeader />
    <div class="h-full w-full flex flex-col items-center px-8 pb-16 pt-4">
      <div class="max-w-240 w-full">
        <slot />
      </div>
    </div>
    <AppFooter />
  </div>
</template>

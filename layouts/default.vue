<template>
  <div
    grid
    min-h-screen
    class="grid-rows-[auto_1fr_auto]"
  >
    <AppHeader />
    <div h-full w-full>
      <slot />
    </div>
    <AppFooter />
  </div>
</template>

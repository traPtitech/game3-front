<template>
  <span class="relative inline-flex items-center leading-100%">
    <span
      class="select-none c-brand-cyan leading-100% text-stroke-1.5mm text-stroke-brand-violet"
      aria-hidden
      style="filter: drop-shadow(0.5mm 0.5mm 0 #3d1192) drop-shadow(0.5mm 0.5mm 0 #fee03c)"
    >
      <slot />
    </span>
    <span
      class="absolute left-0 c-brand-cyan leading-100% text-stroke-0.2mm text-stroke-white"
    >
      <slot />
    </span>
  </span>
</template>

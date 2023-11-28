// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['@unocss/reset/tailwind.css'],
  modules: ['@nuxt/content', '@unocss/nuxt'],
  devtools: { enabled: true }
})

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    '@unocss/reset/tailwind.css',
    'vue-advanced-cropper/dist/style.css',
    '@vuepic/vue-datepicker/dist/main.css',
    '~/assets/css/index.css',
    '~/assets/css/toast.css',
    '~/assets/css/date-picker.css'
  ],
  modules: ['@nuxt/content', '@unocss/nuxt', '@nuxtjs/google-fonts'],
  devtools: {
    enabled: true,
    timeline: {
      enabled: true
    }
  },
  build: {
    transpile: ['@vuepic/vue-datepicker']
  },
  googleFonts: {
    families: {
      'Noto Sans JP': {
        wght: [400, 500, 700]
      }
    }
  },
  app: {
    head: {
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/favicon.svg'
        }
      ]
    }
  }
})

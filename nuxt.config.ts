// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    '@unocss/reset/tailwind.css',
    '~/assets/css/index.css',
    '~/assets/css/toast.css',
    'vue-advanced-cropper/dist/style.css'
  ],
  modules: ['@nuxt/content', '@unocss/nuxt', '@nuxtjs/google-fonts'],
  devtools: {
    enabled: true,
    timeline: {
      enabled: true
    }
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

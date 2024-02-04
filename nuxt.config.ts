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
  modules: [
    '@nuxt/content',
    '@unocss/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxt/image'
  ],
  devtools: {
    enabled: true,
    timeline: {
      enabled: true
    }
  },
  ssr: true,
  // see: https://nuxt.com/docs/guide/concepts/rendering#hybrid-rendering
  routeRules: {
    '/**': {
      ssr: true
    },
    '/admin/**': {
      ssr: false
    },
    '/entry/**/edit': {
      ssr: false
    },
    '/entry/register': {
      ssr: false
    },
    '/login': {
      ssr: false
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
  runtimeConfig: {
    public: {
      discord: {
        clientId: process.env.NUXT_DISCORD_CLIENT_ID,
        redirectUri: process.env.NUXT_DISCORD_REDIRECT_URI
      },
      basePath: process.env.NUXT_BASE_PATH || 'https://game3.trap.games'
    }
  },
  image: {
    domains: ['game3.trap.games'],
    alias: {
      api: 'https://game3.trap.games/api'
    }
  }
})

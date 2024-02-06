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
    '@nuxt/image',
    'nuxt-og-image'
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
    transpile: ['@vuepic/vue-datepicker'],
    analyze: true
  },
  googleFonts: {
    families: {
      'Noto Sans JP': {
        wght: [400, 500, 700]
      }
    }
  },
  ogImage: {
    fonts: [
      'Noto+Sans+JP:500',
      'Noto+Sans+JP:700'
    ]
  },
  image: {
    domains: ['game3.trap.games'],
    alias: {
      api: process.env.NODE_ENV === 'production' ? 'https://game3.trap.games/api' : 'http://localhost:3000/api'
    }
  },
  content: {
    api: {
      // デフォルトでは`/api/_content`になっておりバックエンドと競合してしまうため変更
      baseURL: '/content-api/_content'
    }
  },
  site: {
    url: 'https://game3.trap.games'
  }
})

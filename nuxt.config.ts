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
    'nuxt-simple-robots',
    '@nuxtjs/sitemap',
    'nuxt-gtag',
    "@nuxt/eslint"
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
    },
    '/me': {
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
  content: {
    api: {
      // デフォルトでは`/api/_content`になっておりバックエンドと競合してしまうため変更
      baseURL: '/content-api/_content'
    },
    highlight: {
      theme: 'github-light',
      langs: ['md']
    }
  },
  vite: {
    server: {
      proxy: {
        '/api': 'http://localhost:8080'
      }
    }
  },
  robots: {
    disallow: ['/admin', '/entry/register', '/entry/*/edit']
  },
  sitemap: {
    sources: [
      '/__sitemap__/urls'
    ]
  },
  eslint: {
    config: {
      stylistic: true
    }
  }
})
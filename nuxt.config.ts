// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    '@unocss/reset/tailwind.css',
    'vue-advanced-cropper/dist/style.css',
    '@vuepic/vue-datepicker/dist/main.css',
    '~/assets/css/index.css',
    '~/assets/css/toast.css',
    '~/assets/css/date-picker.css',
  ],
  modules: [
    '@nuxt/content',
    '@unocss/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    'nuxt-gtag',
    '@nuxt/eslint',
    '@vee-validate/nuxt',
  ],
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  ssr: true,
  // see: https://nuxt.com/docs/guide/concepts/rendering#hybrid-rendering
  routeRules: {
    '/**': {
      ssr: true,
    },
    '/admin/**': {
      ssr: false,
    },
    '/entry/**/edit': {
      ssr: false,
    },
    '/entry/register': {
      ssr: false,
    },
    '/login': {
      ssr: false,
    },
    '/me': {
      ssr: false,
    },
  },
  build: {
    transpile: ['@vuepic/vue-datepicker'],
    analyze: true,
  },
  googleFonts: {
    families: {
      'Noto Sans JP': {
        wght: [400, 500, 700],
      },
    },
  },
  content: {
    api: {
      // デフォルトでは`/api/_content`になっておりバックエンドと競合してしまうため変更
      baseURL: '/content-api/_content',
    },
    highlight: {
      theme: 'github-light',
      langs: ['md'],
    },
  },
  vite: {
    optimizeDeps: {
      exclude: ['vee-validate'],
    },
    server: {
      proxy: {
        '/api': 'https://game3.trap.games',
        // '/api': 'http://localhost:8080',
      },
    },
  },
  robots: {
    disallow: ['/admin', '/entry/register', '/entry/*/edit'],
  },
  sitemap: {
    sources: [
      '/__sitemap__/urls',
    ],
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  compatibilityDate: '2024-07-27',
})

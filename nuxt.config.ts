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
    'nuxt-gtag'
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
    },
    // old event page
    '/event/1st': {
      redirect: 'https://seesaawiki.jp/gamecreatercon-game3/d/%c2%e8%b0%ec%b2%f3%20GAME%5e3'
    },
    '/event/2nd': {
      redirect: 'https://seesaawiki.jp/gamecreatercon-game3/d/%c2%e8%c6%f3%b2%f3%20GAME%5e3'
    },
    '/event/3rd': {
      redirect: 'https://seesaawiki.jp/gamecreatercon-game3/d/%c2%e8%bb%b0%b2%f3%20GAME%5e3'
    },
    '/event/4th': {
      redirect: 'https://seesaawiki.jp/gamecreatercon-game3/d/%c2%e8%bb%cd%b2%f3%20GAME%5e3'
    },
    '/event/5th': {
      redirect: 'https://game3.trap.jp/5th/'
    },
    '/event/6th': {
      redirect: 'https://game3.trap.jp/6th/'
    },
    '/event/7th': {
      redirect: 'https://game3.trap.jp/7th/'
    },
    '/event/8th': {
      redirect: 'https://game3.trap.jp/8th/'
    },
    '/event/9th': {
      redirect: 'https://game3.trap.jp/9th/'
    },
    '/event/10th': {
      redirect: 'https://game3.trap.jp/10th/'
    },
    '/event/15th': {
      redirect: 'https://game3.trap.jp/15th/'
    },
    '/event/16th': {
      redirect: 'https://game3.trap.jp/16th/'
    },
    '/event/17th': {
      redirect: 'https://game3.trap.jp/17th/'
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
  }
})

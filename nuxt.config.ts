// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['@unocss/reset/tailwind.css', '~/assets/css/index.css'],
  modules: ['@nuxt/content', '@unocss/nuxt', '@nuxtjs/google-fonts'],
  devtools: {
    enabled: true,
    timeline: {
      enabled: true
    }
  },
  vite: {
    server: {
      proxy: {
        '/api': {
          // ローカルでバックエンドの開発環境を実行する場合は
          // https://github.com/traPtitech/game3-back/blob/27303b780353f01f6c0241d4c4d33dbb86360304/README.md?plain=1#L16 を参照して`localhost:8080`にproxyする
          target: 'http://localhost:8080',
          changeOrigin: true
        }
      }
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

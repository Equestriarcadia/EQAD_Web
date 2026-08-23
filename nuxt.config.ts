// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  devServer: {
    port: 3900
  },
  css: [
    '~/assets/css/bootstrap.css',
    '~/assets/css/magnific-popup.css',
    '~/assets/css/legacy.css',
    '~/assets/css/site.css'
  ],
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    },
    head: {
      htmlAttrs: {
        lang: 'zh-CN'
      },
      meta: [
        {
          name: 'referrer',
          content: 'no-referrer'
        }
      ],
      link: [
        {
          rel: 'icon',
          href: '/static/image/Q.png'
        }
      ]
    }
  }
})

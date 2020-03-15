const packageJson = require('./package.json')

module.exports = {
  env: {
    name: packageJson.name,
    version: packageJson.version
  },
  mode: 'spa',
  head: {
    title: 'Youtube Comments Downloader',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'A tool for Youtubers to help them working with thousands of comments' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  loading: { color: '#FFFFFF' },
  css: [
    'vuetify/src/stylus/app.styl'
  ],
  plugins: [
    { src: '~/plugins/hotjar', ssr: false },
    { src: '~/plugins/lazysizes', ssr: false },
    { src: '~/plugins/sentry', ssr: false },
    '~/plugins/vue-timeago',
    '~/plugins/vuetify'
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/google-analytics',
    '@nuxtjs/pwa'
  ],
  'google-analytics': {
    id: 'UA-76217107-2'
  },
  pwa: {
    manifest: {
      name: 'Youtube Comments Downloader',
      short_name: 'Comments',
      background_color: '#009688',
      theme_color: '#009688'
    },
    meta: {
      theme_color: '#009688'
    }
  },
  build: {
    extractCSS: true,
    transpile: [/^vuetify/],
    babel: {
      plugins: [
        ["transform-imports", {
          "vuetify": {
            "transform": "vuetify/es5/components/${member}",
            "preventFullImport": true
          }
        }]
      ]
    },
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

const packageJson = require('./package.json')

module.exports = {
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
    { src: '~/plugins/hotjar', mode: 'client' },
    { src: '~/plugins/lazysizes', mode: 'client' },
    '~/plugins/vue-timeago',
    '~/plugins/vuetify',
    '~/plugins/vue-debounce'
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/google-analytics',
    '@nuxtjs/pwa',
    '@nuxtjs/robots',
    '@nuxtjs/sentry'
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
  sentry: {
    dsn: 'https://b65ddccb9c594cbcb1d6a114d7d9d5c4@sentry.io/152451',
    config: {
      release: `${packageJson.name}@${packageJson.version}`
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
    extend(config, { isDev, isClient }) {
      // Sourcemaps
      if (isClient) {
        config.devtool = 'source-map'
      }

      // Run ESLint on save
      if (isDev && isClient) {
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

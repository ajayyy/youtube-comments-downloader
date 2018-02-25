// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
import App from './App'
import VueTimeago from 'vue-timeago'
import 'lazysizes'

import {
  Vuetify,
  VApp,
  VAvatar,
  VBtn,
  VCard,
  VDivider,
  VForm,
  VGrid,
  VIcon,
  VProgressCircular,
  VProgressLinear,
  VTextField,
  VToolbar
} from 'vuetify'

Vue.use(Vuetify, {
  components: {
    Vuetify,
    VApp,
    VAvatar,
    VBtn,
    VCard,
    VDivider,
    VForm,
    VGrid,
    VIcon,
    VProgressCircular,
    VProgressLinear,
    VTextField,
    VToolbar
  }
})

require('vuetify/src/stylus/app.styl')

Vue.config.productionTip = false

Vue.use(VueTimeago, {
  name: 'timeago', // component name, `timeago` by default
  locale: 'en-US',
  locales: {
    'en-US': [
      'just now',
      ['%s second ago', '%s seconds ago'],
      ['%s minute ago', '%s minutes ago'],
      ['%s hour ago', '%s hours ago'],
      ['%s day ago', '%s days ago'],
      ['%s week ago', '%s weeks ago'],
      ['%s month ago', '%s months ago'],
      ['%s year ago', '%s years ago']
    ]
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})

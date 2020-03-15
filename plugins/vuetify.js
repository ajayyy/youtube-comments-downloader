import Vue from 'vue'
import { Vuetify, VApp } from 'vuetify'

import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  components: {
    VApp
  },
  theme: {
    primary: colors.teal.base
  }
})

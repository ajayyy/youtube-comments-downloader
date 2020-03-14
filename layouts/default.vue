<template>
  <v-app class="white">
    <v-content>
      <v-toolbar
        app
      >
        <v-toolbar-items>
          <v-btn
            to="/"
            flat
          >
            Home
          </v-btn>
          <v-btn
            to="settings"
            flat
          >
            Settings
          </v-btn>
          <v-btn
            to="privacy-policy"
            flat
          >
            Privacy policy
          </v-btn>
          <v-btn
            to="terms-of-service"
            flat
          >
            Terms of service
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-container grid-list-xl>
        <v-layout>
          <v-flex
            xs12
            md8
            offset-md2
          >
            <nuxt />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import * as VGrid from 'vuetify/es5/components/VGrid'
  import * as VToolbar from 'vuetify/es5/components/VToolbar'
  import VBtn from 'vuetify/es5/components/VBtn'

  export default {
    components: {
      ...VGrid,
      ...VToolbar,
      VBtn
    }
  }
</script>

<style>
  html {
    text-rendering: auto !important;
    -webkit-font-smoothing: auto !important;
  }

  .v-footer a {
    text-decoration: none;
  }
</style>

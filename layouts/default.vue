<template>
  <v-app class="white">
    <v-toolbar
      app
      flat
      color="primary"
      dark
    >
      <v-toolbar-title>
        <nuxt-link
          to="/"
          class="white--text font-weight-thin"
        >
          Youtube Comments Downloader
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer />
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
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
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

    <v-footer
      app
      height="auto"
    >
      <v-container pa-1>
        <v-layout justify-center>
          <v-flex shrink>
            <v-btn
              to="privacy-policy"
              flat
              round
            >
              Privacy policy
            </v-btn>
          </v-flex>
          <v-flex shrink>
            <v-btn
              to="terms-of-service"
              flat
              round
            >
              Terms of service
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
  import * as VGrid from 'vuetify/es5/components/VGrid'
  import * as VToolbar from 'vuetify/es5/components/VToolbar'
  import VBtn from 'vuetify/es5/components/VBtn'
  import VFooter from 'vuetify/es5/components/VFooter'

  export default {
    components: {
      ...VGrid,
      ...VToolbar,
      VBtn,
      VFooter
    }
  }
</script>

<style>
  html {
    text-rendering: auto !important;
    -webkit-font-smoothing: auto !important;
  }

  .v-toolbar a {
    text-decoration: none;
  }
</style>

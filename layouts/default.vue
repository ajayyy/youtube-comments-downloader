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
          class="logo"
        >
          <v-img
            src="/logo.svg"
            height="40"
            width="40"
          />
          <span>
            <div>
              Comments
            </div>
            <div>
              Downloader
            </div>
          </span>
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn
          to="/"
          flat
          small
        >
          Home
        </v-btn>
        <v-btn
          to="/settings"
          flat
          small
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
              to="/privacy-policy"
              flat
              round
              small
            >
              Privacy policy
            </v-btn>
          </v-flex>
          <v-flex shrink>
            <v-btn
              to="/terms-of-service"
              flat
              round
              small
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
  import VImg from 'vuetify/es5/components/VImg'

  export default {
    components: {
      ...VGrid,
      ...VToolbar,
      VBtn,
      VFooter,
      VImg
    }
  }
</script>

<style>
  html {
    text-rendering: auto !important;
    -webkit-font-smoothing: auto !important;
  }

  .logo {
    display: flex;
    align-items: center;
    color: white;
    text-decoration: none;
    font-size: 10px;
    line-height: 1;
    font-weight: 400;
    text-transform: uppercase;
  }

  .logo .v-image {
    margin-right: 5px;
  }
</style>

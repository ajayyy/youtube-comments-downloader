<template>
  <v-app class="white">
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

      <v-footer
        absolute
        height="auto"
      >
        <v-container>
          <v-layout justify-center>
            <v-flex shrink>
              <v-btn
                to="/"
                flat
                round
              >
                Home
              </v-btn>
            </v-flex>
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
    </v-content>
  </v-app>
</template>

<script>
  import * as VGrid from 'vuetify/es5/components/VGrid'
  import VBtn from 'vuetify/es5/components/VBtn'
  import VFooter from 'vuetify/es5/components/VFooter'

  export default {
    components: {
      ...VGrid,
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

  .v-footer a {
    text-decoration: none;
  }
</style>

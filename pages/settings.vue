<template>
  <div>
    <v-btn
      to="/"
      color="primary"
      class="mx-0 pl-2"
      outline
      round
    >
      <v-icon>
        arrow_left
      </v-icon>
      Back
    </v-btn>

    <h1 class="display-1">
      Settings
    </h1>

    <v-layout
      row
      wrap
    >
      <v-flex xs12>
        <div>
          You can use your own API key to avoid being limited by other users usage.

          <v-text-field
            id="settings-apikey"
            v-model="settings.apiKey"
            label="YouTube Data API key"
            :messages="['The key will be saved only in your browser.']"
            class="mt-1"
            outline
          />

          <v-btn
            href="https://developers.google.com/youtube/registering_an_application"
            target="_blank"
            rel="noopener"
            color="primary"
            class="ml-0 mb-2"
            round
            outline
          >
            How to get own API key
          </v-btn>
        </div>

        <v-divider class="my-4" />

        <div>
          Set username to display latest videos from given channel.

          <v-text-field
            id="settings-username"
            v-model="settings.username"
            label="YouTube username"
            :messages="['The username will be saved only in your browser.']"
            class="mt-1"
            outline
          />

          For <b class="primary--text">https://www.youtube.com/user/GoogleDevelopers</b> channel the username is <b class="primary--text">GoogleDevelopers</b>.
        </div>
      </v-flex>

      <v-flex xs12>
        <v-btn
          :loading="loading"
          color="primary"
          class="ma-0"
          dark
          large
          @click="save"
        >
          Save settings
          <span slot="loader">
            Saving...
          </span>
        </v-btn>
      </v-flex>
    </v-layout>

    <v-alert
      v-for="({ type, message }, index) in messages"
      :key="index"
      :type="type"
      :value="true"
      dismissible
    >
      {{ message }}
    </v-alert>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  import * as VGrid from 'vuetify/es5/components/VGrid'

  import {
    VBtn,
    VTextField,
    VAlert,
    VIcon,
    VDivider
  } from 'vuetify'

  export default {
    components: {
      ...VGrid,
      VBtn,
      VTextField,
      VAlert,
      VIcon,
      VDivider
    },
    data() {
      return {
        messages: [],
        loading: false
      }
    },
    computed: mapState(['settings']),
    methods: {
      async save() {
        this.$store.commit('settings', this.settings)
        const localSettings = JSON.parse(window.localStorage.getItem('settings')) || {}

        if (localSettings.username) {
          await this.$store.dispatch('getChannelUploadsPlaylistId')
        }

        window.localStorage.setItem('settings', JSON.stringify(this.settings))

        this.messages.push({ type:'success', message: 'Settings successfuly saved!' })

        setTimeout(() => {
          this.messages.shift()
        }, 10000);
      }
    }
  }
</script>

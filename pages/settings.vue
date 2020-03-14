<template>
  <div>
    <h1 class="display-1">
      Settings
    </h1>
    <v-layout
      row
      wrap
    >
      <v-flex xs12>
        <v-text-field
          v-model="apiKeyLocal"
          label="YouTube Data API key"
          :messages="['The key will be saved only in your browser.']"
        />
      </v-flex>

      <v-flex xs12>
        <v-btn
          color="primary"
          class="ma-0"
          @click="save"
        >
          Save settings
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
  import * as VGrid from 'vuetify/es5/components/VGrid'

  import {
    VBtn,
    VTextField,
    VAlert
  } from 'vuetify'

  export default {
    components: {
      ...VGrid,
      VBtn,
      VTextField,
      VAlert
    },
    data() {
      return {
        apiKeyLocal: this.$store.state.apiKey.local,
        messages: []
      }
    },
    methods: {
      save() {
        if (this.apiKeyLocal !== this.$store.state.apiKey.default) {
          this.$store.commit('apiKeyLocal', this.apiKeyLocal)
          window.localStorage.setItem('apiKeyLocal', this.apiKeyLocal)
          this.messages.push({ type:'success', message: 'Settings successfuly saved!' })

          setTimeout(() => {
            this.messages.shift()
          }, 10000);
        }
      }
    }
  }
</script>

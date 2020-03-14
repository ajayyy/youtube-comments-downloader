<template>
  <v-form @submit.prevent="onSubmit">
    <v-layout
      row
      wrap
    >
      <v-flex
        :class="{ 'md6': video }"
        d-flex
      >
        <v-card flat>
          <v-card-text>
            <v-text-field
              id="video-id"
              v-model="videoId"
              type="text"
              label="Youtube video URL or ID"
              color="red"
              @input="updateVideoId"
            />

            <p class="grey--text">
              Copy and paste YouTube URL or video ID to fetch all comments.
            </p>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex
        v-if="video"
        md6
        d-flex
      >
        <v-card flat>
          <v-img
            :src="video.snippet.thumbnails.standard.url"
            height="200px"
          />

          <v-card-title class="px-0 py-2">
            <h3 class="title mb-0">
              {{ video.snippet.title }}
            </h3>
          </v-card-title>

          <v-card-text class="pa-0">
            <div>
              {{ video.snippet.channelTitle }}
            </div>
            <div>
              {{ video.statistics.commentCount }} comments
            </div>
          </v-card-text>

          <v-card-actions class="px-0">
            <v-btn
              :loading="loading"
              :disabled="loading"
              type="submit"
              color="red white--text mx-0"
              block
            >
              Fetch comments
              <span slot="loader">
                Loading...
              </span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

    <template v-if="error">
      <v-alert
        v-for="(item, index) in error"
        :key="`error-${index}`"
        type="error"
        :value="true"
      >
        <template v-if="item.reason === 'ipRefererBlocked'">
          You can't use this API key on other domains.
        </template>
        <template v-else-if="item.reason === 'dailyLimitExceeded'">
          Daily Limit Exceeded. The quota will be reset at midnight Pacific Time (PT).
        </template>
        <template v-else-if="item.reason === 'keyInvalid' && apiKey.local">
          Provided API key is invalid.
          <v-btn to="/settings">
            Open settings
          </v-btn>
        </template>
        <template v-else>
          <p
            v-for="key in Object.keys(item)"
            :key="key"
          >
            {{ key }}:
            <strong>
              {{ item[key] }}
            </strong>
          </p>
        </template>
      </v-alert>

      <template v-if="!apiKey.local">
        <v-alert
          v-for="(item, index) in error.filter(error => error.reason === 'dailyLimitExceeded')"
          :key="`info-${index}`"
          type="info"
          :value="true"
        >
          You can use your own API key to avoid being limited by other users usage

          <v-btn
            href="https://developers.google.com/youtube/registering_an_application"
            target="_blank"
            rel="noopener"
          >
            How to get own API key
          </v-btn>
          <v-btn to="/settings">
            Open settings
          </v-btn>
        </v-alert>
      </template>
    </template>
  </v-form>
</template>

<script>
  import { mapState } from 'vuex'

  import * as VGrid from 'vuetify/es5/components/VGrid'
  import * as VCard from 'vuetify/es5/components/VCard'

  import {
    VBtn,
    VForm,
    VImg,
    VTextField,
    VAlert
  } from 'vuetify'

  export default {
    components: {
      ...VCard,
      ...VGrid,
      VBtn,
      VForm,
      VImg,
      VTextField,
      VAlert
    },
    data () {
      return {
        videoId: ''
      }
    },
    computed: mapState([
      'error',
      'loading',
      'video',
      'apiKey'
    ]),
    mounted () {
      if (process.browser) {
        const href = window.location.href
        const url = new URL(href)

        if (url.searchParams.get('v')) {
          this.videoId = url.searchParams.get('v')
          this.updateVideoId()
        }
      }
    },
    methods: {
      async updateVideoId (event) {
        this.$store.commit('resetErrors')
        this.$store.commit('resetComments')
        this.$store.commit('resetVideo')

        const checkPattern = /(?:youtube(?:-nocookie)?\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)?([a-zA-Z0-9_-]{11})/
        const match = this.videoId.match(checkPattern)

        this.$store.commit('videoId', match && match[1] ? match[1] : '')

        if (match && match[1]) {
          window.history.pushState({}, '', `/?v=${match[1]}`)
        } else {
          window.history.pushState({}, '', '/')
        }

        await this.$store.dispatch('getVideo')
      },
      async onSubmit () {
        this.$store.commit('loading', true)
        this.$store.commit('resetComments')
        await this.$store.dispatch('getCommentThreads')
        this.$store.commit('loading', false)
      }
    }
  }
</script>

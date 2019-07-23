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
              v-model="input"
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

    <div
      v-if="error"
      class="form__error"
    >
      <img src="https://media.giphy.com/media/13NRvWtOiMXawM/giphy.gif">

      <div
        v-for="(item, index) in error.errors"
        :key="index"
        :item="item"
      >
        <p>
          Domain:
          <strong>
            {{ item.domain }}
          </strong>
        </p>
        <p>
          Message:
          <strong v-html="item.message" />
        </p>
        <p>
          Reason:
          <strong>
            {{ item.reason }}
          </strong>
        </p>
      </div>
    </div>
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
    VTextField
  } from 'vuetify'

  export default {
    components: {
      ...VCard,
      ...VGrid,
      VBtn,
      VForm,
      VImg,
      VTextField
    },
    data () {
      return {
        input: ''
      }
    },
    computed: mapState([
      'error',
      'loading',
      'video'
    ]),
    mounted () {
      if (process.browser) {
        const href = window.location.href
        const url = new URL(href)

        if (url.searchParams.get('v')) {
          this.input = url.searchParams.get('v')
          this.updateVideoId()
        }
      }
    },
    methods: {
      async updateVideoId (event) {
        this.$store.commit('reset')

        const checkPattern = /(?:youtube(?:-nocookie)?\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)?([a-zA-Z0-9_-]{11})/
        const match = this.input.match(checkPattern)

        this.$store.commit(
          'videoId',
          match && match[1] ? match[1] : ''
        )

        if (match && match[1]) {
          window.history.pushState(
            {},
            '',
            `/?v=${match[1]}`
          )
        } else {
          window.history.pushState({}, '', '/')
        }

        await this.$store.dispatch('getVideo')
      },
      async onSubmit () {
        this.$store.commit('loading', true)
        this.$store.commit('reset')
        await this.$store.dispatch('getCommentThreads')
        this.$store.commit('loading', false)
      }
    }
  }
</script>

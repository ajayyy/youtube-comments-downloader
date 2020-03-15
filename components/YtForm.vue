<template>
  <div>
    <h1 class="title mb-3">
      Paste YouTube URL or video ID to get comments
    </h1>
    <v-text-field
      id="video-id"
      v-model="videoIdInput"
      label="Youtube video URL or ID"
      outline
      clearable
      @input="updateVideoId"
    />

    <template v-if="!settings.uploadsPlaylistId">
      <div class="d-flex promo">
        Set channel name in setting to see here your latest videos
        <v-btn
          to="/settings"
          color="primary"
          round
          flat
          outline
        >
          Open settings
        </v-btn>
      </div>

      <v-divider class="my-3" />
    </template>

    <template v-if="video">
      <h3>
        {{ video.snippet.title }}
      </h3>
      <div>
        {{ video.snippet.channelTitle }}
      </div>
      <div>
        {{ video.statistics.commentCount }} comments
      </div>
    </template>

    <template v-else-if="previousVideos.length && !settings.uploadsPlaylistId">
      Previous videos:
      <yt-videos-list :videos="reverseArray(previousVideos)" />
    </template>

    <template v-else-if="settings.uploadsPlaylistId">
      Latest {{ settings.username }} channel videos:
      <yt-videos-list :videos="channelVideos" />
    </template>

    <v-btn
      v-if="!commentsCount || loading"
      :loading="!!loading"
      :disabled="!!loading || !video"
      type="submit"
      color="primary"
      large
      block
      :to="`/comments/${videoId}`"
      @click="saveVideo"
    >
      Get comments
      <span slot="loader">
        Loading...
      </span>
    </v-btn>

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
        <template v-else-if="item.reason === 'keyInvalid' && settings.apiKey">
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

      <template v-if="!settings.apiKey">
        <v-alert
          v-for="(item, index) in error.filter(error => error.reason === 'dailyLimitExceeded')"
          :key="`info-${index}`"
          type="info"
          :value="true"
        >
          You can use your own API key to avoid being limited by other users usage.

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
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  import * as VGrid from 'vuetify/es5/components/VGrid'

  import YtVideosList from './YtVideosList'

  import {
    VBtn,
    VTextField,
    VAlert,
    VDivider
  } from 'vuetify'

  export default {
    components: {
      ...VGrid,
      VBtn,
      VTextField,
      VAlert,
      VDivider,
      YtVideosList
    },
    data() {
      return {
        videoIdInput: '',
        previousVideos: []
      }
    },
    computed: mapState([
      'error',
      'loading',
      'video',
      'videoId',
      'settings',
      'commentsCount',
      'channelVideos'
    ]),
    watch: {
      videoId() {
        if (!this.videoIdInput || !this.videoIdInput.includes(this.videoId)) {
          this.videoIdInput = this.videoId
        }

        this.updateVideoId()
      }
    },
    async created() {
      this.updatePreviousVideos()
      await this.$store.dispatch('getChannelVideos')
    },
    methods: {
      reverseArray(array) {
        return [...array].reverse()
      },
      updatePreviousVideos() {
        this.previousVideos = JSON.parse(localStorage.getItem('previous-videos')) || []
      },
      async updateVideoId() {
        this.$store.commit('resetErrors')
        this.$store.commit('resetComments')
        this.$store.commit('resetVideo')

        if (!this.videoIdInput) {
          return
        }

        const checkPattern = /(?:youtube(?:-nocookie)?\.com\/(?:[^\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)?([a-zA-Z0-9_-]{11})/
        const match = this.videoIdInput.match(checkPattern)

        if (!match || !match[1]) {
          return
        }

        this.$store.commit('videoId', match[1])
        await this.$store.dispatch('getVideo')
      },
      saveVideo() {
        this.updatePreviousVideos()

        if (!this.previousVideos.find(({ id }) => id === this.videoId )) {
          this.previousVideos.push({
            id: this.videoId,
            title: this.video.snippet.title
          })
        }

        this.previousVideos = this.previousVideos.slice(-4)

        localStorage.setItem(
          'previous-videos',
          JSON.stringify(this.previousVideos)
        )
      }
    }
  }
</script>

<style>
  .promo {
    flex-direction: column;
  }

  @media (min-width: 450px) {
    .promo {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }

    .promo a {
      flex: 0 0 auto !important;
    }
  }
</style>

<template>
  <div class="my-4">
    <template v-if="loading">
      <div class="text-xs-center">
        {{ commentsCount }} comments fetched...
      </div>

      <v-progress-linear
        v-model="progress"
      />
    </template>

    <template v-if="commentsCount && !loading">
      <v-card
        class="mb-4 px-4 pt-2"
        raised
      >
        <v-text-field
          v-model="search"
          label="Search in comments"
          type="search"
          clearable
        />
        <p class="pb-4 grey--text">
          The search will return threads that contain given phrase
          <span
            class="grey--text text--lighten-1"
            style="float: right"
          >
            BETA FEATURE
          </span>
        </p>
      </v-card>

      <div
        v-if="commentsCount > breakpoint"
        class="text-xs-center"
      >
        <v-divider class="my-3" />
        <p>
          For videos with more than {{ breakpoint }} comments pagination is enabled, to prevent browsers crashes and keep render times in reasonable limits.
        </p>

        <v-pagination
          v-model="page"
          :length="length"
          :total-visible="7"
        />
        <v-divider class="my-3" />
      </div>

      <v-card flat>
        <ul class="comment-list pa-4">
          <yt-comment
            v-for="comment in comments"
            :key="comment.id"
            :comment="comment"
          />
        </ul>
      </v-card>

      <div
        v-if="commentsCount > breakpoint"
        class="text-xs-center"
      >
        <v-divider class="my-3" />
        <v-pagination
          v-model="page"
          :length="length"
          :total-visible="7"
        />
      </div>
    </template>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import * as VCard from 'vuetify/es5/components/VCard'
  import {
    VDivider,
    VPagination,
    VProgressLinear,
    VTextField
  } from 'vuetify'

  import YtComment from '@/components/YtComment'

  export default {
    components: {
      ...VCard,
      VDivider,
      VPagination,
      VProgressLinear,
      VTextField,
      YtComment
    },
    data () {
      return {
        page: 1,
        perPage: 1000,
        breakpoint: 5000
      }
    },
    computed: {
      progress () {
        if (this.video) {
          return this.commentsCount / this.video.statistics.commentCount * 100
        }
        return 0
      },
      allComments () {
        if (this.search) {
          return this.$store.getters.commentsWithText(this.search)
        }
        return this.$store.getters.comments()
      },
      comments () {
        if (this.commentsCount > this.breakpoint) {
          const start = (this.page - 1) * this.perPage
          const end = start + this.perPage
          return this.allComments.slice(start, end)
        }

        return this.allComments
      },
      length () {
        return Math.ceil(this.allComments.length / this.perPage)
      },
      search: {
        get () {
          return this.$store.state.search
        },
        set (value) {
          this.$store.commit('search', value)
        }
      },
      ...mapState([
        'commentsCount',
        'loading',
        'video'
      ])
    }
  }
</script>

<style scoped>
  .comment-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
</style>

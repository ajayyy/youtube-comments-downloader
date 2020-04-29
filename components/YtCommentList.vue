<template>
  <div class="my-4">
    <template v-if="loading">
      <div class="text-xs-center">
        <template v-if="loading === 'rendering'">
          <div class="title">
            Rendering comments, please wait...
          </div>
          <div>
            It may take some serious amount of time, depends on your hardware and number of comments.
          </div>
        </template>
        <template v-else>
          {{ commentsCount }} comments fetched...
        </template>
      </div>

      <v-progress-linear indeterminate />
    </template>

    <template v-if="commentsCount && !loading">
      <v-card
        class="mb-4 px-4 pt-2 search"
        raised
      >
        <v-text-field
          v-debounce:100ms="updateSearch"
          label="Search in comments"
          type="search"
          clearable
        />
        <p class="pb-4 grey--text">
          Search will return threads that contain given phrase
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
      allComments () {
        if (this.search.length > 0) {
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
      ...mapState([
        'commentsCount',
        'loading',
        'video',
        'search'
      ])
    },
    methods: {
      updateSearch(value) {
        this.$store.commit('search', value)
      }
    }
  }
</script>

<style scoped>
  .comment-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  @media print {
    .search {
      display: none;
    }
  }
</style>

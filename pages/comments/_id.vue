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
    <yt-comment-list />
  </div>
</template>

<script>
import { VBtn, VIcon } from 'vuetify'
import YtCommentList from '@/components/YtCommentList'

export default {
  components: {
    VBtn,
    VIcon,
    YtCommentList
  },
  beforeCreate() {
    if (!this.$store.state.video) {
      this.$router.push({
        path: '/'
      })
    }
  },
  async beforeMount() {
    this.$store.commit('loading', true)
    this.$store.commit('resetComments')
    await this.$store.dispatch('getCommentThreads')

    this.$store.commit('loading', 'rendering')

    setTimeout(() => {
      this.$store.commit('loading', false)
    }, 1000)
  }
}
</script>

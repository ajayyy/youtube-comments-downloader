<template>
  <div>
    <yt-form />
    <yt-comment-list />
  </div>
</template>

<script>
  import YtForm from '@/components/YtForm'
  import YtCommentList from '@/components/YtCommentList'

  export default {
    components: {
      YtCommentList,
      YtForm
    },
    mounted() {
      this.$store.commit('resetAll')
    }
  }
</script>

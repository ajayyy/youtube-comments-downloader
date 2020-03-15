<template>
  <div>
    <yt-form />
  </div>
</template>

<script>
  import YtForm from '@/components/YtForm'

  export default {
    components: {
      YtForm
    },
    beforeMount() {
      this.$store.commit('resetAll')
    }
  }
</script>

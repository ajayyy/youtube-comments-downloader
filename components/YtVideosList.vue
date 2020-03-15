<template>
  <v-list>
    <template
      v-for="({ id, title }, index) in videos"
    >
      <v-list-tile
        :key="`videos-list-${index}`"
        @click="setId(id)"
      >
        <v-list-tile-content>
          <v-list-tile-title>
            {{ title }}
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-divider
        v-if="index + 1 < videos.length"
        :key="index"
      />
    </template>
  </v-list>
</template>

<script>
import { VDivider } from 'vuetify'
import * as VList from 'vuetify/es5/components/VList'

export default {
  components: {
    ...VList,
    VDivider
  },
  props: {
    videos: {
      type: Array,
      required: true
    }
  },
  methods: {
    setId(id) {
      this.$store.commit('videoId', id)
    }
  }
}
</script>

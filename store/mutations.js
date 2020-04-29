import Vue from 'vue'
import striptags from 'striptags'
import removeAccents from 'remove-accents'

export default {
  resetErrors(state) {
    state.error = false
  },
  resetComments(state) {
    state.threadList = []
    state.comments = {}
    state.commentsCount = 0
    state.search = ''
  },
  resetVideo(state) {
    state.video = false
  },
  resetAll(state) {
    state.threadList = []
    state.comments = {}
    state.commentsCount = 0
    state.error = false
    state.loading = false
    state.search = ''
    state.video = false
    state.videoId = ''
  },
  search(state, value) {
    state.search = value
  },
  videoId(state, id) {
    state.videoId = id
  },
  video(state, video) {
    state.video = video
  },
  loading(state, loading) {
    state.loading = loading
  },
  error(state, error) {
    state.error = error
  },
  settings(state, {key, value}) {
    Vue.set(state.settings, key, value)
  },
  channelVideos(state, videos) {
    state.channelVideos = videos.map(video => ({
      id: video.contentDetails.videoId,
      title: video.snippet.title
    }))
  },
  thread(state, comment) {
    const data = comment.snippet.topLevelComment

    Vue.set(state.comments, data.id, {
      name: data.snippet.authorDisplayName,
      avatar: data.snippet.authorProfileImageUrl,
      channel: data.snippet.authorChannelUrl,
      date: data.snippet.publishedAt,
      likes: data.snippet.likeCount,
      text: data.snippet.textDisplay,
      totalReplyCount: comment.snippet.totalReplyCount,
      replyList: []
    })

    state.threadList.push(data.id)
    state.commentsCount++
  },
  commentReply(state, { commentId, reply }) {
    // Omit replies if parent comment not exist
    if (!state.comments[commentId]) {
      return
    }

    const data = reply.snippet

    Vue.set(state.comments, reply.id, {
      parent: commentId,
      name: data.authorDisplayName,
      avatar: data.authorProfileImageUrl,
      channel: data.authorChannelUrl,
      date: data.publishedAt,
      likes: data.likeCount,
      text: data.textDisplay
    })

    state.comments[commentId].replyList.push(reply.id)
    state.commentsCount++
  },
  generateSearchText(state) {
    Object.keys(state.comments).forEach(id => {
      Vue.set(
        state.comments[id],
        'searchText',
        removeAccents(striptags(state.comments[id].text))
      )
    })
  }
}

import Vue from 'vue'
import striptags from 'striptags'
import removeAccents from 'remove-accents'

export default {
  resetErrors (state) {
    state.error = false
  },
  resetComments (state) {
    state.commentList = []
    state.comments = {}
    state.commentsCount = 0
    state.search = ''
  },
  resetAll (state) {
    state.commentList = []
    state.comments = {}
    state.commentsCount = 0
    state.error = false
    state.loading = false
    state.search = ''
    state.video = false
    state.videoId = ''
  },
  search (state, value) {
    state.search = value
  },
  videoId (state, id) {
    state.videoId = id
  },
  video (state, video) {
    state.video = video
  },
  loading (state, loading) {
    state.loading = loading
  },
  error (state, error) {
    state.error = error
  },
  apiKeyLocal(state, key) {
    state.apiKey.local = key
  },
  comment (state, comment) {
    const data = comment.snippet.topLevelComment

    state.commentsCount++
    state.commentList.push(data.id)

    Vue.set(state.comments, data.id, {
      name: data.snippet.authorDisplayName,
      avatar: data.snippet.authorProfileImageUrl,
      channel: data.snippet.authorChannelUrl,
      date: data.snippet.publishedAt,
      likes: data.snippet.likeCount,
      text: data.snippet.textDisplay,
      searchText: removeAccents(striptags(data.snippet.textDisplay)),
      totalReplyCount: comment.snippet.totalReplyCount,
      replyList: []
    })
  },
  commentReply (state, payload) {
    const data = payload.reply.snippet
    const id = payload.reply.id.replace(data.parentId + '.', '')

    state.commentsCount++
    state.comments[data.parentId].replyList.push(id)

    Vue.set(state.comments, id, {
      parent: data.parentId,
      name: data.authorDisplayName,
      avatar: data.authorProfileImageUrl,
      channel: data.authorChannelUrl,
      date: data.publishedAt,
      likes: data.likeCount,
      text: data.textDisplay,
      searchText: removeAccents(striptags(data.textDisplay))
    })
  }
}

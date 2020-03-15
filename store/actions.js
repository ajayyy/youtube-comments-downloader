import axios from 'axios'

export default {
  async request({ state, commit }, { url, params }) {
    try {
      const { data } = await axios({
        baseURL: 'https://www.googleapis.com/youtube/v3/',
        url,
        params: {
          key: state.settings.apiKey || 'AIzaSyAyYPux1VOpcbKk2V_FKt3nPxfz6lu437k',
          ...params
        }
      })

      return data
    }
    catch(error) {
      commit('error', error.response.data.error.errors)
    }
  },
  async getVideo ({ state, commit, dispatch }) {
    if (!state.videoId) {
      return
    }

    const params = {
      id: state.videoId,
      part: 'snippet,statistics'
    }

    const response = await dispatch('request', { url: 'videos', params })

    if (!response) {
      return
    }

    commit('video', response.items[0])
  },
  async getChannelUploadsPlaylistId({ state, commit, dispatch }) {
    if (!state.settings.username) {
      return
    }

    const params = {
      forUsername: state.settings.username,
      part: 'contentDetails'
    }

    const response = await dispatch('request', { url: 'channels', params })

    if (!response || !response.items[0]) {
      commit('settings', { key: 'uploadsPlaylistId', value: '' })
      return
    }

    commit('settings', {
      key: 'uploadsPlaylistId',
      value: response.items[0].contentDetails.relatedPlaylists.uploads
    })
  },
  async getChannelVideos({ state, commit, dispatch }) {
    if (!state.settings.uploadsPlaylistId) {
      return
    }

    const params = {
      playlistId: state.settings.uploadsPlaylistId,
      part: 'contentDetails,snippet'
    }

    const response = await dispatch('request', { url: 'playlistItems', params })

    if (!response || !response.items) {
      return
    }

    commit('channelVideos', response.items)
  },
  async getCommentThreads ({ state, commit, dispatch }, pageToken) {
    const params = {
      videoId: state.videoId,
      part: 'snippet,replies',
      maxResults: 100
    }

    if (pageToken) {
      params.pageToken = pageToken
    }

    const response = await dispatch('request', { url: 'commentThreads', params })

    if (!response) {
      return
    }

    response.items.forEach(comment => {
      commit('comment', comment)
    })

    const promises = []

    promises.push(
      ...response.items
        .filter(comment => comment.snippet.totalReplyCount > 0)
        .map(comment => dispatch('getComments', comment.snippet.topLevelComment.id))
    )

    if (response.nextPageToken) {
      promises.push(dispatch('getCommentThreads', response.nextPageToken))
    }

    await Promise.all(promises)
  },
  async getComments ({ state, commit, dispatch }, commentId, pageToken) {
    const params = {
      parentId: commentId,
      part: 'snippet',
      maxResults: 100
    }

    if (pageToken) {
      params.pageToken = pageToken
    }

    const response = await dispatch('request', { url: 'comments', params })

    if (!response) {
      return
    }

    response.items.forEach(reply => {
      commit('commentReply', { commentId, reply })
    })

    if (response.nextPageToken) {
      await dispatch('getComments', response.nextPageToken)
    }
  }
}

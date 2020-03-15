const settings = JSON.parse(window.localStorage.getItem('settings')) || {}

export default {
  settings: {
    apiKey: settings.apiKey || '',
    username: settings.username || '',
    uploadsPlaylistId: settings.uploadsPlaylistId || ''
  },
  commentList: [],
  comments: {},
  commentsCount: 0,
  error: false,
  loading: false,
  search: '',
  video: false,
  videoId: '',
  channelVideos: []
}

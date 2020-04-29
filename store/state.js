const settings = JSON.parse(window.localStorage.getItem('settings')) || {}

export default {
  settings: {
    apiKey: settings.apiKey || '',
    username: settings.username || '',
    uploadsPlaylistId: settings.uploadsPlaylistId || ''
  },
  threadList: [],
  comments: {},
  commentsCount: 0,
  error: false,
  loading: false,
  search: '',
  video: false,
  videoId: '',
  channelVideos: []
}

export default {
  apiKey: {
    default: 'AIzaSyAyYPux1VOpcbKk2V_FKt3nPxfz6lu437k',
    local: window.localStorage.getItem('apiKeyLocal') || ''
  },
  commentList: [],
  comments: {},
  commentsCount: 0,
  error: false,
  loading: false,
  search: '',
  video: false,
  videoId: ''
}

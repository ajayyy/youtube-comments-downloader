export default {
  comments: state => (comments = state.commentList) => {
    return comments
      .map(commentId => {
        return {
          ...state.comments[commentId],
          replies: state.comments[commentId].replyList
            .map(replyId => state.comments[replyId])
            .sort((a, b) => new Date(a.date) - new Date(b.date))
        }
      })
      .sort((a, b) => b.likes - a.likes)
  },
  commentsWithText: (state, getters) => text => {
    return getters.comments([
      ...new Set(
        Object.keys(state.comments)
          .map(id => {
            return {
              id: id,
              parent: state.comments[id].parent || false,
              text: state.comments[id].searchText
            }
          })
          .filter(comment => comment.text.search(new RegExp(text, 'i')) >= 0)
          .map(comment => comment.parent ? comment.parent : comment.id)
      )
    ])
  }
}

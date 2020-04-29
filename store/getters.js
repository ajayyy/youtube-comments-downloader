import striptags from 'striptags'
import removeAccents from 'remove-accents'

import pregQuote from '~/helpers/preg-quote'

export default {
  comments: state => (threads = state.threadList) => {
    return threads
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
    text = removeAccents(striptags(text))

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
          .filter(comment => comment.text.search(new RegExp(pregQuote(text), 'i')) >= 0)
          .map(comment => comment.parent ? comment.parent : comment.id)
      )
    ])
  }
}

import axios from 'axios'
import { apiConfig } from '../../../config/apiConfig'
const BASE_URL = apiConfig.BASE_URL

export default {
  commentsCreate ({ commit, getters }, { content, entityId, rootEntityType, parentCommentId }) {
    const options = { content, entityType: rootEntityType }
    console.log('type?', options.entityType)
    if (parentCommentId) options.parentCommentId = parentCommentId
    const token = getters.getToken
    const config = {}
    if (token) {
      config.headers = {
        'Authorization': 'Bearer ' + token
      }
    }

    const url = `${BASE_URL}/comments/forEntity/${entityId}`

    // commit('commentPrepend', {content, entityId, dateCreated: Date.now()})
    return axios.post(url, options, config)
  },

  likeComment: ({ commit, getters, state }, { id, entityId, parentCommentId }) => {
    const token = getters.getToken
    if (!token) {
      alert('You must login to vote')
      return
    }
    return axios.post(`${BASE_URL}/comments/${id}/upvote`, {}, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then((response) => {
      const comment = response.data.entity
      // Tricky since it doesn't come back down with replies:
      // We have to re-add them
      const currentComment = state.comments[comment._id]
      if (currentComment && currentComment.replies) {
        comment.replies = currentComment.replies
      }
      commit('setComment', { entity: comment })
      return response
    })
  },

  removeComment: ({ commit, getters, state }, { id }) => {
    console.log('ID', id)
    const token = getters.getToken
    if (!token) {
      alert('Login to delete your comment')
      return
    }
    return axios.delete(`${BASE_URL}/comments/${id}`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
  },

  commentsFetch ({ getters, commit }, { entityId }) {
    const options = {}
    const token = getters.getToken
    if (token) {
      options.headers = {
        'Authorization': 'Bearer ' + token
      }
    }

    const url = `${BASE_URL}/comments/forEntity/${entityId}`
    return axios.get(url, options)
      .then((response) => {
        const comments = response.data.result
        commit('setComments', { entityId, comments })
        return comments
      })
  }
}

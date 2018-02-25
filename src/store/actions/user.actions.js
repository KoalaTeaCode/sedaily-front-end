import axios from 'axios'
import { apiConfig } from '../../../config/apiConfig'
import { getS3SingedUploadUrlAndUpload } from '../../utils/uploadImage.utils'
const BASE_URL = apiConfig.BASE_URL

export default {

  uploadAvatarImage: ({ commit, state, getters }, { imageFile }) => {
    const token = getters.getToken
    const endpointUrl = `${BASE_URL}/auth/sign-s3`
    return getS3SingedUploadUrlAndUpload({ token, imageFile, endpointUrl })
  },

  fetchMyProfileData: ({ commit, state, getters }) => {
    const token = getters.getToken
    const config = {}
    if (!token) {
      return Promise.reject('User not signed in.')
    }

    config.headers = {
      'Authorization': 'Bearer ' + token
    }

    return axios.get(`${BASE_URL}/users/me`, config)
      .then((response) => {
        commit('setMe', { me: response.data })
        return response
      })
  },

  fetchPublicProfileData: ({ commit, state, getters }, { userId }) => {
    return axios.get(`${BASE_URL}/users/${userId}`)
  },

  updateProfile: ({ commit, state, getters }, { id, username, bio, isAvatarSet, website, name, email }) => {
    const token = getters.getToken
    const config = {}
    if (token) {
      config.headers = {
        'Authorization': 'Bearer ' + token
      }
    }

    return axios.put(`${BASE_URL}/users/${id}`, {
      username,
      bio,
      website,
      name,
      isAvatarSet,
      email
    }, config)
      .then((response) => {
        commit('setMe', { me: response.data })
        return response
      })
      .catch((error) => {
        // @TODO: Add pretty pop up here
        console.log(error)
        alert(error.response.data.message)
        return error
      })
  }

}

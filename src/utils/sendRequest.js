import axios from 'axios'

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_BASE_URL_PROD
    : process.env.REACT_APP_BASE_URL_LOCAL

export const sendRequest = async (method, relativeUrl, data) => {
  const url = baseUrl + relativeUrl

  const headers = {}
  const state = JSON.parse(localStorage.getItem('redux-state') || '{}')

  let token = null
  if (state.user && state.user.token) token = state.user.token

  try {
    // If the token exists it adds it to the authorization header
    if (token) headers.Authorization = `Bearer ${token}`

    const response = await axios({
      method,
      url,
      headers,
      data,
    })

    // If got here, request was successful
    return response.data.data
  } catch (error) {
    // Handle errors with state when we have one!
    if (error.response) {
      // Got response from server
      const errorData = error.response.data
      if (errorData.msg) throw errorData.msg
      if (errorData.errors) throw errorData.errors
    } else {
      // Communication error
      alert("Request didn't go through")
    }
    return null
  }
}

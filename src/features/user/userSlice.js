import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    authenticated: false,
    userData: {},
    token: '',
  },
  reducers: {
    login: (state, action) => {
      state.authenticated = true
      state.userData = action.payload.userData
      state.token = action.payload.token
    },
    logout: (state) => {
      state.authenticated = false
      state.userData = {}
      state.token = ''
    },
  },
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer

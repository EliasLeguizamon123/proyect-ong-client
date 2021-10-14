import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
  },
})

let currentAuthState
// In this function we handle the side effects of setting and deleting the local storage
function handleChange() {
  const state = store.getState()

  const previousAuthState = currentAuthState
  currentAuthState = state.user.authenticated

  // We will only act if the authenticated property changed
  if (previousAuthState !== currentAuthState) {
    if (currentAuthState === false) localStorage.removeItem('token')
    else localStorage.setItem('token', state.user.token)
  }
}

store.subscribe(handleChange)

export default store

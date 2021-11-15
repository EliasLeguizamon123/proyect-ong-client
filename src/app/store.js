import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState: JSON.parse(localStorage.getItem('redux-state')) || {},
})

let currentAuthState
// In this function we handle the side effects of setting and deleting the local storage
function handleChange() {
  const state = store.getState()

  const previousAuthState = currentAuthState
  currentAuthState = state.user.authenticated

  // We will only act if the authenticated property changed
  if (previousAuthState !== currentAuthState) {
    if (currentAuthState === false) localStorage.removeItem('redux-state')
    else localStorage.setItem('redux-state', JSON.stringify(state))
  }
}

store.subscribe(handleChange)

export default store

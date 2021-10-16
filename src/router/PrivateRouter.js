import store from '../app/store'
import React from 'react'
import { Redirect, Route, useLocation } from 'react-router-dom'

export default function PrivateRoute({ component: Component, ...rest }) {
  const {
    user: { authenticated, userData },
  } = store.getState()
  const { pathname } = useLocation()
  const isBackoffice = pathname.includes('/backoffice')

  const renderIfAuth = () => {
    return authenticated ? renderIfBackoffice() : <Redirect to="/login" />
  }

  const renderIfBackoffice = () => {
    return isBackoffice ? renderIfAdmin() : <Component />
  }

  const renderIfAdmin = () => {
    return userData?.roleId === 1 ? <Component /> : <Redirect to="/" />
  }

  return <Route {...rest}>{renderIfAuth()}</Route>
}

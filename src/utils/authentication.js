import { sendRequest } from './sendRequest'
import { alertError } from './alerts'

const authentication = async (isRegister, userData, history) => {
  let response = !isRegister
    ? await sendRequest('post', `/auth/login`, {
        email: userData.email,
        password: userData.password,
      })
    : await sendRequest('post', `/auth/register`, {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
      })
  if (response.ok) {
    history.push('/')
    localStorage.setItem('token', response.token)
  } else {
    alertError('Error', response.msg)
  }
}

export default authentication

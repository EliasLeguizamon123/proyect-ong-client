import { sendRequest } from './sendRequest'
import { alertError } from './alerts'

const authentication = async (isRegister, userData) => {
  try {
    const route = isRegister ? 'register' : 'login'
    const response = await sendRequest('post', `/auth/${route}`, userData)

    return { token: response.token, roleId: response.userData.roleId }
  } catch (err) {
    alertError('Error', err.message)
  }
}

export default authentication

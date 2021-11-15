import { sendRequest } from './sendRequest'
import { alertError } from './alerts'

const authentication = async (isRegister, userData) => {
  try {
    const route = isRegister ? 'register' : 'login'
    const response = await sendRequest('post', `/auth/${route}`, userData)

    const data = {
      ...response.userData,
      isAdmin: response.userData.roleId === 1,
    }

    return { token: response.token, userData: data }
  } catch (err) {
    alertError('', 'Error de credenciales')
  }
}

export default authentication

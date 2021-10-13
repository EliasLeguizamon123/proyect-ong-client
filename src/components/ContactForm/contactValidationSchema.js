import * as Yup from 'yup'
import 'yup-phone'

const contactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Demasiado corto!')
    .max(255, 'demasiado largo!')
    .required('Debe ingresar un nombre'),
  email: Yup.string()
    .email('Debe ingresar un email válido')
    .required('Debe ingresar un email'),
  phone: Yup.string()
    .phone(undefined, false, 'Debe ingresar un numero de telefono válido')
    .required('Debe ingresar un numero de telefono'),
  message: Yup.string()
    .max(2000, 'El mensaje es demasiado extenso')
    .required('Debe ingresar un mensaje'),
})

export default contactSchema

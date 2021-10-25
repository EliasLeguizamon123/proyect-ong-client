import * as Yup from 'yup'

export const FormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Demasiado corto!')
    .max(255, 'demasiado largo!')
    .required('El nombre es obligatorio'),
  image: Yup.string()
    .url('La ruta ingresada debe ser una URL válida')
    .required('La imagen es obligatoria'),
  content: Yup.string()
    .max(255, 'El contenido es demasiado largo!')
    .required('El contenido es obligatorio'),
})

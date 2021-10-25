import * as Yup from 'yup'

export const FormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Demasiado corto!')
    .max(255, 'demasiado largo!')
    .required('El título es obligatorio'),
  content: Yup.string()
    .max(2000, 'El contenido es demasiado largo!')
    .required('El contenido es obligatorio'),
})

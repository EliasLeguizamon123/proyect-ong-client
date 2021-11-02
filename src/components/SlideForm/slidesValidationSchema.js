import * as Yup from 'yup'

export const FormSchema = Yup.object().shape({
  image: Yup.string()
    .url('La ruta ingresada debe ser una URL válida')
    .required('La imagen es obligatoria'),
  text: Yup.string()
    .min(20, 'Muy corto')
    .max(255, 'Muy largo')
    .required('Debe ingresar un texto valido'),
  order: Yup.number().required('el orden es requerido'),
})

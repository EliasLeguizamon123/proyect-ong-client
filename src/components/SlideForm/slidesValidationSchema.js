import * as Yup from 'yup'

export const FormSchema = Yup.object().shape({
  text: Yup.string()
    .min(20, 'Muy corto')
    .max(255, 'Muy largo')
    .required('Debe ingresar un texto valido'),
  order: Yup.number().required('el orden es requerido'),
  organizationId: Yup.number().required('el id de organizacion es requerido'),
})

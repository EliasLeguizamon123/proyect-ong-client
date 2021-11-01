import * as Yup from 'yup'

export const MembersFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Demasiado corto!')
    .max(255, 'demasiado largo!')
    .required('El titulo es obligatorio'),
  image: Yup.string()
    .url('La ruta ingresada debe ser una URL válida')
    .required('La imagen es obligatoria'),
})

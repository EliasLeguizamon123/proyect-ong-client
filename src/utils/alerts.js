import Swal_class from 'sweetalert2'

export const alertError = (title, message) => {
  return Swal_class.fire(title, message, 'error')
}

export const alertSuccess = (title, message) => {
  return Swal_class.fire(title, message, 'success')
}

export const alertConfirm = (title, text, onConfirm) => {
  return Swal_class.fire({
    title,
    text,
    type: 'question',
    showCancelButton: true,
    cancelButtonText: 'No',
    confirmButtonText: 'Sí',
  }).then((result) => {
    if (result.value) onConfirm()
  })
}

// Exports the entire class to be able to use all customizations
// For list of different options, find documentation at:
// https://sweetalert2.github.io/
export const Swal = Swal_class

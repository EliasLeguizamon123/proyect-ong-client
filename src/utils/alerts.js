import Swal_class from 'sweetalert2'

export const alertError = (title, message) => {
  return Swal_class.fire(title, message, 'error')
}

export const alertSuccess = (title, message) => {
  return Swal_class.fire(title, message, 'success')
}

// Exports the entire class to be able to use all customizations
// For list of different options, find documentation at:
// https://sweetalert2.github.io/
export const Swal = Swal_class

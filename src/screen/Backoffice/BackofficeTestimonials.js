import React, { useState, useEffect } from 'react'
import { sendRequest } from '../../utils/sendRequest'
import { useHistory } from 'react-router-dom'
import BackOfficeTable from '../../components/Backoffice/BackOfficeTable'
import { alertConfirm, alertSuccess } from '../../utils/alerts'

const BackTestimonialsPage = () => {
  const [allData, setAllData] = useState([])
  const [items, setItems] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const limit = 8
  const history = useHistory()

  useEffect(() => {
    getTestimonials()
  }, [])

  const getTestimonials = async () => {
    const res = await sendRequest('get', '/testimonials')
    setAllData(res.rows)
    const total = res.count
    setPageCount(Math.ceil(total / limit))
    setItems(res.rows.slice(0, limit))
  }

  const handleDelete = id => {
    alertConfirm(
      'Seguro deseas borrar este testimonio?',
      'Esta accion es irreversible',
      async () => {
        await sendRequest('delete', `/testimonials/${id}`)
        await alertSuccess('Testimonio borrado con éxito')
        getTestimonials()
      }
    )
  }
  const handleEdit = id => {
    history.push(`/backoffice/testimonials/${id}`)
  }

  const tableHead = ['Nombre', 'Imagen', 'Creado', 'Acciones']

  return (
    <BackOfficeTable
      allItems={allData}
      itemsToShow={items}
      pageCount={pageCount}
      limit={limit}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
      setItemsToShow={setItems}
      title='Testimonios'
      tableHead={tableHead}
      formRoute='testimonials'
    />
  )
}

export default BackTestimonialsPage

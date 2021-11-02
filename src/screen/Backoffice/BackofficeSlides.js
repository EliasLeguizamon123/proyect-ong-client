import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { sendRequest } from '../../utils/sendRequest'
import { alertConfirm, alertSuccess } from '../../utils/alerts'
import BackOfficeTable from '../../components/Backoffice/BackOfficeTable'

const BackofficeSlides = () => {
  const history = useHistory()
  let [allSlides, setAllSlides] = useState()
  const [itemsToShow, setItemsToShow] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const limit = 5

  useEffect(() => {
    getSlides()
  }, [])

  const getSlides = async () => {
    const res = await sendRequest('get', '/slides')
    setPageCount(Math.ceil(res.count / limit))
    setAllSlides(res.rows)
    setItemsToShow(res.rows.slice(0, limit))
  }

  const handleDelete = async id => {
    alertConfirm(
      'Seguro deseas borrar este slide?',
      'Esta accion es irreversible',
      async () => {
        await sendRequest('delete', `/slides/${id}`)
        await alertSuccess('Slide borrado con éxito')
        getSlides()
      }
    )
  }

  const handleEdit = id => {
    history.push(`/backoffice/slides/${id}`)
  }

  const formattedSlides = []
  if (itemsToShow.length > 0) {
    itemsToShow.forEach(slide => {
      formattedSlides.push({
        name: slide.text,
        image: slide.imageUrl,
        id: slide.id,
        order: slide.order,
      })
    })
  }

  const tableHead = ['Texto', 'Imagen', 'Orden', 'Acciones']

  return (
    <BackOfficeTable
      allItems={allSlides}
      itemsToShow={formattedSlides}
      pageCount={pageCount}
      limit={limit}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
      setItemsToShow={setItemsToShow}
      title='Slides'
      tableHead={tableHead}
      formRoute='slides'
      slides
    />
  )
}

export default BackofficeSlides

import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { sendRequest } from '../../utils/sendRequest'
import { alertSuccess, alertConfirm } from '../../utils/alerts'
import BackOfficeTable from '../../components/Backoffice/BackOfficeTable'

const Categories = () => {
  let history = useHistory()
  const [allCategories, setAllCategories] = useState([])
  const [itemsToShow, setItemsToShow] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const limit = 5

  useEffect(() => {
    getCategories()
  }, [])

  const getCategories = async () => {
    const res = await sendRequest('get', '/categories')
    setPageCount(Math.ceil(res.count / limit))
    setAllCategories(res.rows)
    setItemsToShow(res.rows.slice(0, limit))
  }

  const handleDelete = async id => {
    alertConfirm(
      'Seguro deseas borrar esta categoría?',
      'Esta accion es irreversible',
      async () => {
        await sendRequest('delete', `/categories/${id}`)
        await alertSuccess('Categoría borrada con éxito')
        getCategories()
      }
    )
  }
  const handleEdit = id => {
    history.push(`/backoffice/categories/${id}`)
  }
  const tableHead = ['Nombre', '', 'Creada', 'Acciones']

  return (
    <BackOfficeTable
      allItems={allCategories}
      itemsToShow={itemsToShow}
      pageCount={pageCount}
      limit={limit}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
      setItemsToShow={setItemsToShow}
      title='Categorías'
      tableHead={tableHead}
      formRoute='categories'
    />
  )
}

export default Categories

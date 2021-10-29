import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { sendRequest } from '../../utils/sendRequest'
import BackOfficeTable from '../../components/Backoffice/BackOfficeTable'
import { alertConfirm, alertSuccess } from '../../utils/alerts'

const BackActivitiesPage = () => {
  const [allData, setAllData] = useState([])
  const [items, setItems] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const limit = 8

  let history = useHistory()

  useEffect(() => {
    getActivities()
  }, [pageCount])

  const getActivities = async () => {
    const res = await sendRequest('get', '/activities')
    setAllData(res.rows)
    const total = res.count
    setPageCount(Math.ceil(total / limit))
    setItems(res.rows.slice(0, limit))
  }

  const handleDelete = id => {
    alertConfirm(
      'Seguro deseas borrar esta actividad?',
      'Esta accion es irreversible',
      async () => {
        await sendRequest('delete', `/activities/${id}`)
        await alertSuccess('Actividad borrada con éxito')
        getActivities()
      }
    )
  }
  const handleEdit = id => {
    history.push(`/backoffice/activities/${id}`)
  }
  const tableHead = ['Nombre', 'Imagen', 'Creada', 'Acciones']

  return (
    <BackOfficeTable
      allItems={allData}
      itemsToShow={items}
      pageCount={pageCount}
      limit={limit}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
      setItemsToShow={setItems}
      title='Actividades'
      tableHead={tableHead}
      formRoute='activities'
    />
  )
}

export default BackActivitiesPage

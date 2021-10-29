import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { sendRequest } from '../../utils/sendRequest'
import { alertConfirm, alertSuccess } from '../../utils/alerts'
import BackOfficeTable from '../../components/Backoffice/BackOfficeTable'

const BackofficeMembers = () => {
  const history = useHistory()
  let [allMembers, setAllMembers] = useState()
  const [itemsToShow, setItemsToShow] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const limit = 5

  useEffect(() => {
    getMembers()
  }, [])

  const getMembers = async () => {
    const res = await sendRequest('get', '/members')
    setPageCount(Math.ceil(res.count / limit))
    setAllMembers(res.rows)
    setItemsToShow(res.rows.slice(0, limit))
  }

  const handleDelete = async id => {
    alertConfirm(
      'Seguro deseas borrar este miembro?',
      'Esta accion es irreversible',
      async () => {
        await sendRequest('delete', `/members/${id}`)
        await alertSuccess('Miembro borrado con éxito')
        getMembers()
      }
    )
  }

  const handleEdit = id => {
    history.push(`/backoffice/members/${id}`)
  }

  const tableHead = ['Nombre', 'Imagen', 'Creado', 'Acciones']

  return (
    <BackOfficeTable
      allItems={allMembers}
      itemsToShow={itemsToShow}
      pageCount={pageCount}
      limit={limit}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
      setItemsToShow={setItemsToShow}
      title='Miembros'
      tableHead={tableHead}
      formRoute='members'
    />
  )
}

export default BackofficeMembers

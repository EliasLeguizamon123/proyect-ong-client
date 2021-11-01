import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { sendRequest } from '../../utils/sendRequest'
import { alertConfirm, alertSuccess } from '../../utils/alerts'
import BackOfficeTable from '../../components/Backoffice/BackOfficeTable'

const BackofficeUsers = () => {
  const history = useHistory()
  let [allUsers, setAllUsers] = useState()
  const [itemsToShow, setItemsToShow] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const limit = 5

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    const res = await sendRequest('get', '/users')
    setPageCount(Math.ceil(res.count / limit))
    setAllUsers(res.rows)
    setItemsToShow(res.rows.slice(0, limit))
  }

  const formattedUsers = []
  if (itemsToShow.length > 0) {
    itemsToShow.forEach(user => {
      formattedUsers.push({
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        createdAt: user.createdAt,
      })
    })
  }

  const handleDelete = async (id) => {
    alertConfirm(
      'Seguro deseas borrar este usuario?',
      'Esta accion es irreversible',
      async () => {
        await sendRequest('delete', `/users/${id}`)
        await alertSuccess('Usuario borrado con éxito')
        getUsers()
      }
    )
  }

  const handleEdit = (id) => {
    history.push(`/backoffice/users/${id}`)
  }
  const tableHead = ['Nombre', 'Email', 'Creado', 'Acciones']

  return (
    <BackOfficeTable
      allItems={allUsers}
      itemsToShow={formattedUsers}
      pageCount={pageCount}
      limit={limit}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
      setItemsToShow={setItemsToShow}
      title="Usuarios"
      tableHead={tableHead}
      formRoute="users"
      users
    />
  )
}

export default BackofficeUsers

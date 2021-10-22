import React, { useEffect, useState } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Button,
  TableCaption,
  Td,
  Center,
} from '@chakra-ui/react'
import Spinner from '../../utils/Spinner'
import { useHistory } from 'react-router-dom'
import { sendRequest } from '../../utils/sendRequest'
import { alertError, Swal } from '../../utils/alerts'

const handleDelete = async (id) => {
  const res = await Swal.fire({
    title: 'Estas seguro?',
    text: 'No podrás deshacer esta acción',
    type: 'warning',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si. Estoy seguro!',
  })
  if (res.value) {
    try {
      const response = await sendRequest('delete', `/users/${id}`)
      if (response.ok)
        return Swal.fire(
          'Eliminada!',
          'Usuario/a eliminado/a correctamente.',
          'success'
        )
    } catch (error) {
      alertError('Error', 'Something was wrong')
    }
  }
}

const AllUsers = () => {
  const history = useHistory()
  let [users, setUsers] = useState()
  let [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await sendRequest('get', '/categories')
        if (response) setUsers(response)
      } catch (error) {
        alertError('Error', 'Something was wrong')
      }
    }
    getUsers()
    setLoading(false)
  }, [])
  return (
    <div>
      {loading ? (
        <Center>
          <Spinner />
        </Center>
      ) : (
        <Table colorScheme="red" marginTop="10vh" marginBottom="10vh">
          <TableCaption>
            En esta tabla se puede visualizar los usuarios registrados hasta el
            momento
          </TableCaption>
          <Thead>
            <Tr>
              <Th>NOMBRE</Th>
              <Th>APELLIDO</Th>
              <Th>EMAIL</Th>
              <Th>EDITAR USUARIO</Th>
              <Th>ELIMINAR USUARIO</Th>
            </Tr>
          </Thead>
          <Tbody>
            {!users
              ? null
              : users.map((user) => (
                  <Tr key={user.id}>
                    <Td>{user.firstName}</Td>
                    <Td>{user.lastName}</Td>
                    <Td>{user.email}</Td>
                    <Td>
                      <Button
                        bg="blue.400"
                        color="white"
                        _hover={{
                          bg: 'blue.500',
                        }}
                        size="xs"
                        onClick={() => {
                          history.push('/users/' + user.id)
                        }}
                      >
                        Editar
                      </Button>
                    </Td>
                    <Td>
                      <Button
                        bg="blue.400"
                        color="white"
                        _hover={{
                          bg: 'blue.500',
                        }}
                        size="xs"
                        onClick={() => {
                          handleDelete(user.id)
                        }}
                      >
                        Eliminar
                      </Button>
                    </Td>
                  </Tr>
                ))}
          </Tbody>
        </Table>
      )}
    </div>
  )
}

export default AllUsers

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
  Heading,
  Stack,
  IconButton,
} from '@chakra-ui/react'
import Spinner from '../../utils/Spinner'
import { useHistory } from 'react-router-dom'
import { sendRequest } from '../../utils/sendRequest'
import { alertError, Swal } from '../../utils/alerts'
import { ArrowBackIcon } from '@chakra-ui/icons'

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
        const response = await sendRequest('get', '/users')
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
        <Stack
          pt={12}
          direction="column"
          align='center'
          justifyContent='space-between'
          spacing={4}
        >
          <Stack 
            direction="row"
            spacing={3}
            w={['100%', '100%', '80%', '60%']}
          >
            <Heading>
              Listado de usuarios registrados
            </Heading>
            <IconButton
              icon={<ArrowBackIcon />}
              colorScheme='gray'
              width='2rem'
              onClick={() => history.goBack()}
            />
          </Stack>
          <Table 
            colorScheme="red" 
            marginTop="10vh" 
            marginBottom="10vh"
            w={['100%', '100%', '80%', '60%']}
            >
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
                        bg="gray.300"
                        color="white"
                        _hover={{
                          bg: 'yellow.300',
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
                        bg="gray.300"
                        color="white"
                        _hover={{
                          bg: 'red.300',
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
        </Stack>
      )}
    </div>
  )
}

export default AllUsers

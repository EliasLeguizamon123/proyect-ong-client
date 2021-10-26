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
            const response = await sendRequest('delete', `/activities/${id}`)
            if (response.ok)
                return Swal.fire(
                    'Eliminada!',
                    'Actividad eliminada correctamente.',
                    'success'
                )
        } catch (error) {
            alertError('Error', 'Something was wrong')
        }
    }
}

const Activities = () => {
    const history = useHistory()
    let [acitivities, setActivities] = useState()
    let [loading, setLoading] = useState(true)

    useEffect(() => {
        const getActivities = async () => {
            try {
                const response = await sendRequest('get', '/activities')
                if (response) setActivities(response)
            } catch (error) {
                alertError('Error', 'Something was wrong')
            }
        }
        getActivities();
        setLoading(false);
    }, [])

    return(
        <div>
          {loading ? (
            <Center>
              <Spinner />
            </Center>
          ) : (
            <Table colorScheme="red" marginTop="10vh" marginBottom="10vh">
              <TableCaption>
              En esta tabla se puede visualizar las actividades registradas hasta el
                momento
              </TableCaption>
              <Thead>
                <Tr>
                  <Th>NOMBRE</Th>
                  <Th>EDITAR ACTIVIDAD</Th>
                  <Th>ELIMINAR ACTIVIDAD</Th>
                </Tr>
              </Thead>
              <Tbody>
                {!acitivities
                  ? null
                  : acitivities.map((activity) => (
                      <Tr key={activity.id}>
                        <Td>{activity.name}</Td>
                        <Td>
                          <Button
                            bg="blue.400"
                            color="white"
                            _hover={{
                              bg: 'blue.500',
                            }}
                            size="xs"
                            onClick={() => {
                              history.push('/activities/' + activity.id)
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
                              handleDelete(activity.id)
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

export default Activities
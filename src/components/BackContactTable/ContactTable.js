import React, { useEffect, useState } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Flex,
  Box,
} from '@chakra-ui/react'
import { ViewIcon, DeleteIcon } from '@chakra-ui/icons'
import Paginator from '../Paginator'
import { sendRequest } from '../../utils/sendRequest'
import { alertSuccess, alertConfirm } from '../../utils/alerts'

export default function ContactTable ({ viewMessage }) {
  const [totalData, setTotalData] = useState([])
  const [items, setItems] = useState([])
  const [pageTotal, setPageTotal] = useState(0)
  const limit = 8

  useEffect(() => {
    const fetchData = async () => {
      let res = await sendRequest('get', `/contacts`)
      setTotalData(res.rows)
      setPageTotal(Math.ceil(res.count / limit))
      setItems(res.rows.slice(0, limit))
    }

    fetchData()
  }, [pageTotal])

  const handlePageChange = async data => {
    let currentPage = data.selected * limit
    setItems(totalData.slice(currentPage, currentPage + limit))
  }
  //I need create Route to delete contacts
  const handleDelete = id => {
    alertConfirm(
      'Seguro deseas borrar esta novedad?',
      'Esta accion es irreversible',
      async () => {
        await sendRequest('delete', `/contacts/${id}`)
        await alertSuccess('Novedad borrada con éxito')
      }
    )
  }

  return (
    <Flex direction='column'>
      <Box marginBottom='10px' p={2}>
        <Table bg='white' rounded='lg' boxShadow='lg'>
          <Thead>
            <Tr p={8}>
              <Th>Nombre</Th>
              <Th>Correo electronico</Th>
              <Th>Telefono</Th>
              <Th>Mensaje</Th>
            </Tr>
          </Thead>
          <Tbody>
            {items?.map(element => {
              return (
                <Tr key={element.id}>
                  <Td>{element.name}</Td>
                  <Td>{element.email}</Td>
                  <Td>{element.phone}</Td>
                  <Td>
                    <Flex direction='column' maxW='50px'>
                      <IconButton
                        variant='outline'
                        aria-label='Borrar mensaje'
                        fontSize='20px'
                        icon={<DeleteIcon />}
                        m={1}
                        onClick={() => handleDelete(element.id)}
                      />
                      <IconButton
                        variant='outline'
                        colorScheme='teal'
                        aria-label='Ver mensaje'
                        fontSize='20px'
                        icon={<ViewIcon />}
                        m={1}
                        onClick={() => viewMessage(element)}
                      />
                    </Flex>
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </Box>
      <Paginator onPageChange={handlePageChange} pageCount={pageTotal} />
    </Flex>
  )
}

import React, { useEffect, useState, useCallback } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Box,
} from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons'
import Paginator from '../Paginator'
import { sendRequest } from '../../utils/sendRequest'

export default function ContactTable({ viewMessage }) {
  const [data, setData] = useState()
  const [pageTotal, setPageTotal] = useState()
  const [offset, setOffset] = useState(0)
  const limit = 10

  const fetchData = useCallback(async () => {
    let contactsFetched = await sendRequest(
      'get',
      `/contacts?limit=${limit}&offset=${offset}`
    )
    setData(contactsFetched.rows)
    setPageTotal(Math.ceil(contactsFetched.count / limit))
  }, [offset])

  const handlePageChange = async (data) => {
    const pageOffset = data.selected * limit
    setOffset(pageOffset)
  }

  useEffect(() => {
    if (!data) {
      fetchData()
    }
  }, [data, fetchData])

  useEffect(() => {
    fetchData()
  }, [offset, fetchData])

  return (
    <>
      <Box marginBottom="10px" overflow="overflowX" w="100vw" overflowX="auto">
        <Table
          w={['100%', '100%', '80%', '60%']}
          bg="white"
          rounded="lg"
          boxShadow="lg"
          margin="0 auto"
        >
          <Thead>
            <Tr p={8}>
              <Th>Nombre</Th>
              <Th>Correo electronico</Th>
              <Th>Telefono</Th>
              <Th>Mensaje</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((element) => {
              return (
                <Tr key={element.id}>
                  <Td>{element.name}</Td>
                  <Td>{element.email}</Td>
                  <Td>{element.phone}</Td>
                  <Td>
                    <IconButton
                      variant="outline"
                      colorScheme="teal"
                      aria-label="Ver mensaje"
                      fontSize="20px"
                      icon={<ViewIcon />}
                      onClick={() => viewMessage(element)}
                    />
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </Box>
      <Paginator onPageChange={handlePageChange} pageCount={pageTotal} />
    </>
  )
}

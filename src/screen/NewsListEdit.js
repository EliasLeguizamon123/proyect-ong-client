import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Image,
  Flex,
  Center,
} from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import Paginator from '../components/Paginator'
import { sendRequest } from '../utils/sendRequest'
import { alertSuccess, alertConfirm } from '../utils/alerts'

const NewsListEdit = () => {
  let history = useHistory()
  const [allNnews, setAllNews] = useState([])
  const [itemsToShow, setItemsToShow] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const limit = 5

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    const res = await sendRequest('get', `/news`)

    setPageCount(Math.ceil(res.count / limit))
    setAllNews(res.rows)
    setItemsToShow(res.rows.slice(0, limit))
  }

  const handlePageChange = async ({ selected }) => {
    const sliceStart = selected * limit
    setItemsToShow(allNnews.slice(sliceStart, sliceStart + limit))
  }
  const handleDelete = (id) => {
    alertConfirm(
      'Seguro deseas borrar esta novedad?',
      'Esta accion es irreversible',
      async () => {
        await sendRequest('delete', `/news/${id}`)
        await alertSuccess('Novedad borrada con éxito')
        fetchNews()
        history.push('/')
      }
    )
  }

  const handleEdit = (id) => {
    history.push(`/backoffice/novedades/${id}`)
  }

  return (
    <>
      <Center minH="70vh">
        <Table
          bg="white"
          rounded="lg"
          boxShadow="lg"
          margin="10px 0"
          w={['100%', '90%', '80%']}
        >
          <Thead>
            <Tr p={8}>
              <Th>Nombre</Th>
              <Th>Imagen</Th>
              <Th display={['none', 'table-cell']}>Creada</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {itemsToShow?.map((element) => {
              return (
                <Tr key={element.id} _hover={{ boxShadow: 'lg' }}>
                  <Td>{element.name}</Td>
                  <Td padding="10px">
                    <Image src={element.image} maxH="130px" />
                  </Td>
                  <Td display={['none', 'table-cell']}>
                    {element.createdAt.slice(8, 10)}/
                    {element.createdAt.slice(5, 7)}
                  </Td>
                  <Td>
                    <Flex direction="column" maxW="50px">
                      <IconButton
                        variant="outline"
                        margin="10px"
                        aria-label="Borrar novedad"
                        fontSize="20px"
                        icon={<DeleteIcon />}
                        onClick={() => handleDelete(element.id)}
                      />
                      <IconButton
                        variant="outline"
                        margin="10px"
                        aria-label="Editar novedad"
                        fontSize="20px"
                        icon={<EditIcon />}
                        onClick={() => handleEdit(element.id)}
                      />
                    </Flex>
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </Center>
      <Paginator onPageChange={handlePageChange} pageCount={pageCount} />
    </>
  )
}

export default NewsListEdit

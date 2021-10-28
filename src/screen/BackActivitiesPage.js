import React, { useState, useEffect } from 'react'
import BackTestimonialCard from '../components/Testimonials/BackTestimonialCard'
import { sendRequest } from '../utils/sendRequest'
import Paginator from '../components/Paginator'
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
  Heading,
  Stack,
} from '@chakra-ui/react'
import { AddIcon, ArrowBackIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { useHistory } from 'react-router-dom'
const BackActivitiesPage = () => {
  const [allData, setAllData] = useState([])
  const [items, setItems] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const limit = 8
  const history = useHistory()
  useEffect(() => {
    const getActivities = async () => {
      const res = await sendRequest('get', '/activities')
      setAllData(res.rows)
      const total = res.count
      setPageCount(Math.ceil(total / limit))
      setItems(res.rows.slice(0, limit))
    }
    getActivities()
  }, [pageCount])

  const handleDelete = id => {
    // console.log(id)
  }
  const handleEdit = id => {
    // console.log(id)
  }

  const renderData = () => {
    return items.map(item => {
      return (
        <BackTestimonialCard
          name={item.name}
          key={item.id}
          handleDelete={() => handleDelete(item.id)}
          handleEdit={() => handleEdit(item.id)}
        />
      )
    })
  }

  const handlePageClick = async data => {
    let currentPage = data.selected * limit
    setItems(allData.slice(currentPage, currentPage + limit))
  }

  return (
    <div>
      <Center minH='70vh' display='flex' flexDirection='column'>
        <Stack
          width='70%'
          align='center'
          display='flex'
          flexDir='row'
          justifyContent='space-between'
        >
          <IconButton
            icon={<ArrowBackIcon />}
            colorScheme='gray'
            width='2rem'
            onClick={() => history.goBack()}
          />
          <Heading>Listado de Novedades</Heading>
          <IconButton
            icon={<AddIcon />}
            colorScheme='blue'
            onClick={() => history.push('/backoffice/novedades')}
          />
        </Stack>
        <Table
          bg='white'
          rounded='lg'
          boxShadow='lg'
          margin='10px 0'
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
            {/* {itemsToShow?.map(element => {
              return (
                <Tr key={element.id} _hover={{ boxShadow: 'lg' }}>
                  <Td>{element.name}</Td>
                  <Td padding='10px'>
                    <Image src={element.image} maxH='130px' />
                  </Td>
                  <Td display={['none', 'table-cell']}>
                    {element.createdAt.slice(8, 10)}/
                    {element.createdAt.slice(5, 7)}
                  </Td>
                  <Td>
                    <Flex direction='column' maxW='50px'>
                      <IconButton
                        variant='outline'
                        margin='10px'
                        aria-label='Borrar novedad'
                        fontSize='20px'
                        icon={<DeleteIcon />}
                        onClick={() => handleDelete(element.id)}
                      />
                      <IconButton
                        variant='outline'
                        margin='10px'
                        aria-label='Editar novedad'
                        fontSize='20px'
                        icon={<EditIcon />}
                        onClick={() => handleEdit(element.id)}
                      />
                    </Flex>
                  </Td>
                </Tr>
              )
            })} */}
          </Tbody>
        </Table>
      </Center>
      <Paginator onPageChange={handlePageClick} pageCount={pageCount} />
    </div>
  )
}

export default BackActivitiesPage

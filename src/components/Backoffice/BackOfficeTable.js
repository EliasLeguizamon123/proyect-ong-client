import React from 'react'
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
  Heading,
  Stack,
} from '@chakra-ui/react'
import {
  AddIcon,
  ArrowBackIcon,
  DeleteIcon,
  EditIcon,
  ViewIcon,
} from '@chakra-ui/icons'
import Paginator from '../../components/Paginator'

const BackOfficeTable = ({
  limit,
  allItems,
  itemsToShow,
  pageCount,
  handleDelete,
  handleEdit,
  formRoute,
  tableHead,
  title,
  setItemsToShow,
  contacts,
  users,
}) => {
  let history = useHistory()

  const handlePageChange = async ({ selected }) => {
    const start = selected * limit
    setItemsToShow(allItems.slice(start, start + limit))
  }

  return (
    <>
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
          <Heading>Listado de {title}</Heading>
          {!contacts && (
            <IconButton
              icon={<AddIcon />}
              colorScheme='blue'
              onClick={() => history.push(`/backoffice/${formRoute}`)}
            />
          )}
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
              {tableHead.map((thead, i) => {
                if (i === 2) {
                  return (
                    <Th key={i} display={['none', 'table-cell']}>
                      {thead}
                    </Th>
                  )
                }
                return <Th key={i}>{thead}</Th>
              })}
            </Tr>
          </Thead>
          <Tbody>
            {itemsToShow?.map(element => {
              return (
                <Tr key={element.id} _hover={{ boxShadow: 'lg' }}>
                  <Td>{element.name}</Td>
                  <Td padding='10px'>
                    {contacts || users ? (
                      element.email
                    ) : (
                      <Image src={element.image} maxH='130px' />
                    )}
                  </Td>
                  <Td display={['none', 'table-cell']}>
                    {contacts
                      ? element.phone
                      : `${element.createdAt.slice(
                          8,
                          10
                        )}-${element.createdAt.slice(5, 7)}`}
                  </Td>
                  <Td>
                    <Flex direction='column' maxW='50px'>
                      <IconButton
                        variant='outline'
                        margin='10px'
                        fontSize='20px'
                        icon={<DeleteIcon />}
                        onClick={() => handleDelete(element.id)}
                      />
                      <IconButton
                        variant='outline'
                        margin='10px'
                        fontSize='20px'
                        icon={!contacts ? <EditIcon /> : <ViewIcon />}
                        onClick={() =>
                          handleEdit(contacts ? element : element.id)
                        }
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

export default BackOfficeTable

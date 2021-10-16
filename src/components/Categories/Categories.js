import React, { useEffect, useState } from 'react'
import CategoriesCard from './CategoriesCard'
import { sendRequest } from '../../utils/sendRequest'
import { Center, Spinner, Heading, Text, Container } from '@chakra-ui/react'
import { alertError, Swal } from '../../utils/alerts'

const Categories = () => {
  const [categories, setCategories] = useState([])
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await sendRequest('get', '/categories')
        setCategories(response)
      } catch (error) {}
    }
    getCategories()
  }, [update])

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
        await sendRequest('delete', `/categories/${id}`)
        setUpdate(true)
        Swal.fire('Eliminada!', 'Categoría eliminada correctamente.', 'success')
        setUpdate(false)
      } catch (error) {
        alertError('Error', error.message)
      }
    }
  }

  return (
    <Container id="categories" borderRadius={'lg'} boxShadow={'lg'}>
      <Center h="10rem">
        <Heading size="lg" fontSize="3rem">
          <Text as={'span'} background={'#DB5752'}>
            Cat
          </Text>
          <Text as={'span'} background={'#FAFA88'}>
            ego
          </Text>
          <Text as={'span'} background={'#9AC9FB'}>
            rias
          </Text>
        </Heading>
      </Center>
      {categories ? (
        categories.map((category) => (
          <CategoriesCard
            handleDelete={() => handleDelete(category.id)}
            name={category.name}
            description={category.description}
            key={category.id}
          />
        ))
      ) : (
        <Center h="10rem">
          <Spinner size="xl" />
        </Center>
      )}
    </Container>
  )
}

export default Categories

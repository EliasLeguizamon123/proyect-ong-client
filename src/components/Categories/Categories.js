import React, { useEffect, useState } from 'react'
import CategoriesCard from './CategoriesCard'
import { sendRequest } from '../../utils/sendRequest'
import { Center, Spinner, Heading, Text } from '@chakra-ui/react'

const Categories = () => {
  const [categories, setCategories] = useState()

  useEffect(() => {
    const getCategories = async () => {
      const response = await sendRequest('get', '/categories')
      if (response) setCategories(response)
    }
    getCategories()
  }, [])

  return (
    <div id="categories">
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
    </div>
  )
}

export default Categories

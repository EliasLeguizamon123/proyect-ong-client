import React, { useEffect, useState } from 'react'
import { Center, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import Paginator from '../components/Paginator'
import TestimonialsCard from '../components/Testimonials/TestimonialsCard'
import { sendRequest } from '../utils/sendRequest'

const TestimonialsPage = () => {
  const [fetchAllTestimonials, setFetchAllTestimonials] = useState([])
  const [items, setItems] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const limit = 8

  useEffect(() => {
    const getTestimonials = async () => {
      const res = await sendRequest('get', `/testimonials`)
      const total = res.count
      setPageCount(Math.ceil(total / limit))
      setFetchAllTestimonials(res.rows)
      setItems(res.rows.slice(0, limit))
    }
    getTestimonials()
  }, [pageCount])

  const renderCards = () => {
    return items.map(item => {
      return (
        <TestimonialsCard key={item.id} title={item.name} image={item.image} />
      )
    })
  }

  const handlePageClick = data => {
    let currentPage = data.selected * limit
    setItems(fetchAllTestimonials.slice(currentPage, currentPage + limit))
  }

  return (
    <>
      <Center h='25vh' marginBottom='2vh'>
        <Heading size='lg' fontSize='3rem'>
          <Text as={'span'} background={'#DB5752'}>
            Test
          </Text>
          <Text as={'span'} background={'#FAFA88'}>
            imo
          </Text>
          <Text as={'span'} background={'#9AC9FB'}>
            nios
          </Text>
        </Heading>
      </Center>
      <SimpleGrid columns={{ sm: 1, md: 2 }}>{renderCards()}</SimpleGrid>
      <Paginator onPageChange={handlePageClick} pageCount={pageCount} />
    </>
  )
}

export default TestimonialsPage

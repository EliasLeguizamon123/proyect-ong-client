import React, { useEffect, useState } from 'react'
import { SimpleGrid } from '@chakra-ui/react'
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
        <TestimonialsCard
          key={item.name}
          title={item.name}
          image={item.image}
        />
      )
    })
  }

  const handlePageClick = async data => {
    let currentPage = data.selected * limit
    setItems(fetchAllTestimonials.slice(currentPage, currentPage + limit))
  }

  return (
    <>
      <SimpleGrid columns={{ sm: 1, md: 2 }}>{renderCards()}</SimpleGrid>
      <Paginator onPageChange={handlePageClick} pageCount={pageCount} />
    </>
  )
}

export default TestimonialsPage

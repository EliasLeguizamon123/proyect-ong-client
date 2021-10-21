import React, { useState, useEffect } from 'react'
import BackTestimonialCard from '../components/TestimonialsForm/BackTestimonialCard'
import { sendRequest } from '../utils/sendRequest'
import Paginator from '../components/Paginator'
import { Heading } from '@chakra-ui/react'

const BackTestimonialsPage = () => {
  const [allData, setAllData] = useState([])
  const [items, setItems] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const limit = 8

  useEffect(() => {
    const getTestimonials = async () => {
      const res = await sendRequest('get', '/testimonials')
      setAllData(res)
      const total = allData.length
      setPageCount(Math.ceil(total / limit))
      setItems(res.slice(0, limit))
    }
    getTestimonials()
  }, [allData.length, pageCount])

  const handleDelete = (id) => {
    // console.log(id)
  }
  const handleEdit = (id) => {
    // console.log(id)
  }

  const renderData = () => {
    return items.map((item) => {
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

  const handlePageClick = async (data) => {
    let currentPage = data.selected * limit
    setItems(allData.slice(currentPage, currentPage + limit))
  }

  return (
    <div>
      <Heading textAlign="center" p={4}>
        Listado de Testimonios
      </Heading>
      {renderData()}
      <Paginator onPageChange={handlePageClick} pageCount={pageCount} />
    </div>
  )
}

export default BackTestimonialsPage

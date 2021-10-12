import React, { useEffect, useState } from 'react'
import { SimpleGrid } from '@chakra-ui/react'
import Paginator from '../components/Paginator'
import NewsCard from '../components/NewsCard'
import { Link } from 'react-router-dom'
import { sendRequest } from '../utils/sendRequest'

const NewsPage = () => {
  const [items, setItems] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const limit = 8

  useEffect(() => {
    const getNews = async () => {
      const res = await sendRequest('get', `/news?skip=0&limit=${limit}`)
      const total = res.count
      setPageCount(Math.ceil(total / limit))
      setItems(res.rows)
    }
    getNews()
  }, [pageCount])

  const fetchPosts = async (offSet) => {
    const res = await sendRequest('get', `/news?skip=${offSet}&limit=${limit}`)
    return res.rows
  }

  const renderCards = () => {
    return items.map((item) => {
      return (
        <Link to={`/novedades/${item.id}`} key={item.id}>
          <NewsCard title={item.name} image={item.image} />
        </Link>
      )
    })
  }

  const handlePageClick = async (data) => {
    let offSet = data.selected * limit
    const newsFromServer = await fetchPosts(offSet)
    setItems(newsFromServer)
  }

  return (
    <>
      <SimpleGrid columns={{ sm: 1, md: 2 }}>{renderCards()}</SimpleGrid>
      <Paginator onPageChange={handlePageClick} pageCount={pageCount} />
    </>
  )
}

export default NewsPage

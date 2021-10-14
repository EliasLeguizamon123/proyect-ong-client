import React, { useEffect, useState } from 'react'
import { SimpleGrid } from '@chakra-ui/react'
import Paginator from '../components/Paginator'
import NewsCard from '../components/News/NewsCard'
import { Link } from 'react-router-dom'
import { sendRequest } from '../utils/sendRequest'

const NewsPage = () => {
  const [fetchAllNews, setFetchAllNews] = useState([])
  const [items, setItems] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const limit = 8

  useEffect(() => {
    const getNews = async () => {
      const res = await sendRequest('get', `/news`)
      const total = res.count
      setPageCount(Math.ceil(total / limit))
      setFetchAllNews(res.rows)
      setItems(res.rows.slice(0, limit))
    }
    getNews()
  }, [pageCount])

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
    let currentPage = data.selected * limit
    setItems(fetchAllNews.slice(currentPage, currentPage + limit))
  }

  return (
    <>
      <SimpleGrid columns={{ sm: 1, md: 2 }}>{renderCards()}</SimpleGrid>
      <Paginator onPageChange={handlePageClick} pageCount={pageCount} />
    </>
  )
}

export default NewsPage

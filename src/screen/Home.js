import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SlideShow from '../components/SlideShow'
import { sendRequest } from '../utils/sendRequest'
import NewsCard from '../components/News/NewsCard'
import { Heading } from '@chakra-ui/react'

export default function Home() {
  const [news, setNews] = useState([])
  const [welcome, setWelcome] = useState('')
  const getMessage = () => {
    sendRequest('GET', '/organizations/1').then((res) => {
      if (res) {
        setWelcome(res[0].welcomeText)
      }
    })
  }
  const getNews = () =>
    sendRequest('GET', '/news').then((res) => {
      if (res) {
        const newArray = res.rows.slice(0, 4)
        setNews(newArray)
      }
    })

  useEffect(() => {
    getNews()
    getMessage()
  }, [])
  return (
    <div>
      <SlideShow />
      <Heading fontSize="4xl" my="10px">
        {welcome}
      </Heading>
      <SlideShow />
      {news.map((neew) => (
        <Link key={neew.id} to={`/novedades/${neew.id}`}>
          <NewsCard title={neew.name} image={neew.image} />
        </Link>
      ))}
    </div>
  )
}

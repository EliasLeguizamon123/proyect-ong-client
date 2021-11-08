import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SlideShow from '../components/SlideShow'
import { sendRequest } from '../utils/sendRequest'
import NewsCardBox from '../components/News/NewsCardBox'
import { Heading, Text, SimpleGrid } from '@chakra-ui/react'

export default function Home () {
  const [news, setNews] = useState([])
  const [testimonies, setTestimonies] = useState([])
  const [welcome, setWelcome] = useState('')
  const getMessage = () => {
    sendRequest('GET', '/organizations/1').then(res => {
      if (res) {
        setWelcome(res.welcomeText)
      }
    })
  }
  const getNews = () =>
    sendRequest('GET', '/news').then(res => {
      if (res) {
        const newArray = res.rows.slice(0, 4)
        setNews(newArray)
      }
    })
  const getTestimonies = () =>
    sendRequest('GET', '/testimonials').then(res => {
      if (res) {
        const newArray = res.rows.slice(0, 4)
        setTestimonies(newArray)
      }
    })

  useEffect(() => {
    getNews()
    getTestimonies()
    getMessage()
  }, [])
  return (
    <div>
      <SlideShow />
      <Heading fontSize='38px' align='center' my='10px'>
        {welcome}
      </Heading>
      {news && (
        <Text fontSize='25px' align='center' my='20px'>
          Últimas novedades
        </Text>
      )}
      {news && (
        <SimpleGrid
          columns={{ sm: 1, md: 2, lg: 4 }}
          justifyContent='center'
          alignItems='center'
          direction='row'
        >
          {news.map(neew => (
            <Link key={neew.id} to={`/novedades/${neew.id}`}>
              <NewsCardBox title={neew.name} IMAGE={neew.image} />
            </Link>
          ))}
        </SimpleGrid>
      )}

      {testimonies && (
        <Text fontSize='25px' align='center' my='20px'>
          Últimos Testimonios
        </Text>
      )}
      {testimonies && (
        <SimpleGrid
          columns={{ sm: 1, md: 2, lg: 4 }}
          justifyContent='center'
          alignItems='center'
          direction='row'
        >
          {testimonies.map(testimony => (
            <NewsCardBox
              key={testimony.id}
              title={testimony.name}
              IMAGE={testimony.image}
            />
          ))}
        </SimpleGrid>
      )}
    </div>
  )
}

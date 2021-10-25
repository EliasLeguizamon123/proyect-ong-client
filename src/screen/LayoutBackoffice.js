import React from 'react'

import { SimpleGrid, Center } from '@chakra-ui/react'
import BackofficeCard from '../components/BackofficeCard'

import newsImg from '../assets/news.jpg'

const cardList = [
  {
    title: 'Novedades',
    img: newsImg,
    path: '/backoffice/listado-novedades/',
  },
  {
    title: 'Actividades',
    img: newsImg,
    path: '/backoffice/activities-list',
  },
  {
    title: 'Categorías',
    img: newsImg,
    path: '/backoffice/categorias',
  },
  {
    title: 'Testimonios',
    img: newsImg,
    path: '/backoffice/testimonials-list',
  },
  {
    title: 'Organización',
    img: newsImg,
    path: '/backoffice/edit-organization',
  },
  {
    title: 'Slides',
    img: newsImg,
    path: '/backoffice/slides',
  },
  {
    title: 'Usuarios',
    img: newsImg,
    path: '/backoffice/usuarios',
  },
  {
    title: 'Miembros',
    img: newsImg,
    path: '/backoffice/miembros',
  },
]

const LayoutBackoffice = () => {
  return (
    <>
      <Center>
        <SimpleGrid columns={[2, 2, 4, 4, 4]}>
          {cardList.map((cardInfo, index) => (
            <BackofficeCard {...cardInfo} key={index} />
          ))}
        </SimpleGrid>
      </Center>
    </>
  )
}

export default LayoutBackoffice

import React from 'react'

import { SimpleGrid, Center, useColorMode, Box } from '@chakra-ui/react'
import BackofficeCard from '../../components/BackofficeCard'
import newsImg from '../../assets/backnews.png'
import activitiesImg from '../../assets/activities.png'
import categoriesImg from '../../assets/categories.png'
import testimonialsImg from '../../assets/testimonials.png'
import organizationImg from '../../assets/organization.png'
import slidesImg from '../../assets/slides.png'
import usersImg from '../../assets/users.png'
import membersImg from '../../assets/members.png'
import emailImg from '../../assets/email.png'

const cardList = [
  {
    title: 'Novedades',
    img: newsImg,
    path: '/backoffice/listado-novedades',
  },
  {
    title: 'Actividades',
    img: activitiesImg,
    path: '/backoffice/listado-actividades',
  },
  {
    title: 'Categorías',
    img: categoriesImg,
    path: '/backoffice/listado-categorias',
  },
  {
    title: 'Testimonios',
    img: testimonialsImg,
    path: '/backoffice/listado-testimonios',
  },
  {
    title: 'Organización',
    img: organizationImg,
    path: '/backoffice/edit-organization',
  },
  {
    title: 'Slides',
    img: slidesImg,
    path: '/backoffice/listado-slides',
  },
  {
    title: 'Usuarios',
    img: usersImg,
    path: '/backoffice/listado-usuarios',
  },
  {
    title: 'Miembros',
    img: membersImg,
    path: '/backoffice/listado-miembros',
  },
  {
    title: 'Contactos',
    img: emailImg,
    path: '/backoffice/listado-contactos',
  },
]

const LayoutBackoffice = () => {
  const { colorMode } = useColorMode()
  return (
    <>
        <SimpleGrid 
          columns={[2, 2, 3, 3, 3]} 
          bg={colorMode === "light" ? "container" : "darkBg"} 
          p={4} 
          spacing={3}
          
        >
          {cardList.map((cardInfo, index) => (
            <BackofficeCard {...cardInfo} key={index} />
          ))}
        </SimpleGrid>
    </>
  )
}

export default LayoutBackoffice

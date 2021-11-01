import React from 'react'

import { SimpleGrid, Center, useColorMode } from '@chakra-ui/react'
import BackofficeCard from '../../components/BackofficeCard'
import {
  BiNews,
  FaListAlt,
  FaThList,
  FaComments,
  GiOrganigram,
  FaFileImage,
  FaUsers,
  FaUserFriends,
  ImMail,
} from 'react-icons/all'

const cardList = [
  {
    title: 'Novedades',
    icon: BiNews,
    path: '/backoffice/listado-novedades',
  },
  {
    title: 'Actividades',
    icon: FaListAlt,
    path: '/backoffice/listado-actividades',
  },
  {
    title: 'Categorías',
    icon: FaThList,
    path: '/backoffice/listado-categorias',
  },
  {
    title: 'Testimonios',
    icon: FaComments,
    path: '/backoffice/listado-testimonios',
  },
  {
    title: 'Organización',
    icon: GiOrganigram,
    path: '/backoffice/edit-organization',
  },
  {
    title: 'Slides',
    icon: FaFileImage,
    path: '/backoffice/listado-slides',
  },
  {
    title: 'Usuarios',
    icon: FaUsers,
    path: '/backoffice/listado-usuarios',
  },
  {
    title: 'Miembros',
    icon: FaUserFriends,
    path: '/backoffice/listado-miembros',
  },
  {
    title: 'Contactos',
    icon: ImMail,
    path: '/backoffice/listado-contactos',
  },
]

const LayoutBackoffice = () => {
  const { colorMode } = useColorMode()
  return (
    <Center>
      <SimpleGrid
        columns={[2, 2, 3, 3, 3]}
        bg={colorMode === 'light' ? 'container' : 'darkBg'}
        p={4}
        spacing={5}
        alignContent='center'
      >
        {cardList.map((cardInfo, index) => (
          <BackofficeCard {...cardInfo} key={index} />
        ))}
      </SimpleGrid>
    </Center>
  )
}

export default LayoutBackoffice

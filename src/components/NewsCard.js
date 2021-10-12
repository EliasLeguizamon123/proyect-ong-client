import React from 'react'
import {
  Image,
  Heading,
  SimpleGrid,
  useColorModeValue,
  Center,
} from '@chakra-ui/react'

const NewsCard = ({ title, image }) => {
  return (
    <SimpleGrid
      sx={{
        _hover: { bg: '#e1e1e1' },
        transition: '.3s ease-in-out',
        margin: '1rem',
      }}
      columns={{ sm: 1, md: 2 }}
      rounded="lg"
      bg={useColorModeValue('white', 'gray.700')}
      boxShadow="lg"
      p={4}
    >
      <Center>
        <Heading>{title}</Heading>
      </Center>
      <Center>
        <Image
          rounded="lg"
          src={image}
          fallbackSrc="https://via.placeholder.com/200"
        />
      </Center>
    </SimpleGrid>
  )
}

export default NewsCard

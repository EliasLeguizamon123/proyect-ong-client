import React from 'react'
import { Heading, Text, Stack, Container } from '@chakra-ui/react'

const CategoriesCard = ({ name, description }) => {
  return (
    <Container maxW={'8xl'}>
      <Stack spacing={{ base: 8, md: 10 }} py={{ base: 10, md: 10 }}>
        <Heading
          fontWeight={600}
          fontSize={{ base: '1xl', sm: '1xl', md: '3xl' }}
          lineHeight={'10%'}
        >
          {name}
        </Heading>
        <Text fontSize="1.3rem" color={'gray.500'}>
          {description}
        </Text>
      </Stack>
    </Container>
  )
}

export default CategoriesCard

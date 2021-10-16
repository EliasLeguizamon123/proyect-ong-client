import React from 'react'
import {
  Heading,
  Stack,
  Container,
  Divider,
  IconButton,
} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'

const CategoriesCard = ({ name, handleDelete }) => {
  return (
    <Container sx={{ _hover: { borderRadius: 'lg', boxShadow: 'lg' } }}>
      <Stack
        justifyContent={'space-between'}
        direction={'row'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 10, md: 10 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: '1xl', sm: '1xl', md: '3xl' }}
          lineHeight={'10%'}
        >
          {name}
        </Heading>
        <IconButton
          aria-label="Delete"
          colorScheme={'red'}
          icon={<DeleteIcon />}
          onClick={handleDelete}
        />
      </Stack>
      <Divider h={'1'} />
    </Container>
  )
}

export default CategoriesCard

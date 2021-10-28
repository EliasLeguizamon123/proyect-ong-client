import React from 'react'
import {
  Heading,
  Stack,
  Container,
  Divider,
  IconButton,
  Flex,
} from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'

const BackTestimonialCard = ({ name, handleDelete, handleEdit }) => {
  return (
    <Container sx={{ _hover: { borderRadius: 'lg', boxShadow: 'lg' } }} maxW="container.md">
      <Stack
        justifyContent={'space-between'}
        direction={'row'}
        spacing={{ base: 5, md: 10 }}
        py={{ base: 10, md: 10 }}
      >
        <Heading 
          isTruncated
          fontSize={{ base: '2x1', sm: '1xl', md: '3xl' }}
          lineHeight={'70%'}
          maxWidth={'90%'}
        >
          {name}
        </Heading>
        <Flex direction='column' maxW='50px'>
          <IconButton
            variant='outline'
            margin='10px'
            aria-label='Borrar novedad'
            fontSize='20px'
            icon={<DeleteIcon />}
          />
          <IconButton
            variant='outline'
            margin='10px'
            aria-label='Editar novedad'
            fontSize='20px'
            icon={<EditIcon />}
          />
        </Flex>
      </Stack>
      <Divider h={'1'} />
    </Container>
  )
}

export default BackTestimonialCard

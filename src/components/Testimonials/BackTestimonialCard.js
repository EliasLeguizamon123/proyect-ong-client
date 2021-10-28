import React from 'react'
import {
  Heading,
  Stack,
  Container,
  Divider,
  IconButton,
} from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'

const BackTestimonialCard = ({ name, handleDelete, handleEdit }) => {
  return (
    <Container sx={{ _hover: { borderRadius: 'lg', boxShadow: 'lg' } }}>
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
        <Stack direction={'row'}>
          <IconButton
            aria-label="Edit"
            colorScheme={'blue'}
            icon={<EditIcon />}
            onClick={handleEdit}
          />
          <IconButton
            aria-label="Delete"
            colorScheme={'red'}
            icon={<DeleteIcon />}
            onClick={handleDelete}
          />
        </Stack>
      </Stack>
      <Divider h={'1'} />
    </Container>
  )
}

export default BackTestimonialCard

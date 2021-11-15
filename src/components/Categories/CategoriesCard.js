import React from 'react'
import {
  Heading,
  Stack,
  Center,
  Divider,
  IconButton,
  Text
} from '@chakra-ui/react'
import { DeleteIcon, ChevronRightIcon} from '@chakra-ui/icons'

const CategoriesCard = ({ name, handleDelete, description }) => {
  return (
    <Center sx={{ _hover: { borderRadius: 'xl', boxShadow: 'xl' } }}>
      <ChevronRightIcon width="10%" w={10} h={10} color="red.500" />
      <Stack
        width="65%"
        spacing={{ base: 5, md: 5 }}
        py={{ base: 1, md: 1 }}
      >
        <Heading
          marginTop="5%"
          fontWeight={600}
          fontSize="2xl"
        >
          {name}

        </Heading>
        <Text color="gray.500" isTruncated>
          {description}
        </Text>
        <Divider h={'3'} />
      </Stack>
      <IconButton
        aria-label="Delete"
        colorScheme={'red'}
        icon={<DeleteIcon />}
        onClick={handleDelete}
        width="5%"
        marginLeft="20%"
      />
    </Center>
  )
}

export default CategoriesCard

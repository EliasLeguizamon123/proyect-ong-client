import {
  Box,
  Center,
  Heading,
  Image,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { sendRequest } from '../utils/sendRequest'
import parse from 'html-react-parser'

const NewsDetail = (props) => {
  const [novedad, setNovedad] = useState({})

  useEffect(() => {
    const id = props.match.params.id
    const fetchNewById = async () => {
      const res = await sendRequest('get', `/news/${id}`)

      setNovedad(res)
    }
    fetchNewById()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Center p={6}>
      <Stack
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow="lg"
        p={6}
        borderRadius={'lg'}
      >
        <Image
          maxH={'50vh'}
          borderRadius={6}
          src={novedad.image}
          fallbackSrc={'https://via.placeholder.com/200'}
          sx={{
            _hover: { transform: 'scale(1.1)' },
            transition: '.5s ease-in-out',
          }}
        />
        <Heading textAlign="center">{novedad.name}</Heading>
        <Box>{novedad.content ? parse(novedad.content) : null}</Box>
      </Stack>
    </Center>
  )
}

export default NewsDetail

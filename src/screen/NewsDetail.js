import {
  Box,
  Center,
  Heading,
  IconButton,
  Image,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { sendRequest } from '../utils/sendRequest'
import parse from 'html-react-parser'
import { useHistory } from 'react-router-dom'
import { ArrowBackIcon } from '@chakra-ui/icons'

const NewsDetail = props => {
  const [novedad, setNovedad] = useState({})
  const history = useHistory()

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
    <Box>
      <IconButton
        icon={<ArrowBackIcon />}
        bg='#9AC9FB'
        color='white'
        display={['none', 'none', 'flex']}
        width='2rem'
        onClick={() => history.goBack()}
        marginBottom='-12'
        marginLeft='5'
      />
      <Heading textAlign='center'>{novedad.name}</Heading>
      <Center p={6}>
        <Stack
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow='lg'
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
            marginBottom='30px'
          />

          <Box marginTop='2rem'>
            {novedad.content ? parse(novedad.content) : null}
          </Box>
        </Stack>
      </Center>
    </Box>
  )
}

export default NewsDetail

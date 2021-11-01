import {
  Center,
  Heading,
  Image,
  Stack,
  Box,
  useColorModeValue,
  IconButton,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import parse from 'html-react-parser'
import { useParams, useHistory } from 'react-router-dom'
import { sendRequest } from '../utils/sendRequest'
import { alertError } from '../utils/alerts'
import Spinner from '../utils/Spinner'
import { ArrowBackIcon } from '@chakra-ui/icons'

const ActivityDetail = props => {
  const { id } = useParams()
  const [activity, setActivity] = useState(null)
  const [loading, setLoading] = useState(true)
  const history = useHistory()

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await sendRequest('get', `/activities/${id}`)
        setActivity(response)
      } catch (error) {
        alertError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchActivity()
  }, [id])

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
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Heading textAlign='center'>{activity.name}</Heading>
          <Center p={6}>
            <Stack
              bg={'gray.700'}
              boxShadow='lg'
              p={6}
              borderRadius={'lg'}
              maxW='60vW'
            >
              <Image
                maxH={'50vh'}
                borderRadius={6}
                src={activity.image}
                fallbackSrc={'https://via.placeholder.com/200'}
                sx={{
                  _hover: { transform: 'scale(1.1)' },
                  transition: '.5s ease-in-out',
                }}
                marginBottom='30px'
              />

              <Box marginTop='2rem'>
                {activity.content ? parse(activity.content) : null}
              </Box>
            </Stack>
          </Center>
        </>
      )}
    </Box>
  )
}

export default ActivityDetail

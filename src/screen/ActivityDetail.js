import {
  Center,
  Heading,
  Image,
  Stack,
  Box,
  useColorModeValue,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import parse from 'html-react-parser'
import { useParams } from 'react-router-dom'
import { sendRequest } from '../utils/sendRequest'
import { alertError } from '../utils/alerts'
import Spinner from '../utils/Spinner'

const ActivityDetail = (props) => {
  const { id } = useParams()
  const [activity, setActivity] = useState(null)
  const [loading, setLoading] = useState(true)

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
    <Center p={6}>
      <Stack
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow="lg"
        p={6}
        borderRadius={'lg'}
      >
        {loading ? (
          <Spinner />
        ) : (
          activity && (
            <>
              <Image
                maxH={'50vh'}
                borderRadius={6}
                src={activity.image}
                objectFit="contain"
                fallbackSrc={'https://via.placeholder.com/200'}
                sx={{
                  _hover: { transform: 'scale(1.1)' },
                  transition: '.5s ease-in-out',
                }}
              />
              <Heading textAlign="center">{activity.name}</Heading>
              <Box maxW="550px">{parse(activity.content)}</Box>
            </>
          )
        )}
      </Stack>
    </Center>
  )
}

export default ActivityDetail

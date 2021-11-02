import React, { useEffect, useState } from 'react'
import { sendRequest } from '../../utils/sendRequest'
import { Center, Heading, Text, Wrap, Box } from '@chakra-ui/react'
import Spinner from '../../utils/Spinner'
import MemberCard from './MemberCard'

const Members = () => {
  const [allMembers, setAllMembers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getMembers = async () => {
      const response = await sendRequest('get', '/members')
      if (response) setAllMembers(response.rows)
    }
    getMembers()
    setLoading(false)
  }, [])

  const handleMembers = () => {
    return allMembers.map(member => {
      return (
        <MemberCard key={member.id} name={member.name} image={member.image} />
      )
    })
  }

  return (
    <Box spacing='20vh'>
      <Center h='25vh' marginBottom='2vh'>
        <Heading size='lg' fontSize='3rem'>
          <Text as={'span'} background={'#DB5752'}>
            Mi
          </Text>
          <Text as={'span'} background={'#FAFA88'}>
            emb
          </Text>
          <Text as={'span'} background={'#9AC9FB'}>
            ros
          </Text>
        </Heading>
      </Center>
      <Center marginBottom='20vh'>
        {loading ? (
          <Spinner />
        ) : (
          <Wrap marginLeft='15vh' marginRight='15vh'>
            {handleMembers()}
          </Wrap>
        )}
      </Center>
    </Box>
  )
}

export default Members

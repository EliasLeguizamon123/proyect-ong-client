import React, { useEffect, useState } from 'react'
import { sendRequest } from '../../utils/sendRequest'
import { Center, Heading, Text, Wrap, Box } from '@chakra-ui/react'
import Spinner from '../../utils/Spinner'
import MemberCard from './MemberCard'

const Members = () => {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getMembers = async () => {
      const response = await sendRequest('get', '/members')
      if (response) setMembers(response)
    }
    getMembers()
    setLoading(false)
  }, [])

  return (
    <Box spacing="20vh">
      <Center h="25vh" marginBottom="5vh">
        <Heading size="lg" fontSize="3rem">
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
      <Center marginBottom="20vh">
        {loading && members.length > 0 ? (
          <Spinner />
        ) : (
          <Wrap spacing="9vh" marginLeft="15vh" marginRight="15vh">
            {members.map((member) => (
              <MemberCard
                key={member.id}
                name={member.name}
                image={member.image}
              />
            ))}
          </Wrap>
        )}
      </Center>
    </Box>
  )
}

export default Members

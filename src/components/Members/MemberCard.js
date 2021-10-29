import React from 'react'
import { Avatar, Text, Stack, Center } from '@chakra-ui/react'

const MemberCard = ({ name, image}) => {
  const fullname = name.split(' ')
  return (
    <Stack width="27vh" boxShadow="md" p="6" rounded="md" > 
      <Avatar name={name} size="2xl" src={image} width="20vh"/>
      {fullname.map((string) => (
        <Center key={fullname.indexOf(string)}>
        <Text fontSize="3.5vh">
          {string}
        </Text>
        </Center>
      ))}
    </Stack>
  )
}

export default MemberCard

import React from 'react'
import { Avatar, Text, Stack } from '@chakra-ui/react'

const MemberCard = ({ name, image }) => {
  const fullname = name.split(' ')
  return (
    <Stack>
      <Avatar name={name} size="2xl" src={image} />
      {fullname.map((string) => (
        <Text key={string} as={'h1'} size="lg" fontSize="2rem">
          {string}
        </Text>
      ))}
    </Stack>
  )
}

export default MemberCard

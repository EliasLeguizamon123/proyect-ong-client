import React from 'react'
import { Link } from 'react-router-dom'

import { Image, Heading, Center, Box } from '@chakra-ui/react'

const BackofficeCard = ({ title, path, img }) => {
  return (
    <Link to={path}>
      <Box
        height={['36vw', '40vw', '18vw', '18vw', '18vw']}
        width={['36vw', '40vw', '18vw', '18vw', '18vw']}
        margin="30px"
        boxShadow="lg"
        rounded="lg"
        cursor="pointer"
        sx={{
          _hover: { transform: 'translateY(10px)', color: 'blue' },
          transition: '.3s ease',
        }}
      >
        <Center>
          <Heading size="md">{title}</Heading>
        </Center>
        <Center>
          <Image maxH="80%" maxW="80%" src={img} />
        </Center>
      </Box>
    </Link>
  )
}

export default BackofficeCard

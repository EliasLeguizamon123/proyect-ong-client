import React from 'react'
import { Link } from 'react-router-dom'

import { Image, Heading, Center, Box } from '@chakra-ui/react'

const BackofficeCard = ({ title, path, img }) => {
  return (
    <Link to={path}>
      <Box
        bg='white'
        display='flex'
        flexDirection='column'
        justifyContent='space-around'
        height={['20vw', '20vw', '15vw']}
        width={['20vw', '20vw', '15vw']}
        margin='30px'
        boxShadow='lg'
        rounded='lg'
        cursor='pointer'
        sx={{
          _hover: { transform: 'translateY(10px)', color: 'blue' },
          transition: '.3s ease',
        }}
      >
        <Center>
          <Heading
            fontWeight='semibold'
            fontSize={['sm', 'md', 'md']}
            color='#9AC9FB'
          >
            {title}
          </Heading>
        </Center>
        <Center>
          <Image maxH='60%' maxW='60%' src={img} />
        </Center>
        <Center></Center>
      </Box>
    </Link>
  )
}

export default BackofficeCard

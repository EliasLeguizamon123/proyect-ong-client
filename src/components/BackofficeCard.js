import React from 'react'
import { Link } from 'react-router-dom'

import { Heading, Center, Box, useColorMode, Icon } from '@chakra-ui/react'

const BackofficeCard = ({ title, path, icon }) => {
  const { colorMode } = useColorMode()
  return (
    <Link to={path}>
      <Box
        bg={colorMode === 'light' ? 'container' : 'darkGray'}
        display='flex'
        flexDirection='column'
        justifyContent='space-around'
        height={['20vw', '20vw', '10vw']}
        width={['20vw', '20vw', '10vw']}
        margin='0 30px'
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
            color={colorMode === 'light' ? 'primary' : 'secondary'}
          >
            {title}
          </Heading>
        </Center>
        <Center>
          <Icon as={icon} fontSize={['2rem', '2.5rem', '3rem']} />
        </Center>
      </Box>
    </Link>
  )
}

export default BackofficeCard

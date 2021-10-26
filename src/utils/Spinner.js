import React from 'react'
import Loader from 'react-loader-spinner'
import { Box, Text } from '@chakra-ui/react'

export default function Spinner({
  type,
  color = 'C0C0C0',
  height,
  width,
  timeout = 4000  //4 seg
}) {
  return (
    <Box align="center" justify="center" spacing={4} margin="120px">
      <Loader
        type={type}
        color={color}
        height={height}
        width={width}
        timeout={timeout}
      />
      <Text fontSize="xl" >Cargando ...</Text>
    </Box>
  )    
}

import React from 'react'
import { Container, Box , useColorMode} from '@chakra-ui/react'
import './App.css'
import Router from './router'

function App() {
  const { colorMode } = useColorMode()
  return (
    <Box bg="background">
      <Container maxW="container.lg" bg={colorMode === "light" ? "container" : "#1A202C"} boxShadow={'lg'}>
        <Router />
      </Container>
    </Box>
  )
}

export default App

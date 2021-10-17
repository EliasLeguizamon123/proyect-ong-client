import React from 'react'
import { Container } from '@chakra-ui/react'

import './App.css'

import Router from './router'

function App() {
  return (
    <div style={{ background: '#e1e1e1' }}>
      <Container maxW="container.lg" bg="white" boxShadow={'lg'}>
        <Router />
      </Container>
    </div>
  )
}

export default App

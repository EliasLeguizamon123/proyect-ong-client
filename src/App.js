import React from 'react'
import { Container } from '@chakra-ui/react'

import './App.css'

import Router from './router'

function App() {
  return (
    <div style={{ background: '#DDEDFE' }}>
      <Container maxW="container.lg" bg="white" boxShadow={'lg'}>
        <Router />
      </Container>
    </div>
  )
}

export default App

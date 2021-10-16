import React, { useState } from 'react'
import { Box, useColorModeValue, Heading } from '@chakra-ui/react'
import ModalMessage from '../components/BackContactTable/ModalMessage'
import ContactTable from '../components/BackContactTable/ContactTable'

export default function BackContactPage() {
  const [messageData, setMessageData] = useState()
  const handleViewMessage = (element) => {
    setMessageData(element)
  }

  return (
    <>
      <Box bg={useColorModeValue('gray.50', 'gray.800')}>
        <Heading textAlign="center" marginBottom="2vh">
          Listado de consultas
        </Heading>
        {messageData && <ModalMessage messageData={messageData} />}
        <ContactTable viewMessage={handleViewMessage} />
      </Box>
    </>
  )
}

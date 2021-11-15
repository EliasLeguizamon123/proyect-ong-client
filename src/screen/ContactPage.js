import { Flex, useColorModeValue, Text } from '@chakra-ui/react'
import React from 'react'
import ContactForm from '../components/ContactForm/ContactForm'

export default function ContactPage() {
  return (
    <Flex
      flexDirection={['column', 'column', 'row']}
      justifyContent="center"
      alignItems="center"
      bg={useColorModeValue('gray.50', 'gray.800')}
      h="100vh"
      p={8}
    >
      <Flex
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        textAlign="center"
        p={8}
      >
        <Text fontSize="2xl" as="b" marginBottom={2}>
          ¡Lo invitamos a contactarse!
        </Text>
        <Text fontSize="xl">
          Rellene el formulario y estaremos respondiendo su consulta a la
          brevedad
        </Text>
      </Flex>

      <ContactForm />
    </Flex>
  )
}

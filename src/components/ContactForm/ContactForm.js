import ChakraInput from '../ChakraInput'
import React from 'react'
import { Box, Input, Heading, useColorModeValue } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import contactSchema from './contactValidationSchema'
import ChakraTextArea from './ChakraTextArea'

export default function ContactForm() {
  const handleSubmit = async (values) => {
    const messageData = { ...values }
    return messageData
  }

  return (
    <Box w={['100%', '100%', '80%', '60%']} marginBottom={[8]}>
      <Heading textAlign="center" marginBottom="1vh">
        Contact
      </Heading>
      <Box
        rounded="lg"
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow="lg"
        p={8}
      >
        <Formik
          enableReinitialize={true}
          initialValues={{
            name: '',
            email: '',
            phone: '',
            message: '',
          }}
          validationSchema={contactSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <ChakraInput name="name" type="text" label="Name" />
            <ChakraInput name="email" type="email" label="Email" />
            <ChakraInput name="phone" type="tel" label="Phone" />
            <ChakraTextArea name="message" label="Message" />
            <Input
              type="submit"
              bg="blue.400"
              color="white"
              width="100%"
              marginTop="10px"
              _hover={{
                bg: 'blue.500',
              }}
              value="Enviar"
            />
          </Form>
        </Formik>
      </Box>
    </Box>
  )
}

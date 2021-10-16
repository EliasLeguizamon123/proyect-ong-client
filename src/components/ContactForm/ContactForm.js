import ChakraInput from '../ChakraInput'
import React, { useState } from 'react'
import {
  Box,
  Input,
  Heading,
  useColorModeValue,
  Center,
} from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import contactSchema from './contactValidationSchema'
import ChakraTextArea from './ChakraTextArea'
import { sendRequest } from '../../utils/sendRequest'

export default function ContactForm() {
  const [success, setSuccess] = useState()

  const handleSubmit = async (values, { resetForm }) => {
    const messageData = { ...values }
    try {
      await sendRequest('post', '/contacts', messageData)
      resetForm({})
      setSuccess(true)
    } catch (err) {
      setSuccess(false)
    }
  }

  return (
    <Box w={['100%', '100%', '80%', '60%']} marginBottom={[8]}>
      <Heading textAlign="center" marginBottom="1vh">
        Contacto
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
            {success === true && (
              <Center textAlign="center" fontSize="md" color="green" as="b">
                ¡Su consulta ha sido enviada exitosamente!
              </Center>
            )}
            {success === false && (
              <Center textAlign="center" fontSize="md" color="red" as="b">
                Algo salio mal, intentelo nuevamente
              </Center>
            )}
            <ChakraInput name="name" type="text" label="Nombre" />
            <ChakraInput name="email" type="email" label="Correo electronico" />
            <ChakraInput name="phone" type="tel" label="Celular" />
            <ChakraTextArea name="message" label="Mensaje" />
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

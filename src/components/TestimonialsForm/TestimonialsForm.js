import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router'

import { Formik, Form } from 'formik'
import { FormSchema } from './testimonialsValidationSchema'

import {
  Flex,
  useColorModeValue,
  Stack,
  Heading,
  Box,
  Input,
} from '@chakra-ui/react'
import ChakraInput from '../ChakraInput'
import ChakraInputCKEditor from './ChakraInputCKEditor'

import { sendRequest } from '../../utils/sendRequest'

const TestimonialsForm = () => {
  const [isUpdate, setIsUpdate] = useState(false)
  const [iniValues, setIniValues] = useState({
    name: '',
    image: '',
    content: '',
  })
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      async function fetchData() {
        const response = await sendRequest('get', `/testimonials/${id}`)

        if (response && response.id) {
          const obTestimony = {
            name: response.name || '',
            image: response.image || '',
            content: response.content || '',
          }
          // Pass data to inputs
          setIniValues(obTestimony)
          setIsUpdate(true)
        } else setIsUpdate(false)
      }
      // Bring data in from api
      fetchData()
    } else setIsUpdate(false)
  }, [id])

  const handleSubmit = async (values) => {
    if (isUpdate) await sendRequest('put', `/testimonials/${id}`, { ...values })
    else await sendRequest('post', '/testimonials', { ...values })
  }

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6} minW="60vw">
        <Stack align="center">
          <Heading fontSize="4xl">Testimonios</Heading>
        </Stack>
        <Box
          rounded="lg"
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow="lg"
          p={8}
        >
          <Formik
            enableReinitialize={true}
            initialValues={iniValues}
            validationSchema={FormSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <ChakraInput name="name" type="text" label="Nombre" />
              <ChakraInput name="image" type="text" label="Imagen" />

              <ChakraInputCKEditor name="content" label="Contenido" />

              <Input
                type="submit"
                bg="blue.400"
                color="white"
                width="100%"
                marginTop="10px"
                _hover={{
                  bg: 'blue.500',
                }}
                value={isUpdate ? 'Actualiza testimonio' : 'Crea testimonio'}
              />
            </Form>
          </Formik>
        </Box>
      </Stack>
    </Flex>
  )
}

export default TestimonialsForm

import { Box, Flex, Heading, Input, Stack } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import React, { useState, useEffect } from 'react'
import ChakraInput from '../ChakraInput'
import ChackraInput from '../ChakraInput'
import ChakraInputCKEditor from '../TestimonialsForm/ChakraInputCKEditor'

const NewsForm = () => {
  const [isUpdate, setIsUpdate] = useState(false)
  const [iniValues, setIniValues] = useState({
    title: '',
    image: '',
    content: '',
    category: '',
  })
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const res = await sendRequest('get', `/news/${id}`)

        if (res && res.id) {
          const obNew = {
            title: res.title || '',
            image: res.image || '',
            content: res.content || '',
            category: res.category || '',
          }
          // Pass data to inputs
          setIniValues(obNew)
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

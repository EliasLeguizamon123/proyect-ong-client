import React, { useEffect, useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import {
  Flex,
  useColorModeValue,
  Stack,
  Box,
  Input,
  Center,
} from '@chakra-ui/react'
import ChakraInput from '../ChakraInput'
import ChakraTextArea from '../ContactForm/ChakraTextArea'
import { alertSuccess, alertError } from '../../utils/alerts'
import { sendRequest } from '../../utils/sendRequest'
import Spinner from '../../utils/Spinner'
import { useParams } from 'react-router-dom'

const FormSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Debes ingresar el nombre de la categoría'),
  description: Yup.string()
    .min(2, 'Too Short!')
    .required('Debes ingresar una descripción para la categoría'),
})

const CategoriesForm = () => {
  const { id } = useParams()
  const isCreating = id ? true : false
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState({
    name: '',
    description: '',
  })

  useEffect(() => {
    const getCategoryById = async (id) => {
      const response = await sendRequest('get', `/news/${id}`)
      if (!response) return alertError('No se encontro el id indicado')
      else
        setCategory({
          id,
          name: response.name,
          description: response.description,
        })
    }
    if (id) getCategoryById(id)
    setLoading(false)
  }, [id])

  const handleSubmit = async (values) => {
    setCategory({ ...category, ...values })
    if (isCreating) await sendRequest('post', '/categories', category)
    else await sendRequest('put', `/categories/${id}`, category)
    alertSuccess({
      title: isCreating ? 'Creación exitosa' : 'Actualización exitosa',
    })
  }

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={10}>
        <Box
          rounded="lg"
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow="lg"
          p={5}
          w="50vh"
        >
          {loading ? (
            <Center h="10rem">
              <Spinner size="xl" />
            </Center>
          ) : (
            <Formik
              initialValues={category}
              validationSchema={FormSchema}
              onSubmit={(values) => {
                handleSubmit(values)
              }}
            >
              <Form>
                <ChakraInput
                  id="name"
                  name="name"
                  type="text"
                  label="Nombre de la categoría"
                  defaultValue={category.name}
                />
                <ChakraTextArea
                  id="description"
                  name="description"
                  type="textarea"
                  size="lg"
                  label="Descripción"
                  defaultValue={category.description}
                />
                <Input
                  type="submit"
                  bg="blue.400"
                  color="white"
                  width="100%"
                  marginTop="10px"
                  _hover={{
                    bg: 'blue.500',
                  }}
                  value={isCreating ? 'Crear' : 'Guardar cambios'}
                />
              </Form>
            </Formik>
          )}
        </Box>
      </Stack>
    </Flex>
  )
}

export default CategoriesForm

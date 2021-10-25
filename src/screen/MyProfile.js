import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../features/user/userSlice'
import { useHistory } from 'react-router-dom'

import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import {
  Flex,
  useColorModeValue,
  Stack,
  Heading,
  Box,
  Input,
} from '@chakra-ui/react'
import ChakraInput from '../components/ChakraInput'

import { sendRequest } from '../utils/sendRequest'
import { alertError, alertSuccess } from '../utils/alerts'

const FormSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Demasiado corto!')
    .max(255, 'demasiado largo!')
    .required('El nombre es obligatorio'),
  lastName: Yup.string()
    .min(2, 'Demasiado corto!')
    .max(255, 'demasiado largo!')
    .required('El apellido es obligatorio'),
  email: Yup.string()
    .email('El mail no es correcto')
    .required('El mail es obligatorio'),
})

const MyProfile = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [iniValues, setIniValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
  })
  const [userId, setUserId] = useState(null)

  async function fetchData() {
    try {
      const response = await sendRequest('get', '/auth/me')
      const { firstName, lastName, email, id } = response
      setIniValues({ firstName, lastName, email })
      setUserId(id)
    } catch (error) {
      alertError('Algo salió mal', error.message)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = async (values) => {
    try {
      await sendRequest('put', `/users/${userId}`, { ...values })
      alertSuccess('La información se actualizó exitosamente')
    } catch (error) {
      alertError('Algo salió mal', error.message)
    }
  }

  const handleDelete = async () => {
    try {
      await sendRequest('delete', `/users/${userId}`)
      dispatch(logout())
      await alertSuccess('La cuenta se borró exitosamente')
      history.push('/')
    } catch (error) {
      alertError('Algo salió mal', error.message)
    }
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
          <Heading fontSize="4xl">Mi perfil</Heading>
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
              <ChakraInput name="firstName" type="text" label="Nombre" />
              <ChakraInput name="lastName" type="text" label="Apellido" />
              <ChakraInput name="email" type="email" label="Email" />

              <Input
                type="submit"
                bg="blue.400"
                color="white"
                width="100%"
                marginTop="10px"
                _hover={{
                  bg: 'blue.500',
                }}
                value="Editar datos"
              />
              <Input
                type="button"
                onClick={handleDelete}
                bg="red.400"
                color="white"
                width="100%"
                marginTop="10px"
                _hover={{
                  bg: 'red.500',
                }}
                value="Eliminar cuenta"
              />
            </Form>
          </Formik>
        </Box>
      </Stack>
    </Flex>
  )
}

export default MyProfile

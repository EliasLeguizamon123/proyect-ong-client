import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { login, logout } from '../features/user/userSlice'
import { useHistory } from 'react-router-dom'
import { uploadFile } from '../utils/AS3'

import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import {
  Flex,
  useColorModeValue,
  Stack,
  Heading,
  Box,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  useDisclosure,
  FormControl,
  Button,
} from '@chakra-ui/react'
import ChakraInput from '../components/ChakraInput'
import DropImage from '../components/DropImage'

import { sendRequest } from '../utils/sendRequest'
import { alertError, alertSuccess } from '../utils/alerts'
import authentication from '../utils/authentication'

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
    image: '',
  })
  const [userId, setUserId] = useState(null)
  const [password, setPassword] = useState('')
  const isRegister = false
  async function fetchData () {
    try {
      const response = await sendRequest('get', '/auth/me')
      const { firstName, lastName, email, image, id } = response
      setIniValues({ firstName, lastName, email, image })
      setUserId(id)
    } catch (error) {
      alertError('Algo salió mal', error.message)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const { isOpen, onOpen, onClose } = useDisclosure()

  const handlePasswordModal = values => {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <FormControl mt={4}>
              <Input
                placeholder='Ingrese su contraseña'
                type='password'
                onChange={e => setPassword(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme='blue'
              mr={3}
              onClick={() => handleSubmit(values)}
            >
              Editar datos
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  }

  const handleSubmit = async values => {
    try {
      const user = { email: values.email, password }
      await sendRequest('patch', `/users/${userId}`, { ...values })
      const fetchedData = await authentication(isRegister, user)
      if (fetchedData.token) {
        dispatch(login(fetchedData))
        onClose()
        await alertSuccess('La información se actualizó exitosamente')
        history.replace('/')
      }
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
      minH='100vh'
      align='center'
      justify='center'
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx='auto' maxW='lg' py={12} px={6} minW='60vw'>
        <Stack align='center'>
          <Heading fontSize='4xl'>Mi perfil</Heading>
        </Stack>
        <Box
          rounded='lg'
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow='lg'
          p={8}
        >
          <Formik
            enableReinitialize={true}
            initialValues={iniValues}
            validationSchema={FormSchema}
            onSubmit={handleSubmit}
          >
            {props => (
              <Form>
                <ChakraInput name='firstName' type='text' label='Nombre' />
                <ChakraInput name='lastName' type='text' label='Apellido' />
                <ChakraInput name='email' type='email' label='Email' />
                <DropImage
                  name='image'
                  image={iniValues.image}
                  onDrop={async file => {
                    const res = await uploadFile(file[0])

                    props.setFieldValue('image', res.location)
                    props.initialValues.image = res.location
                  }}
                />
                <Input
                  type='button'
                  onClick={onOpen}
                  bg='blue.400'
                  color='white'
                  width='100%'
                  marginTop='10px'
                  _hover={{
                    bg: 'blue.500',
                  }}
                  value='Editar datos'
                />
                <Input
                  type='button'
                  onClick={handleDelete}
                  bg='red.400'
                  color='white'
                  width='100%'
                  marginTop='10px'
                  _hover={{
                    bg: 'red.500',
                  }}
                  value='Eliminar cuenta'
                />
                {handlePasswordModal(props.values)}
              </Form>
            )}
          </Formik>
        </Box>
      </Stack>
    </Flex>
  )
}

export default MyProfile

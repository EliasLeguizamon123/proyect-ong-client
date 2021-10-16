import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useParams, useHistory } from 'react-router-dom'
import { sendRequest } from '../utils/sendRequest'
import { useState, useEffect } from 'react'
import {
  Button,
  Flex,
  useColorModeValue,
  Stack,
  Box,
  FormControl,
  FormLabel,
  Select,
  Text,
} from '@chakra-ui/react'
import ChakraInput from './ChakraInput'

const FormSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('First name is required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Last name is requided'),
  roleId: Yup.string().required('Role is required'),
})

const EditUserForm = () => {
  const [isUpdate, setIsUpdate] = useState(false)
  const [initialValues, setInitialValues] = useState({
    firstName: '',
    lastName: '',
    roleId: 2,
  })
  const { id } = useParams()

  let history = useHistory()
  useEffect(() => {
    if (id) {
      async function fetchData() {
        const response = await sendRequest('get', `/users/${id}`)
        if (response && response.id) {
          const obUser = {
            firstName: response.firstName || '',
            lastName: response.lastName || '',
            roleId: response.roleId || 2,
          }
          setInitialValues(obUser)
          setIsUpdate(true)
        } else setIsUpdate(false)
      }
      fetchData()
    } else setIsUpdate(false)
  }, [id])
  const handleSubmit = async (values) => {
    if (isUpdate) await sendRequest('put', `/users/${id}`, { ...values })
    else await sendRequest('post', '/users', { ...values })
    history.push('/')
  }
  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Box
          rounded="lg"
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow="lg"
          p={8}
        >
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={FormSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <div>
                <ChakraInput
                  name="firstName"
                  type="text"
                  label="Nombre"
                  defaultValue={initialValues.firstName}
                />
                <ChakraInput
                  name="lastName"
                  type="text"
                  label="Apellido"
                  defaultValue={initialValues.lastName}
                />
                {initialValues.roleId === 1 ? (
                  <FormControl id="roleId">
                    <FormLabel>Role</FormLabel>
                    <Select
                      placeholder="Seleccione un Rol"
                      defaultValue={initialValues.roleId}
                    >
                      <option value="1">Administrador</option>
                      <option value="2">Standard</option>
                    </Select>
                  </FormControl>
                ) : (
                  <Text>
                    Si desea ser administrador, consultelo con test@test.org.ar
                  </Text>
                )}
              </div>
              <Button
                bg="blue.400"
                color="white"
                width="100%"
                marginTop="10px"
                _hover={{
                  bg: 'blue.500',
                }}
                type="submit"
              >
                Editar Usuario
              </Button>
            </Form>
          </Formik>
        </Box>
      </Stack>
    </Flex>
  )
}

export default EditUserForm

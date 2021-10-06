import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import {
  Button,
  Flex,
  useColorModeValue,
  Stack,
  Heading,
  Box,
  Text,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
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
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must have at least 6 characters')
    .required('Required'),
})

const LoginRegisterForm = ({ isRegister }) => {
  const handleSubmit = (firstName, lastName, email, password) => {
    let user = {}
    if (isRegister) {
      return {
        firstName,
        lastName,
        email,
        password,
      }
    } else {
      user = { email, password }
    }

    return user
  }

  const conditionallyRender = () => {
    if (isRegister) {
      return (
        <Text align="center">
          {`You've already have an account? `}
          <Link to="/login">
            <Box>Login</Box>
          </Link>
        </Text>
      )
    }
    return (
      <Text align="center">
        {`Don't have an account?`}
        <Link to="/register">
          <Box>Sign In</Box>
        </Link>
      </Text>
    )
  }

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center" width="20rem">
          <Heading fontSize="4xl">{isRegister ? 'Sign In' : 'Login'}</Heading>
        </Stack>
        <Box
          rounded="lg"
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow="lg"
          p={8}
        >
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              password: '',
            }}
            validationSchema={FormSchema}
            onSubmit={(values) => {
              handleSubmit(
                values.firstName,
                values.lastName,
                values.email,
                values.password
              )
            }}
          >
            <Form>
              {isRegister ? (
                <div>
                  <ChakraInput
                    name="firstName"
                    type="text"
                    label="First Name"
                  />
                  <ChakraInput name="lastName" type="text" label="Last Name" />
                </div>
              ) : null}
              <ChakraInput name="email" type="email" label="Email" />
              <ChakraInput name="password" type="password" label="Password" />
              <Button
                bg="blue.400"
                color="white"
                width="100%"
                marginTop="10px"
                _hover={{
                  bg: 'blue.500',
                }}
              >
                {isRegister ? 'Sign In' : 'Log In'}
              </Button>
            </Form>
          </Formik>
        </Box>
        {conditionallyRender()}
      </Stack>
    </Flex>
  )
}

export default LoginRegisterForm

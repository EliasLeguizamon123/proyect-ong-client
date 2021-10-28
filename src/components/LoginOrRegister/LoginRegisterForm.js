import React, { useState, useEffect } from 'react'
import { Formik, Form } from 'formik'
import { sendRequest } from '../../utils/sendRequest'
import { Flex, Stack, Heading, Box, Text, Input, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import ChakraInput from '../ChakraInput'
import { useHistory } from 'react-router-dom'
import authentication from '../../utils/authentication'
import { LoginSchema, RegisterSchema } from './LoginRegisterSchema'
import { useDispatch } from 'react-redux'
import { login } from '../../features/user/userSlice'

const LoginRegisterForm = ({ isRegister }) => {
  const [image, setImage] = useState({})
  const history = useHistory()
  const dispatch = useDispatch()

  const handleSubmit = async ({ firstName, lastName, email, password }) => {
    let user = {}
    if (isRegister) {
      user = {
        firstName,
        lastName,
        email,
        password,
      }
    } else {
      user = { email, password }
    }
    const fetchedData = await authentication(isRegister, user)
    if (fetchedData.token) {
      dispatch(login(fetchedData))
      history.push('/')
    }
  }
  const getImage = () =>
    sendRequest('GET', '/organizations/1').then(res => {
      const { image, alt } = res
      setImage({ image, alt })
    })
    useEffect(() => {
      getImage()
    }, [])

  const conditionallyRender = () => {
    if (isRegister) {
      return (
        <Text align="center">
          {`You've already have an account? `}
          <Link to="/login" className="conditionalLinks"> Login</Link>
        </Text>
      )
    }
    return (
      <Text align="center" > 
        {`Don't have an account?`}
        <Link to="/register" className="conditionalLinks"> Sign In</Link>
      </Text>
    )
  }

  const initialValues = () => {
    if (isRegister) {
      return {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      }
    } else {
      return {
        email: '',
        password: '',
      }
    }
  }

  return (
    <Flex minH="100vh" align="center" justify="center" bg={'white'} >
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center" width="20rem">
          <Box>
            <Image src={image.image} maxh='30px' maxW='5rem' alt="logo Somos mas"/>
          </Box>
          <Heading fontSize="4xl">{isRegister ? 'Sign In' : 'Login'}</Heading>
        </Stack>
        <Box rounded="lg" bg={'white'} boxShadow="lg" p={8} >
          <Formik
            initialValues={initialValues()}
            validationSchema={isRegister ? RegisterSchema : LoginSchema}
            onSubmit={handleSubmit}
          >
            <Form spacing={4}>
              {isRegister ? (
                <Box>
                  <ChakraInput
                    name="firstName"
                    type="text"
                    label="First Name"
                  />
                  <ChakraInput name="lastName" type="text" label="Last Name" />
                </Box>
              ) : null}
              <ChakraInput name="email" type="email" label="Email" />
              <ChakraInput name="password" type="password" label="Password" />
              <Input
                type="submit"
                bg="blue.400"
                color="white"
                width="100%"
                marginTop="10px"
                _hover={{
                  bg: 'blue.500',
                }}
                value={isRegister ? 'Sign In' : 'Log In'}
              />
            </Form>
          </Formik>
        </Box>
        {conditionallyRender()}
      </Stack>
    </Flex>
  )
}

export default LoginRegisterForm

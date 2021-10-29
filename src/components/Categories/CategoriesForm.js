import React, { useEffect, useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import {
  Flex,
  useColorModeValue,
  Stack,
  IconButton,
  Box,
  Input,
  Center,
  Heading,
} from '@chakra-ui/react'
import ChakraInput from '../ChakraInput'
import ChakraTextArea from '../ContactForm/ChakraTextArea'
import { alertSuccess, alertError } from '../../utils/alerts'
import { sendRequest } from '../../utils/sendRequest'
import Spinner from '../../utils/Spinner'
import { useParams, useHistory } from 'react-router-dom'
import { CloseIcon } from '@chakra-ui/icons'

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
  const [isUpdate, setIsUpdate] = useState(false)
  const [iniValues, setIniValues] = useState({
    name: '',
    description: '',
  })

  const history = useHistory()

  useEffect(() => {
    if (id) {
      async function fetchData () {
        const response = await sendRequest('get', `/categories/${id}`)
        if (response && response.id) {
          const cat = {
            name: response.name || '',
            description: response.description || '',
          }
          // Pass data to inputs
          setIniValues(cat)
          setIsUpdate(true)
        } else setIsUpdate(false)
      }
      // Bring data in from api
      fetchData()
    } else setIsUpdate(false)
  }, [id])

  const handleSubmit = async values => {
    if (isUpdate) await sendRequest('put', `/categories/${id}`, { ...values })
    else await sendRequest('post', '/categories', { ...values })
    await alertSuccess('La actividad se guardó exitosamente')
    history.goBack()
  }

  return (
    <Flex
      minH='100vh'
      align='center'
      justify='center'
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx='auto' maxW='lg' py={12} px={6} minW='60vw'>
        <Stack
          align='center'
          display='flex'
          flexDir='row'
          justifyContent='space-between'
        >
          <Heading fontSize='4xl'>Categorías</Heading>
          <IconButton
            icon={<CloseIcon />}
            colorScheme='red'
            width='2rem'
            onClick={() => history.goBack()}
          />
        </Stack>
        <Box
          rounded='lg'
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow='lg'
          p={5}
        >
          <Formik
            initialValues={iniValues}
            validationSchema={FormSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            <Form>
              <ChakraInput
                id='name'
                name='name'
                type='text'
                label='Nombre de la categoría'
                defaultValue={iniValues.name}
              />
              <ChakraTextArea
                id='description'
                name='description'
                type='textarea'
                size='lg'
                label='Descripción'
                defaultValue={iniValues.description}
              />
              <Input
                type='submit'
                bg='blue.400'
                color='white'
                width='100%'
                marginTop='10px'
                _hover={{
                  bg: 'blue.500',
                }}
                value={!id ? 'Crear' : 'Guardar cambios'}
              />
            </Form>
          </Formik>
        </Box>
      </Stack>
    </Flex>
  )
}

export default CategoriesForm

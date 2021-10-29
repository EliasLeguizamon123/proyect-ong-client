import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import DropImage from '../../components/DropImage'
import { Formik, Form } from 'formik'
import { FormSchema } from './testimonialsValidationSchema'
import { uploadFile } from '../../utils/AS3'
import {
  Flex,
  useColorModeValue,
  Stack,
  Heading,
  Box,
  Input,
  IconButton,
} from '@chakra-ui/react'
import ChakraInput from '../ChakraInput'
import ChakraInputCKEditor from './ChakraInputCKEditor'
import { alertError, alertSuccess } from '../../utils/alerts'
import { sendRequest } from '../../utils/sendRequest'
import { CloseIcon } from '@chakra-ui/icons'

const TestimonialsForm = () => {
  const [isUpdate, setIsUpdate] = useState(false)
  const [iniValues, setIniValues] = useState({
    name: '',
    image: '',
    content: '',
  })
  const { id } = useParams()
  const history = useHistory()

  useEffect(() => {
    if (id) {
      async function fetchData () {
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

  const handleSubmit = async values => {
    if (isUpdate) {
      await sendRequest('put', `/testimonials/${id}`, { ...values })
      await alertSuccess('La información se actualizó exitosamente')
      history.replace('/backoffice')
    } else {
      await alertError('Error al modificar el testimonio')
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
        <Stack
          align='center'
          display='flex'
          flexDir='row'
          justifyContent='space-between'
        >
          <Heading fontSize='4xl'>Testimonios</Heading>
          <IconButton
            icon={<CloseIcon />}
            colorScheme='red'
            width='2rem'
            onClick={() => history.goBack()}
          />
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
                <ChakraInput name='name' type='text' label='Nombre' />
                <DropImage
                  name='image'
                  image={iniValues.image}
                  onDrop={async file => {
                    const res = await uploadFile(file[0])
                    props.setFieldValue('image', res.location)
                    props.initialValues.image = res.location
                  }}
                />
                <ChakraInputCKEditor name='content' label='Contenido' />

                <Input
                  type='submit'
                  bg='blue.400'
                  color='white'
                  width='100%'
                  marginTop='10px'
                  _hover={{
                    bg: 'blue.500',
                  }}
                  value={isUpdate ? 'Actualiza testimonio' : 'Crea testimonio'}
                />
              </Form>
            )}
          </Formik>
        </Box>
      </Stack>
    </Flex>
  )
}

export default TestimonialsForm

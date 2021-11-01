import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import { Formik, Form } from 'formik'
import { FormSchema } from './activitiesValidationSchema'

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
import ChakraInputCKEditor from '../ChakraInputCKEditor'
import { uploadFile } from '../../utils/AS3'
import { sendRequest } from '../../utils/sendRequest'
import { alertError, alertSuccess } from '../../utils/alerts'
import { CloseIcon } from '@chakra-ui/icons'
import DropImage from '../DropImage'

const ActivitiesForm = () => {
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
        const response = await sendRequest('get', `/activities/${id}`)

        if (response && response.id) {
          const obActivity = {
            name: response.name || '',
            image: response.image || '',
            content: response.content || '',
          }
          // Pass data to inputs
          setIniValues(obActivity)
          setIsUpdate(true)
        } else setIsUpdate(false)
      }
      // Bring data in from api
      fetchData()
    } else setIsUpdate(false)
  }, [id])

  const handleSubmit = async values => {
    try {
      if (isUpdate) await sendRequest('put', `/activities/${id}`, { ...values })
      else await sendRequest('post', '/activities', { ...values })
      await alertSuccess('La actividad se guardó exitosamente')
      history.goBack()
    } catch (error) {
      alertError('Error', 'Contacte a su administrador')
    }
  }

  return (
    <Flex
      minH='100vh'
      align='center'
      justify='center'
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack
        spacing={8}
        mx='auto'
        maxW='lg'
        py={2}
        px={2}
        minW='50vw'
        width={['100%', '100%', '70%']}
      >
        <Stack
          align='center'
          display='flex'
          flexDir='row'
          justifyContent='space-between'
        >
          <Heading fontSize='4xl'>Actividades</Heading>
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
                <ChakraInput name='name' type='text' label='Título' />
                <DropImage
                  onDrop={async file => {
                    const res = await uploadFile(file[0])

                    props.setFieldValue('image', res.location)
                    props.initialValues.image = res.location
                  }}
                  name='image'
                  image={iniValues.image}
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
                  value={isUpdate ? 'Actualiza actividad' : 'Crea actividad'}
                />
              </Form>
            )}
          </Formik>
        </Box>
      </Stack>
    </Flex>
  )
}

export default ActivitiesForm

import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Formik, Form } from 'formik'
import { FormSchema } from './activitiesValidationSchema'

import {
  Flex,
  useColorModeValue,
  Stack,
  Heading,
  Box,
  Input,
  Image,
} from '@chakra-ui/react'
import ChakraInput from '../ChakraInput'
import ChakraInputCKEditor from './ChakraInputCKEditor'
import ImageInput from '../ImageInput/ImageInput'
import { uploadFile } from '../../utils/AS3'

import { sendRequest } from '../../utils/sendRequest'
import { alertError, alertSuccess } from '../../utils/alerts'

const ActivitiesForm = () => {
  const [isUpdate, setIsUpdate] = useState(false)
  const [imgData, setImgData] = useState(null)
  const [loadedFile, setLoadedFile] = useState(null)
  const [iniValues, setIniValues] = useState({
    name: '',
    image: '',
    content: '',
  })
  const { id } = useParams()

  useEffect(() => {
    if (id) {
      async function fetchData() {
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

  const handleSubmit = async (values) => {
    try {
      if (loadedFile) {
        // Uploads image to S3 and gets the uploaded file url
        const res = await uploadFile(loadedFile)
        values.image = res.location
      }
      if (!values.image)
        throw new Error('Debes elegir una imagen para la actividad')

      if (isUpdate) await sendRequest('put', `/activities/${id}`, { ...values })
      else await sendRequest('post', '/activities', { ...values })

      alertSuccess('La actividad se guardó exitosamente')
    } catch (error) {
      alertError('Algo salió mal', error.message)
    }
  }

  const handleOnImageLoad = (file, imgData) => {
    // imgData has the image encoded with base 64 to show in component
    setImgData(imgData)

    // LoadedFile has the File object that we will send to S3 when submitting
    setLoadedFile(file)
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
          <Heading fontSize="4xl">Actividades</Heading>
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
              <ChakraInput name="name" type="text" label="Título" />
              {(imgData || iniValues.image) && (
                <Image
                  rounded="sm"
                  src={imgData || iniValues.image}
                  marginTop="20px"
                />
              )}
              <ImageInput
                buttonText={isUpdate ? 'Cambiar imagen' : 'Cargar imagen'}
                onImageLoad={handleOnImageLoad}
              />
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
                value={isUpdate ? 'Actualiza actividad' : 'Crea actividad'}
              />
            </Form>
          </Formik>
        </Box>
      </Stack>
    </Flex>
  )
}

export default ActivitiesForm

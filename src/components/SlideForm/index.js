import React from 'react'
import { useState } from 'react'
import store from '../../app/store'

import { Formik, Form } from 'formik'
import { FormSchema } from './slidesValidationSchema'
import { uploadFile } from '../../utils/AS3'
import ImageInput from '../ImageInput/ImageInput'
import { alertError, alertSuccess } from '../../utils/alerts'

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

import { sendRequest } from '../../utils/sendRequest'

const SliderForm = () => {
  const {
    user: { authenticated, userData },
  } = store.getState()
  const [imgData, setImgData] = useState(null)
  const [loadedFile, setLoadedFile] = useState(null)
  const iniValues = {
    imageUrl: '',
    text: '',
    order: '',
    organizationId: '',
  }

  const handleSubmit = async (values) => {
    try {
      const valueSlide = { ...values, roleId: userData.roleId, organizationId:1 }
      if (loadedFile) {
        // Uploads image to S3 and gets the uploaded file url
        const res = await uploadFile(loadedFile)
        values.imageUrl = res.location
      }
      if (!values.imageUrl)
        throw new Error('Debes elegir una imagen para el slider')

      await sendRequest('POST', '/slides', { ...valueSlide })
        .then(() => {
          alertSuccess('El slider se guardó exitosamente')
        })
        .catch((error) => {
          alertError('Algo salió mal', error.message)
        })
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
          <Heading fontSize="4xl">Slides</Heading>
        </Stack>
        <Box
          rounded="lg"
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow="lg"
          p={8}
        >
          <Formik
            validationSchema={FormSchema}
            onSubmit={handleSubmit}
            initialValues={iniValues}
          >
            <Form>
              {(imgData || iniValues.image) && (
                <Image
                  rounded="sm"
                  src={imgData || iniValues.image}
                  marginTop="20px"
                />
              )}
              <ImageInput
                buttonText="Cargar imagen"
                onImageLoad={handleOnImageLoad}
              />
              <span>Se recomienda cargar una imagen de 1280x500 px</span>
              <ChakraInput name="text" type="text" label="Texto" />
              <ChakraInput name="order" type="text" label="Orden" />

              <Input
                type="submit"
                bg="blue.400"
                color="white"
                width="100%"
                marginTop="10px"
                _hover={{
                  bg: 'blue.500',
                }}
                value="Create Slider"
              />
            </Form>
          </Formik>
        </Box>
      </Stack>
    </Flex>
  )
}

export default SliderForm

import React from 'react'
import { useState, useEffect } from 'react'

import { Formik, Form } from 'formik'
import { FormSchema } from './slidesValidationSchema'
import { uploadFile } from '../../utils/AS3'
import { alertError, alertSuccess } from '../../utils/alerts'
import { useHistory, useParams } from 'react-router-dom'

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

import { sendRequest } from '../../utils/sendRequest'
import { CloseIcon } from '@chakra-ui/icons'
import DropImage from '../DropImage'
import ChakraSelect from '../ChakraSelect'

const SliderForm = () => {
  const [isUpdate, setIsUpdate] = useState(false)
  const [iniValues, setIniValues] = useState({
    image: '',
    text: '',
    order: '',
  })
  const [slides, setSlides] = useState([])
  const [slidesLenght, setSlidesLength] = useState()
  const { id } = useParams()
  const history = useHistory()

  useEffect(() => {
    fetchSlides()
    if (id) {
      const fetchData = async () => {
        const res = await sendRequest('get', `/slides/${id}`)
        if (res && res.id) {
          const obNew = {
            image: res.imageUrl,
            text: res.text,
            order: res.order,
          }
          // Pass data to inputs
          setIniValues(obNew)
          setIsUpdate(true)
        } else setIsUpdate(false)
      }
      // Bring data in from api
      fetchData()
    } else setIsUpdate(false)
  }, [id])

  const fetchSlides = async () => {
    const res = await sendRequest('get', '/slides')
    setSlides(res.rows)
    setSlidesLength(res.count)
  }

  const handleOptions = () => {
    slides[slidesLenght] = {}
    return slides.map((slide, i) => {
      return (
        <option value={i + 1} key={i + 1}>
          {i + 1}
        </option>
      )
    })
  }

  const handleSubmit = async values => {
    try {
      if (!isUpdate) {
        await sendRequest('POST', '/slides', { ...values })
        await alertSuccess('El slider se creó exitosamente')
      } else {
        await sendRequest('PATCH', `/slides/${id}`, { ...values })
        await alertSuccess('El slider se actualio exitosamente')
      }
      history.goBack()
    } catch (error) {
      alertError('Algo salió mal', 'Contacte a su administrador')
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
          <Heading fontSize='4xl'>Slides</Heading>
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
            enableReinitialize
            validationSchema={FormSchema}
            onSubmit={handleSubmit}
            initialValues={iniValues}
          >
            {props => (
              <Form>
                <DropImage
                  onDrop={async file => {
                    const res = await uploadFile(file[0])
                    props.setFieldValue('image', res.location)
                    props.initialValues.image = res.location
                  }}
                  name='image'
                  image={iniValues.image}
                />
                <span>Se recomienda cargar una imagen de 1280x500 px</span>
                <ChakraInput name='text' type='text' label='Texto' />
                <ChakraSelect
                  onChange={value => {
                    props.setFieldValue('order', value.target.value)
                    props.initialValues.order = value.target.value
                  }}
                  placeholder='Selecciona...'
                  name='order'
                  label='Orden'
                  handleOptions={handleOptions}
                  iniValues={iniValues}
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
                  value='Crear Slide'
                />
              </Form>
            )}
          </Formik>
        </Box>
      </Stack>
    </Flex>
  )
}

export default SliderForm

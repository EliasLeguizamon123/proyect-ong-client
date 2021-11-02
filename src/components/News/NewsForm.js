import React, { useState, useEffect } from 'react'
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Input,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import ChakraInput from '../ChakraInput'
import ChakraInputCKEditor from '../ChakraInputCKEditor'
import { sendRequest } from '../../utils/sendRequest'
import { useParams } from 'react-router-dom'
import { NewsFormSchema } from '../News/NewsFormSchema'
import { uploadFile } from '../../utils/AS3'
import { alertError, alertSuccess } from '../../utils/alerts'
import DropImage from '../DropImage'
import ChakraSelect from '../ChakraSelect'
import { useHistory } from 'react-router-dom'
import { CloseIcon } from '@chakra-ui/icons'

const NewsForm = () => {
  const [isUpdate, setIsUpdate] = useState(false)
  const [iniValues, setIniValues] = useState({
    name: '',
    image: '',
    content: '',
    categoryId: '',
  })
  const [categories, setCategories] = useState({})
  const { id } = useParams()
  const history = useHistory()

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await sendRequest('get', '/categories')
      setCategories(res.rows)
    }

    fetchCategories()
    if (id) {
      const fetchData = async () => {
        const res = await sendRequest('get', `/news/${id}`)
        if (res && res.id) {
          const obNew = {
            name: res.name,
            image: res.image,
            content: res.content,
            categoryId: res.categoryId,
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

  const handleCategories = () => {
    if (categories.length > 0) {
      return categories.map(category => {
        return (
          <option value={category.id} key={category.id}>
            {category.name}
          </option>
        )
      })
    }
  }

  const handleSubmit = async values => {
    if (isUpdate) {
      try {
        await sendRequest('put', `/news/${id}`, { ...values })
        await alertSuccess('Exito', 'La novedad fue actualizada')
        history.goBack()
      } catch (error) {
        alertError('Error', error.message)
      }
    } else {
      try {
        await sendRequest('post', `/news`, { ...values })
        alertSuccess('Exito', 'La novedad fue creada')
      } catch (error) {
        alertError('Error', error.message)
      }
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
          <Heading fontSize='4xl'>Novedades</Heading>
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
            initialValues={iniValues}
            validationSchema={NewsFormSchema}
            onSubmit={handleSubmit}
          >
            {props => (
              <Form>
                <ChakraInput name='name' type='text' label='Titulo' />
                <DropImage
                  onDrop={async file => {
                    const res = await uploadFile(file[0])

                    props.setFieldValue('image', res.location)
                    props.initialValues.image = res.location
                  }}
                  name='image'
                  image={iniValues.image}
                />
                <ChakraSelect
                  onChange={value => {
                    props.setFieldValue('categoryId', value.target.value)
                    props.initialValues.categoryId = value.target.value
                  }}
                  placeholder='Selecciona una categoría'
                  name='categoryId'
                  label='Categoría'
                  handleOptions={handleCategories}
                  iniValues={iniValues}
                />
                <ChakraInputCKEditor name='content' label='Contenido' />
                <Box>
                  <Input
                    type='submit'
                    bg='blue.400'
                    color='white'
                    width='100%'
                    marginTop='10px'
                    _hover={{
                      bg: 'blue.500',
                    }}
                    value={isUpdate ? 'Actualiza novedad' : 'Crea novedad'}
                  />
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Stack>
    </Flex>
  )
}

export default NewsForm

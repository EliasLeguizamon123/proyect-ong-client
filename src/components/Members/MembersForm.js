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
import { sendRequest } from '../../utils/sendRequest'
import { useParams } from 'react-router-dom'
import { MembersFormSchema } from '../Members/MembersFormSchema'
import { uploadFile } from '../../utils/AS3'
import { alertError, alertSuccess } from '../../utils/alerts'
import DropImage from '../DropImage'
import { useHistory } from 'react-router-dom'
import { CloseIcon } from '@chakra-ui/icons'

const MembersForm = () => {
  const [isUpdate, setIsUpdate] = useState(false)
  const [iniValues, setIniValues] = useState({
    name: '',
    image: '',
  })
  const { id } = useParams()
  const history = useHistory()

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const res = await sendRequest('get', `/members/${id}`)
        if (res && res.id) {
          const obNew = {
            name: res.name,
            image: res.image,
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

  const handleSubmit = async values => {
    if (isUpdate) {
      try {
        await sendRequest('put', `/members/${id}`, { ...values })
        await alertSuccess('Exito', 'El miembro fue actualizado')
        history.goBack()
      } catch (error) {
        alertError('Error', error.message)
      }
    } else {
      try {
        await sendRequest('post', `/members`, { ...values })
        alertSuccess('Exito', 'El miembro fue creado con éxito')
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
          <Heading fontSize='4xl'>Miembros</Heading>
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
            validationSchema={MembersFormSchema}
            onSubmit={handleSubmit}
          >
            {props => (
              <Form>
                <ChakraInput name='name' type='text' label='Nombre' />
                <DropImage
                  onDrop={async file => {
                    const res = await uploadFile(file[0])

                    props.setFieldValue('image', res.location)
                    props.initialValues.image = res.location
                  }}
                  name='image'
                  image={iniValues.image}
                />
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
                    value={isUpdate ? 'Actualiza Miembro' : 'Crea Miembro'}
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

export default MembersForm

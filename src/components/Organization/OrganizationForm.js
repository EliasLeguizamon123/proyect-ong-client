import React, { useState, useEffect } from 'react'
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Input,
  Select,
  Text,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import ChakraInput from '../ChakraInput'
import { sendRequest } from '../../utils/sendRequest'
import { OrganizationFormSchema } from '../Organization/OrganizationFormSchema'
import { uploadFile } from '../../utils/AS3'
import { alertError, alertSuccess } from '../../utils/alerts'
import DropImage from '../DropImage'
import { AddIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons'
import { useHistory } from 'react-router-dom'

const OrganizationForm = () => {
  const [organizationIniValues, setOrganizationIniValues] = useState({
    name: '',
    image: '',
  })
  const [orgLinks, setOrgLinks] = useState([])
  const [tempSocialName, setTempSocialName] = useState('')
  const [tempSociaUrl, setTempSociaUrl] = useState('')
  const [isAdding, setIsAdding] = useState(false)
  const history = useHistory()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await sendRequest('get', `/organizations/1`)
        const obNew = {
          name: res.name,
          image: res.image,
        }
        // Pass data to inputs
        setOrganizationIniValues(obNew)
        setOrgLinks(res.OrganizationLinks)
      } catch (error) {
        setOrganizationIniValues({
          name: '',
          image: '',
        })
      }
    }
    // Bring data in from api
    fetchData()
  }, [])

  const socialMedia = [
    'Instagram',
    'Facebook',
    'Twitter',
    'Youtube',
    'TikTok',
    'Snapchat',
  ]
  const handleOptions = () => {
    return socialMedia.map(item => {
      return (
        <option value={item} key={item}>
          {item}
        </option>
      )
    })
  }
  const handleRemoveItem = id => {
    const newList = orgLinks.filter(item => item.id !== id)
    setOrgLinks(newList)
  }

  const handleLinksSubmit = async () => {
    try {
      await sendRequest('post', '/organizations/1/links', {
        socialNetwork: tempSocialName,
        link: tempSociaUrl,
        organizationId: 1,
      })
      setTempSocialName('')
      setTempSociaUrl('')
      setIsAdding(false)
    } catch (error) {
      alertError('Error')
    }
  }
  const handleLinkDelete = async id => {
    if (id >= 1) {
      try {
        await sendRequest('delete', `/organizations/1/links/${id}`)
        handleRemoveItem(id)
        setIsAdding(false)
        setTempSocialName('')
        setTempSociaUrl('')
      } catch (error) {
        alertError('Error')
      }
    } else {
      handleRemoveItem(id)
      setIsAdding(false)
    }
  }

  const renderLinksInputs = () => {
    return orgLinks.map(i => {
      return (
        <Stack direction={'row'} key={i.id} id={i.id} p={2}>
          <Select
            disabled={i.id >= 1 && true}
            placeholder='Selecciona...'
            value={i.socialNetwork}
            onChange={value => {
              setTempSocialName(value.target.value)
            }}
          >
            {handleOptions()}
          </Select>
          <Input
            disabled={i.id >= 1 && true}
            label='Link'
            type='text'
            value={i.link}
            onChange={value => setTempSociaUrl(value.target.value)}
          />
          {i.id < 1 && (
            <IconButton
              disabled={tempSociaUrl === '' || (tempSocialName === '' && true)}
              alignSelf={'baseline'}
              aria-label='Check'
              variant='outline'
              colorScheme={'green'}
              icon={<CheckIcon />}
              onClick={handleLinksSubmit}
            />
          )}
          <IconButton
            alignSelf={'baseline'}
            aria-label='Close'
            variant='outline'
            colorScheme={'red'}
            icon={<CloseIcon />}
            onClick={() => handleLinkDelete(i.id)}
          />
        </Stack>
      )
    })
  }

  const handleSubmit = async values => {
    try {
      await sendRequest('patch', `/organizations/1`, { ...values })
      await alertSuccess('Exito', 'Los datos de la ONG fueron actualizados')
      window.location.replace('/backoffice')
    } catch (error) {
      alertError('Error', error.message)
    }
  }

  return (
    <Flex
      minH='100vh'
      align='center'
      justify='center'
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx='auto' maxW='container.xl' py={12} px={6}>
        <Stack
          align='center'
          display='flex'
          flexDir='row'
          justifyContent='space-between'
        >
          <Heading fontSize='4xl'>Organización</Heading>
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
            initialValues={organizationIniValues}
            validationSchema={OrganizationFormSchema}
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
                  image={organizationIniValues.image}
                />
                <Text fontWeight='semibold'>Redes Sociales</Text>
                {renderLinksInputs(props)}
                {!isAdding && (
                  <IconButton
                    display='flex'
                    alignSelf='center'
                    margin={'auto'}
                    aria-label='Add'
                    colorScheme={'blue'}
                    icon={<AddIcon />}
                    onClick={() => {
                      setIsAdding(true)
                      setOrgLinks(orgLinks => [
                        ...orgLinks,
                        { id: Math.random() },
                      ])
                    }}
                  />
                )}
                <Input
                  type='submit'
                  bg='blue.400'
                  color='white'
                  width='100%'
                  marginTop='10px'
                  _hover={{
                    bg: 'blue.500',
                  }}
                  value={'Actualizar información'}
                />
              </Form>
            )}
          </Formik>
        </Box>
      </Stack>
    </Flex>
  )
}

export default OrganizationForm

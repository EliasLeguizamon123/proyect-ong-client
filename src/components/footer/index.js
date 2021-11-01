import React, { useEffect, useState } from 'react'
import {FaInstagram, FaFacebook, FaTwitter, FaSnapchat, FaYoutube, FaTiktok } from 'react-icons/fa'

import { sendRequest } from '../../utils/sendRequest'

import {
  Box,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  useColorMode,
  Flex,
  Center,
  Image
} from '@chakra-ui/react'

const ListHeader = ({ text }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {text}
    </Text>
  )
}
export default function Footer ({
  webLinks = [{ name: 'Home', path: '/Home' }],
  bgColor = 'gray.50',
  textColor = 'gray.700',
}) {
  const links1 = webLinks.slice(0, (Math.ceil(webLinks.length/2)))
  const links2 = webLinks.slice((Math.ceil(webLinks.length/2)), webLinks.length)
  const icons = {
    "Instagram": FaInstagram,
    "Facebook": FaFacebook,
    "Twitter": FaTwitter,
    "SnapChat": FaSnapchat,
    "Youtube": FaYoutube,
    "Tiktok": FaTiktok
  }
  //states
  const [socialNetworks, setSocialNetworks] = useState([])
  const [organization, setOrganization] = useState({})
  const getLinks = () =>
    sendRequest('GET', '/organizations/1').then(res => {
      setSocialNetworks(res.OrganizationLinks)
      const { name, image } = res
      setOrganization({ name, image })
    })

  useEffect(() => {
    getLinks()
  }, [])

  const { colorMode } = useColorMode()

  return (
    <Box bg={colorMode === "light" ? "gray.200" : "darkGray"} color={useColorModeValue(textColor)}>
      <Container maxW={'6xl'} py={10} >
        <Center>
          <SimpleGrid
            justify={'flex-center'}
            alignItems="center"
            templateColumns={{ sm: '1fr', md: '1fr 1fr 1fr' }}
            spacing={8}
            w="90%"
            mb={"10px"}
          >
            <Flex direction="row">
              {links1.map((links, index) => (
                <Link key={index} href={links.path} mx="7px">
                  {links.name}
                </Link>
              ))}
            </Flex>
            <Flex spacing={6} alignItems="center">
              <Box width='100px' mr="8px" >
                <Image src={organization.image} alt='organization' borderRadius={"5px"} fallbackSrc='https://via.placeholder.com/150'></Image>
              </Box>
              <Text fontSize={'lg'} fontWeight={'700'}>
                {organization.name}
              </Text>
            </Flex>
            <Flex direction="row">
              
              {links2.map((links, index) => (
                <Link key={index} href={links.path}  mx="7px">
                  {links.name}
                </Link>
              ))}
            </Flex>
          </SimpleGrid>
        </Center>
        <hr />
          <Center my="10px">
            {socialNetworks.map(social => (
              <Link key={social.id} href={social.link} target='_blank' align='center' fontSize="30px" mx="5px">               
                {React.createElement(icons[social.socialNetwork])}
              </Link>
            ))}
          </Center>
          <Center>
          <Text >
              © Copyright by {organization.name} 2021
            </Text>
          </Center>
      </Container>
    </Box>
  )
}

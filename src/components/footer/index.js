import React, { useEffect, useState } from 'react'

import { sendRequest } from '../../utils/sendRequest'

import {
  Box,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

const ListHeader = ({ text }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {text}
    </Text>
  )
}

export default function Footer({
  webLinks = [{ name: 'Home', path: '/Home' }],
  bgColor = 'gray.50',
  textColor = 'gray.700',
}) {
  //states
  const [socialNetworks, setSocialNetworks] = useState([])
  const [organization, setOrganization] = useState({})

  const getLinks = () =>
    sendRequest('GET', '/organizations/1').then((res) => {
      if (res && res.length) {
        setSocialNetworks(res[0].OrganizationLinks)
        const { name, image } = res[0]
        setOrganization({ name, image })
      }
    })

  useEffect(() => {
    getLinks()
  }, [])

  return (
    <Box bg={useColorModeValue(bgColor)} color={useColorModeValue(textColor)}>
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid
          justify={'flex-center'}
          templateColumns={{ sm: '1fr 1fr', md: '1fr 1fr 1fr' }}
          spacing={8}
        >
          <Stack spacing={6}>
            <Box width="100px">
              <img src={organization.image}></img>
            </Box>
            <Text fontSize={'lg'} fontWeight={'700'}>
              {organization.name}
            </Text>
          </Stack>
          <Stack align={'flex-center'}>
            <ListHeader text="Social Networks" />
            {socialNetworks.map((social) => (
              <Link key={social.id} href={social.link} target="_blank">
                {social.socialNetwork}
              </Link>
            ))}
          </Stack>
          <Stack align={'flex-center'}>
            <ListHeader text="Links" />
            {webLinks.map((links, index) => (
              <Link key={index} href={links.path}>
                {links.name}
              </Link>
            ))}
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  )
}

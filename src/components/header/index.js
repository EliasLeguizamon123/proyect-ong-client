import React, { useState, useEffect } from 'react'
import { Flex, Button, IconButton, Image, Spacer } from '@chakra-ui/react'
import { Link, useRouteMatch } from 'react-router-dom'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import { sendRequest } from '../../utils/sendRequest'

const Header = ({
  webLinks = [{ name: 'Home', path: '/' }],
  userLinks = [{ name: 'registro', path: '/registro' }],
}) => {
  const activeTextColor = 'blue.200'
  //states
  const [display, changeDisplay] = useState('none')
  const [image, setImage] = useState({})

  const getImage = () =>
    sendRequest('GET', '/organizations/1').then((res) => {
      if (res && res.length) {
        const { image, alt } = res[0]
        setImage({ image, alt })
      }
    })

  let itemsNav = webLinks.map((link, index) => (
    <ActiveLink
      key={index}
      activeOnlyWhenExact={true}
      to={link.path}
      label={link.name}
      activeTextColor={activeTextColor}
    />
  ))
  let userNav = userLinks.map((link, index) => (
    <ActiveLink
      key={index}
      activeOnlyWhenExact={true}
      to={link.path}
      label={link.name}
      activeTextColor={activeTextColor}
    />
  ))

  useEffect(() => {
    getImage()
  }, [])
  return (
    <nav>
      <Flex>
        <Flex display={['none', 'none', 'flex', 'flex']}>
          <Link to="/">
            <Image
              src={image.image}
              alt={image.alt}
              maxW="5rem"
              mt={1}
              ml={1}
              mr={3}
              borderRadius={'5px'}
              maxh="30px"
              fallbackSrc="https://via.placeholder.com/150"
            />
          </Link>
          {itemsNav}
        </Flex>
        <Spacer />
        <Flex align="center" ml="auto" mr={5}>
          <Flex display={['none', 'none', 'flex', 'flex']}>{userNav}</Flex>
        </Flex>
        <Flex>
          <IconButton
            aria-label="Open Menu"
            size="lg"
            mr={2}
            my={3}
            icon={<HamburgerIcon />}
            display={['flex', 'flex', 'none', 'none']}
            onClick={() => changeDisplay('flex')}
          />
        </Flex>
        <Flex
          w="100vw"
          bgColor="gray.50"
          zIndex={20}
          h="100vh"
          pos="fixed"
          top="0"
          left="0"
          overflowY="auto"
          flexDir="column"
          display={display}
        >
          <Flex justify="flex-end">
            <IconButton
              aria-label="Close Menu"
              mt={3}
              mr={3}
              size="md"
              icon={<CloseIcon />}
              onClick={() => changeDisplay('none')}
            />
          </Flex>
          <Flex flexDir="column" align="center">
            {itemsNav}
            <hr />
            {userNav}
          </Flex>
        </Flex>
      </Flex>
    </nav>
  )
}
function ActiveLink({ activeOnlyWhenExact, to, label, activeTextColor }) {
  let activeMatch = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact,
  })
  if (activeMatch) {
    return (
      <Button
        as="a"
        href={to}
        variant="ghost"
        my={3}
        w="100%"
        color={activeTextColor}
      >
        {label}
      </Button>
    )
  } else {
    return (
      <div>
        <Button as="a" variant="ghost" my={3} w="100%" href={to}>
          {label}
        </Button>
      </div>
    )
  }
}

export default Header

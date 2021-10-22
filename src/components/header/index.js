import React, { useState, useEffect } from 'react'
import {
  Flex,
  Button,
  IconButton,
  Image,
  Spacer,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  Center,
  MenuDivider,
  MenuItem,
} from '@chakra-ui/react'
import { Link, useRouteMatch } from 'react-router-dom'
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { sendRequest } from '../../utils/sendRequest'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { logout } from '../../features/user/userSlice'

const Header = ({
  webLinks = [{ name: 'Nosotros', path: '/nosotros' }],
  userLinks = [{ name: 'registro', path: '/registro' }],
}) => {
  const dispatch = useDispatch()
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

  const { firstName, lastName, profileImage } = useSelector(
    (state) => state.user.userData
  )

  const isAuth = useSelector((state) => state.user.authenticated)
  const { isAdmin } = useSelector((state) => state.user.userData)
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

  const handleLogout = () => {
    dispatch(logout())
  }

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
        {!isAuth ? (
          <Flex align="center" ml="auto" mr={5}>
            <Flex display={['none', 'none', 'flex', 'flex']}>{userNav}</Flex>
          </Flex>
        ) : (
          <Menu>
            <MenuButton
              as={Button}
              rounded={'full'}
              variant={'link'}
              cursor={'pointer'}
              minW={0}
            >
              <Avatar size={'sm'} src={profileImage} />
              <ChevronDownIcon />
            </MenuButton>
            <MenuList alignItems={'center'}>
              <br />
              <Center>
                <Avatar size={'2xl'} src={profileImage} />
              </Center>
              <br />
              <Center>
                <p>
                  {firstName} {lastName}
                </p>
              </Center>
              <br />
              <MenuDivider />
              {isAdmin && (
                <MenuItem>
                  <Link to="/backoffice">Administrar</Link>
                </MenuItem>
              )}
              <MenuItem>
                <Link to="/perfil">Cuenta</Link>
              </MenuItem>
              <MenuItem color="red" onClick={handleLogout}>
                Desconectarse
              </MenuItem>
            </MenuList>
          </Menu>
        )}
        <Flex m={2} p={2}>
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

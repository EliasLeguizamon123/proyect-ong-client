import React, { useEffect } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Heading,
  Center,
} from '@chakra-ui/react'

function ModalMessage({ messageData }) {
  const { isOpen, onClose, onOpen } = useDisclosure()

  useEffect(() => {
    if (messageData) {
      onOpen()
    }
  }, [messageData, onOpen])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Center>
            <Heading fontSize="1rem">Consulta de {messageData?.name}</Heading>
          </Center>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>{messageData?.message}</ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default React.memo(ModalMessage)

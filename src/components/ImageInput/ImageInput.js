import React, { useRef } from 'react'

import { Box, Input, Button } from '@chakra-ui/react'

// The component shows a button, which text you can change with buttonText prop
// And allows the user to choose an image file from their computer. When the user
// selects a valid file, the onImageLoad event will fire, passing the file as the first
// parameter and the base64 encoded image as the second

const ImageInput = ({ buttonText = 'Elige una imagen', onImageLoad }) => {
  const inpFile = useRef(null)

  const handleChange = (e) => {
    const files = e.target.files
    if (files && files.length) {
      const FR = new FileReader()

      FR.addEventListener('load', function (e) {
        const base64encoded = e.target.result
        onImageLoad(files[0], base64encoded)
      })

      FR.readAsDataURL(files[0])
    }
  }

  const handleClick = () => {
    inpFile.current.click()
  }

  return (
    <Box>
      <Button onClick={handleClick} margin="20px 0">
        {buttonText}
      </Button>
      <Input
        ref={inpFile}
        display="none"
        type="file"
        accept="image/*"
        onChange={handleChange}
      />
    </Box>
  )
}

export default ImageInput

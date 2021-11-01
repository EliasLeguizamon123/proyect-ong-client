import React from 'react'
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Text,
} from '@chakra-ui/react'
import { Field } from 'formik'
import Dropzone from 'react-dropzone'

const DropImage = ({ onDrop, name, image, ...rest }) => {
  const handleBordercolor = (isDragActive, isDragReject) => {
    if (!isDragActive) {
      return 'blue.400'
    } else if (isDragActive && !isDragReject) {
      return 'green.400'
    } else {
      return 'red.300'
    }
  }
  return (
    <Dropzone
      onDrop={onDrop}
      accept='image/png, image/jpg, image/jfif, image/jpeg'
    >
      {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
        <Field name={name}>
          {({ field, form }) => (
            <FormControl
              id={name}
              {...getRootProps()}
              isInvalid={form.errors[name] && form.touched[name]}
            >
              <FormLabel htmlFor={name}>Imagen</FormLabel>
              <Box
                minH='40vh'
                borderWidth='.3rem'
                borderColor={handleBordercolor(isDragActive, isDragReject)}
                borderStyle='dotted'
                borderRadius='15px'
                bg='gray.100'
                display='flex'
                justifyContent='center'
                flexDirection='column'
              >
                <input {...getInputProps()} />
                {!isDragActive && (
                  <Box textAlign='center'>
                    <Text color='blue.400'>
                      Click here or drop a file to upload!
                    </Text>
                  </Box>
                )}
                {isDragActive && !isDragReject && (
                  <Box textAlign='center'>
                    <Text color='green.400'>Drop it here!</Text>
                  </Box>
                )}
                {isDragReject && (
                  <Box textAlign='center'>
                    <Text color='red.300'>
                      File type not accepted, only images!
                    </Text>
                  </Box>
                )}
                {image !== '' && (
                  <Image
                    alignSelf='center'
                    margin='auto'
                    height='40vh'
                    src={image}
                    alt='New'
                    fallbackSrc='https://www.escapeauthority.com/wp-content/uploads/2116/11/No-image-found.jpg'
                  />
                )}
              </Box>
              <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
      )}
    </Dropzone>
  )
}

export default DropImage

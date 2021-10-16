import React from 'react'
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
} from '@chakra-ui/react'
import { Field } from 'formik'
import Dropzone from 'react-dropzone'

const DropImage = ({ onDrop, name, image, ...rest }) => {
  return (
    <Dropzone
      onDrop={onDrop}
      accept="image/png, image/jpg, image/jfif, image/jpeg"
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
              <Box>
                <input {...getInputProps()} />
                {!isDragActive && (
                  <Box
                    borderStyle={'dotted'}
                    borderColor={'blue.400'}
                    borderWidth={image !== '' ? '0' : '.3rem'}
                  >
                    Click here or drop a file to upload!
                  </Box>
                )}
                {isDragActive && !isDragReject && (
                  <Box
                    borderColor="green.300"
                    borderStyle={'dotted'}
                    borderWidth="0.3rem"
                  >
                    Drop it here!
                  </Box>
                )}
                {isDragReject && (
                  <Box
                    borderColor="red.300"
                    borderStyle={'dotted'}
                    borderWidth="0.3rem"
                  >
                    File type not accepted, only images!
                  </Box>
                )}
                {image !== '' && (
                  <Image
                    src={image}
                    alt="New"
                    fallbackSrc="https://www.escapeauthority.com/wp-content/uploads/2116/11/No-image-found.jpg"
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

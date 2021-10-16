import React from 'react'
import { Field } from 'formik'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
} from '@chakra-ui/react'

const ChakraTextArea = ({ label, name, ...rest }) => (
  <Field name={name}>
    {({ field, form }) => (
      <FormControl isInvalid={form.errors[name] && form.touched[name]}>
        <FormLabel htmlFor={name}>{label}</FormLabel>
        <Textarea id={name} name={name} {...rest} {...field} />
        <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
      </FormControl>
    )}
  </Field>
)

export default ChakraTextArea

import React from 'react'
import { Field } from 'formik'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
} from '@chakra-ui/react'

const ChakraSelect = ({
  label,
  name,
  onChange,
  handleOptions,
  iniValues,
  ...rest
}) => (
  <Field name={name}>
    {({ field, form }) => (
      <FormControl isInvalid={form.errors[name] && form.touched[name]}>
        <FormLabel htmlFor={name}>{label}</FormLabel>
        <Select
          onChange={onChange}
          name={name}
          placeholder={'Selecciona una categoría'}
          value={iniValues[name]}
          {...field}
          {...rest}
        >
          {handleOptions()}
        </Select>
        <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
      </FormControl>
    )}
  </Field>
)

export default ChakraSelect

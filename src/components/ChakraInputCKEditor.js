import React from 'react'
import { Field } from 'formik'
import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import '../index.css'

const config = {
  toolbar: {
    items: ['bold', 'italic', '|', 'link', '|', 'undo', 'redo'],
  },
  language: 'en',
}

const ChakraInputCKEditor = ({ label, name }) => (
  <Field name={name}>
    {({ field, form }) => (
      <FormControl isInvalid={form.errors[name] && form.touched[name]}>
        <FormLabel htmlFor={name}>{label}</FormLabel>
        <CKEditor
          id={name}
          config={config}
          editor={ClassicEditor}
          data={field.value}
          onChange={(event, editor) => {
            form.setFieldValue(field.name, editor.getData())
          }}
        />
        <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
      </FormControl>
    )}
  </Field>
)

export default ChakraInputCKEditor

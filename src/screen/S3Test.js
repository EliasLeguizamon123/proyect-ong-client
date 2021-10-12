import { Button, FormLabel, FormControl, Input } from '@chakra-ui/react'
import React, { useRef } from 'react'
import { uploadFile } from '../utils/AS3'

export default function S3Test() {
  const file = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()

    uploadFile(file.current.files[0])
  }
  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel>Test Image</FormLabel>
        <Input type="file" ref={file} />
        <Button type="submit">Subir imagen</Button>
      </FormControl>
    </form>
  )
}

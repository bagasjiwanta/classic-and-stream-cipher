import { 
  Box, 
  Card, 
  CardBody, 
  CardHeader, 
  Container, 
  FormControl, 
  HStack, 
  Heading, 
  Input, 
  Select, 
  Stack, 
  Text, 
  Textarea,
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { useAnimation } from 'framer-motion';
import { useInfo } from './Logic'

function LeftSide() {
  const [fileInfo, setFileInfo] = useState({
    name: '',
    preview: ''
  });
  const controls = useAnimation()
  const { 
    format, 
    method, 
    setFormat, 
    inputText, 
    setInputText, 
    inputFile, 
    setInputFile,
    alphabetOnly,
    asciiOnly,
    extendedvigenere
  } = useInfo()

  useEffect(() => {
    if (textOnly) {
      setFormat('text')
    }
  }, [method])

  const ref = useRef()
  const handleFormatChange = (e) => setFormat(e.target.value)
  const handlePlainTextChange = (e) => {
    if (extendedvigenere) {
      asciiOnly(e.target.value) && setInputText(e.target.value)
    } else {
      alphabetOnly(e.target.value) && setInputText(e.target.value.toUpperCase())
    } 
  }

  const handleFileChange = async (e) => {
    // setFileInfo(e.target.files[0].name)
    const buffer = await e.target.files[0].arrayBuffer()
    const text = await e.target.files[0].text()
    const file = new Uint8Array(buffer)
    setFileInfo({
      name: e.target.files[0].name,
      preview: text.slice(0, 300)
    })
    setInputFile(file)
  }
  const textOnly = !extendedvigenere

  return (
    <Card width='350px'>
      <CardHeader pb={2}>
        <Heading as='h2' size='lg' color='blue.500'>
          Plain
        </Heading>
      </CardHeader>
      <CardBody >
        <Stack spacing={4}>
          <Box>
            <Heading size='sm' pb={2}>Format</Heading>
            <Select defaultValue='text' onChange={handleFormatChange}>
              <option value='text'>Text</option>
              {textOnly ? null : <option value='file'>File</option>}
            </Select>
          </Box>
          {
            format == 'text' 
            ? (
            <Box>
              <Heading size='sm' pb={2}>Text</Heading>
              <Textarea 
                value={inputText}
                onChange={handlePlainTextChange}
                placeholder="Plain text here"  
                style={{ fontFamily: 'monospace', 
                  textTransform: extendedvigenere ? null : 'uppercase'
                }}
              />
            </Box>
            )
            : ( 
                <Box 
                  borderColor='gray.300'
                  borderStyle='dashed'
                  borderWidth='2px'
                  rounded='md'
                  shadow='sm'
                  transition='all 150ms ease-in-out'
                  _hover={{
                    shadow: 'md',
                    borderColor: 'blue.300'
                  }}
                  height={20}
                >
                  <Box position='relative' height='100%' width='100%'>
                    <Box position='relative' height='100%' width='100%'>
                      <Stack alignItems='center' justifyContent='center' gap={0} height="100%">
                        <Text >Click or drag and drop to {fileInfo.name ? 'replace' : 'upload'}</Text>
                        {
                          fileInfo.name
                            ? <Text mt={0} fontWeight={700}>{fileInfo.name}</Text>
                            : null
                        }
                      </Stack>
                      <Input 
                        type='file' 
                        height="100%"
                        width="100%"
                        ref={ref}
                        position="absolute"
                        top="0"
                        left="0"
                        opacity="0"
                        aria-hidden='true'
                        onDragEnter={() => controls.start('hover')}
                        onDragLeave={() => controls.stop()}
                        onChange={handleFileChange}
                        // onChange={async e => console.log(await e.target.files[0].arrayBuffer())}
                      />
                    </Box>
                  </Box>
                </Box>  
            )
          }
          {
            format == 'text' 
            ? null
            : <Box >
                <Heading pb={2} size='sm'>Preview</Heading>
                <Textarea 
                  height={300}
                  value={fileInfo.preview} 
                  style={{ fontFamily:'monospace'}}
                  readOnly={true}
                />
              </Box>
          }
        </Stack>
      </CardBody>
    </Card>
  )
}

export default LeftSide;
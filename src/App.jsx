import { 
  Box, 
  Button, 
  Card, 
  CardBody, 
  CardHeader, 
  Container, 
  Divider, 
  FormControl, 
  FormErrorMessage, 
  FormLabel, 
  Grid, 
  GridItem, 
  HStack, 
  Heading, 
  Image, 
  Input, 
  InputGroup, 
  InputLeftElement, 
  Select, 
  Stack, 
  StackDivider, 
  Switch, 
  Text, 
  Textarea,
} from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useAnimation } from 'framer-motion';
import { MutiProvider, useInfo } from './functions/context'

function App() {
  const {isEncode} = useInfo()

  return (
    <ChakraProvider>
      <Box 
        as='main'
        background="linear-gradient(60deg, #4b6cb7 0%, #182848 100%);"
      >
      <Container 
        maxW="container.xl" 
        pt={4} 
        h='100vh'
        >
        <Box 
          display='flex' 
          flexDirection={isEncode ? 'row' : 'row-reverse'}
          width="100%"
          justifyContent='space-around'
          >
            <MutiProvider>
              <Encoder />
              <Core />
              <Decoder />
            </MutiProvider>
        </Box>
      </Container>
      </Box>
    </ChakraProvider>
  ) 
}


function Core() {
  const {setIsEncode, isEncode, method, setMethod, setEncryptKey} = useInfo()
  const handleKeyChange = (e) => setEncryptKey(String(e.target.value).toUpperCase())
  return (
    <Card width='350px'>
      <CardHeader pb={0}>
        <HStack justifyContent='flex-start' gap={2}>
          <Heading 
            size='lg'
            opacity={isEncode ? '1' : '0.4'}
            onClick={() => setIsEncode(true)}
            cursor='pointer'
          >
            Encode
          </Heading>
          <Heading
            size='lg'
            opacity={isEncode ? '0.4' : '1'}
            onClick={() => setIsEncode(false)}  
            cursor='pointer'
          >
            Decode
        </Heading>
        </HStack>
      </CardHeader>
      <CardBody>
        <Stack>
          <Box>
            <Heading size='sm' pb={2}>
              Method
            </Heading>
            <Select onChange={(e) => setMethod(e.target.value)} value={method}>
              <option value='vigenere'>
                Vigenere Cipher
              </option>
              <option value='extendedvigenere'>
                Extended Vigenere Cipher
              </option>
              <option value='playfair'>
                Playfair Cipher
              </option>
              <option value='onetimepad'>
                One Time Pad
              </option>
            </Select>
          </Box>
          <Box>
            <form>
              <FormControl isRequired>
                <Heading size='sm' pb={2}>
                  Key
                </Heading>
                <Input 
                  placeholder='Any key'
                  type='text' 
                  name='Method' 
                  fontFamily='monospace' 
                  onChange={handleKeyChange}/>
              </FormControl>
            </form>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  )
}

function Encoder() {
  const [fileName, setFileName] = useState('');
  const { 
    format, 
    method, 
    setFormat, 
    plainText, 
    setPlainText, 
    fileStream, 
    setFileStream
  } = useInfo()

  useEffect(() => {
    if (textOnly) {
      setFormat('text')
    }
  }, [method])

  const ref = useRef()
  const handleFormatChange = (e) => setFormat(e.target.value)
  const handlePlainTextChange = (e) => setPlainText(e.target.value)
  const handleFileChange = async (e) => {
    setFileName(e.target.files[0].name)
    setFileStream(await e.target.files[0].text())
  }
  const textOnly = method !== 'extendedvigenere'

  return (
    <Card width='350px'>
      <CardHeader pb={0}>
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
              {
                textOnly
                  ? null
                  : <option value='file'>File</option>
              }
            </Select>
          </Box>
          {
            format == 'text' 
            ? (
              <Textarea 
                value={plainText}
                onChange={handlePlainTextChange}
                placeholder="Write your plain text here"  
                style={{ fontFamily: 'monospace'}}
              />
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
                        <Text >Click or drag and drop to {fileName ? 'replace' : 'upload'}</Text>
                        {
                          fileName
                            ? <Text mt={0} fontWeight={700}>{fileName}</Text>
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
                  value={fileStream.slice(0, 200)} 
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


function Decoder() {
  const [format, setFormat] = useState('text');
  const [plainText, setPlainText] = useState('');
  const [fileStream, setFileStream] = useState('');
  const controls = useAnimation()

  const handleFormatChange = (e) => setFormat(e.target.value)
  const handlePlainTextChange = (e) => setPlainText(e.target.value)
  const handleFileChange = async (e) => {
    setFileStream(await e.target.files[0].text())
  }
  return (
    <Card width='350px'>
      <CardHeader pb={0}>
        <Heading as='h2' size='lg' color='teal.500'>
          Cipher
        </Heading>
      </CardHeader>
      <CardBody >
        <Stack spacing={4}>
          <Box>
            <Heading size='sm' pb={2}>Format</Heading>
            <Select defaultValue='text' onChange={handleFormatChange}>
              <option value='text'>Text</option>
              <option value='file'>File</option>
            </Select>
          </Box>
          {
            format == 'text' 
            ? (
              <Textarea 
                value={plainText}
                onChange={handlePlainTextChange}
                placeholder="Write your plain text here"  
                style={{ fontFamily: 'monospace'}}
              />
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
                  height='50px'
                >
                  <Box position='relative' height='100%' width='100%'>
                    <Box position='relative' height='100%' width='100%'>
                      <Stack alignItems='center' justifyContent='center'>
                        <Text >Click or drag and drop to upload</Text>
                      </Stack>
                      <Input 
                        type='file' 
                        height="100%"
                        width="100%"
                        position="absolute"
                        top="0"
                        left="0"
                        opacity="0"
                        aria-hidden='true'
                        onDragEnter={() => controls.start('hover')}
                        onDragLeave={() => controls.stop()}
                        onChange={handleFileChange}
                      />
                    </Box>
                  </Box>
                </Box>  
              )
          }
        </Stack>
      </CardBody>
    </Card>
  )
}

export default App;


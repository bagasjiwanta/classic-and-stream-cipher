import { 
  Box, 
  Button, 
  Card, 
  CardBody, 
  CardHeader, 
  HStack, 
  Heading, 
  Input, 
  Select, 
  Stack, 
  Text, 
  Textarea,
} from '@chakra-ui/react'
import { useInfo } from './Logic'
import { useAnimationControls } from 'framer-motion'
import { useState } from 'react'

function Middle() {
  const [fileName, setFileName] = useState('')
  const controls = useAnimationControls()
  const {
    setIsEncode, 
    isEncode, 
    method, 
    setMethod, 
    setEncryptKey, 
    extendedvigenere,
    asciiOnly,
    alphabetOnly,
    encryptKey,
    generateNewKey,
    downloadKey
  } = useInfo()

  const handleKeyChange = (e) => {
    const text = e.target.value
    if (extendedvigenere) {
      asciiOnly(text) && setEncryptKey(text)
    } else {
      alphabetOnly(text) && setEncryptKey(text.toUpperCase())
    } 
  }

  const handleFileChange = async (e) => {
    const text = await e.target.files[0].text()
    setFileName(e.target.files[0].name)
    setEncryptKey(text)
  }

  return (
    <Card width='350px'>
      <CardHeader pb={2}>
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
        <Stack spacing={4}>
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
            {/* onetimepad */}
            {
              method === 'onetimepad' 
              ? (
                <Stack spacing={2}>
                  <Heading size='sm'>Key</Heading>
                  <Textarea
                    value={encryptKey}
                    readOnly={true}
                    fontFamily='monospace'
                  />
                  {
                    isEncode 
                    ? (
                      <HStack>
                        <Button 
                          colorScheme='yellow'
                          onClick={async () => await generateNewKey()}
                        >
                          Generate new key
                        </Button>
                        <Button 
                          colorScheme='yellow'
                          onClick={downloadKey}
                          >Download key</Button>
                      </HStack>
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
                            accept='.txt'
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
                            // onChange={async e => console.log(await e.target.files[0].arrayBuffer())}
                          />
                        </Box>
                      </Box>
                    )
                  }
                  
                </Stack>
                )
              : null
            }

            {/* Vigenere and Extended Vigenere*/}
            {
              method === 'vigenere' || method === 'extendedvigenere'
              ? (
                <>
                  <Heading size='sm' pb={2}>
                    Key
                  </Heading>
                  <Textarea
                    placeholder='Key here'
                    type='text' 
                    name='Method' 
                    fontFamily='monospace' 
                    onChange={handleKeyChange}
                    value={encryptKey}
                    style={{textTransform: extendedvigenere ? null : 'uppercase'}}
                  />
                </>
              ) : null
            }

          </Box>
        </Stack>
      </CardBody>
    </Card>
  )
}

export default Middle;
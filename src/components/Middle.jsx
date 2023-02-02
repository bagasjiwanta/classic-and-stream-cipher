import { 
  Box, 
  Card, 
  CardBody, 
  CardHeader, 
  FormControl, 
  HStack, 
  Heading, 
  Select, 
  Stack, 
  Textarea,
} from '@chakra-ui/react'
import { useInfo } from './Logic'

function Middle() {
  const {
    setIsEncode, 
    isEncode, 
    method, 
    setMethod, 
    setEncryptKey, 
    extendedvigenere,
    asciiOnly,
    alphabetOnly,
    encryptKey
  } = useInfo()

  const handleKeyChange = (e) => {
    if (extendedvigenere) {
      asciiOnly(e.target.value) && setEncryptKey(e.target.value)
    } else {
      alphabetOnly(e.target.value) && setEncryptKey(e.target.value.toUpperCase())
    } 
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
            <form>
              <FormControl isRequired>
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
              </FormControl>
            </form>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  )
}

export default Middle;
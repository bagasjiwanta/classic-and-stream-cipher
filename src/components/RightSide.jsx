import { 
  Box, 
  Button, 
  Card, 
  CardBody, 
  CardHeader, 
  HStack, 
  Heading, 
  Stack, 
  Textarea,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useAnimation } from 'framer-motion';
import { useInfo } from './Logic';
import Link from 'next/link';

function RightSide() {
  const {
    outputText,
    extendedvigenere,
    downloadText,
    downloadFile
  } = useInfo()

  return (
    <Card width='350px'>
      <CardHeader pb={2}>
        <Heading as='h2' size='lg' color='teal.500'>
          Cipher
        </Heading>
      </CardHeader>
      <CardBody >
        <Stack spacing={4}>
          <Box>
            <Heading size='sm' pb={2}>Result</Heading>
            <Textarea 
              placeholder="Cipher text here"  
              style={{ 
                fontFamily: 'monospace', 
                textTransform: extendedvigenere ? null : 'uppercase'
              }}
              value={
                typeof outputText === 'string'
                  ? outputText.slice(0, 1000)
                  : new TextDecoder().decode(outputText).slice(0, 1000)
              }
              isReadOnly={true}
            />
          </Box>
          <HStack w="100%">
            <Button colorScheme='teal' onClick={() => downloadText()}>
              Download as text
            </Button>
            { extendedvigenere ? 
              <Button colorScheme='teal' onClick={() => downloadFile()}>
                Download as file
              </Button> : null}
          </HStack>
        </Stack>
      </CardBody>
    </Card>
  )
}

export default RightSide;
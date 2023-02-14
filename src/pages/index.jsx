import { 
  Box, 
  Card,
  CardBody, 
  CardFooter, 
  CardHeader, 
  Center, 
  Container, 
  HStack, 
  Heading, 
  Stack, 
  StackDivider, 
  Text 
} from '@chakra-ui/react'
import Description from '@/components/Description';
import Link from 'next/link';

function Home() {
  return (
     <Box as='main' minH='100vh' pb={6} background="linear-gradient(45deg, #0700b8 0%, #00ff88 100%);">
      <Container maxW="container.xl" h='100%'>
        <Description title="Tugas II4031 Kriptografi dan Koding" home='true'/>
        <Center p={7}>
          <Card >
            <CardHeader>
              <Heading size='lg'>List of cryptography and ciphers</Heading>
            </CardHeader>
            <CardBody >
              <Stack divider={<StackDivider />} spacing='4'>
                <Link href='/classic-cryptography'>
                  <Box>
                    <Heading size='sm'>Tucil 1 : Classic Cryptography</Heading>
                    <Text pt='2' fontSize='sm'>Vigenere Cipher, Extended Vigenere Cipher, Playfair Cipher, One Time Pad</Text>
                  </Box>
                </Link>
                <Link href='/stream-cipher'>
                  <Box>
                    <Heading size='sm'>Tucil 2 : Stream Cipher</Heading>
                    <Text pt='2' fontSize='sm'>Modified RC4</Text>
                  </Box>
                </Link>
              </Stack>
            </CardBody>
          </Card>
        </Center>
      </Container>
    </Box>
  ) 
}

export default Home;
  

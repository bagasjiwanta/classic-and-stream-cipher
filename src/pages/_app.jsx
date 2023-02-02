import { ChakraProvider } from '@chakra-ui/react'
import { MutiProvider } from '../functions/context'

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <MutiProvider>
        <Component {...pageProps} />
      </MutiProvider>
    </ChakraProvider>
  )
}
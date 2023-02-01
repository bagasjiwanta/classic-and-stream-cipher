import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'
import { MutiProvider } from './functions/context'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <MutiProvider>
      <App />
    </MutiProvider>
  </ChakraProvider>
)

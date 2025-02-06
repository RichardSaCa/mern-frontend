import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './utils/authContext.jsx';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <StrictMode>
    
    <ChakraProvider>
    
      <BrowserRouter>
        <App />
      </BrowserRouter>
   
    </ChakraProvider>
 
  </StrictMode>
  </AuthProvider>,
)

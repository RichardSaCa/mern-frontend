import { Box, useColorModeValue } from '@chakra-ui/react'
import {  Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'

import Navbar from './components/Navbar'
import LoginPage from './pages/LoginPAge'
import { ProtectedRoutes } from './utils/ProtectedRoutes'
import UnauthorizedPage from './pages/unauthorizedPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'



function App() {

  return (
    <>  
      <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
        <Navbar/>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            <Route path="/productDetail" element={<ProductDetailPage />} />
            <Route path="/carrito" element={<CartPage />} />
            <Route path="/" element={<HomePage />} />
             
                <Route path="/create" element={<ProtectedRoutes allowedRoles={["ROLE_ADMIN"]}>
                    <CreatePage />
                  </ProtectedRoutes>}>
                </Route>
             
          </Routes>
      </Box> 
    </>
  )
}

export default App

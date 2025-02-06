import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from "@chakra-ui/react"
import { useState } from "react";
import { userStore } from "../store/user";

import { useNavigate } from "react-router-dom";
import {useAuth} from "../utils/authContext";


const  LoginPage = () => {


    const { login } = useAuth();
    const [User, setUser] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const toast = useToast();
    const {signin}=userStore();

    const handleAuthenticacion = async() => {
        const {success, message, data} = await signin(User)
        console.log("success", success)
        console.log("message", message)
        console.log("data", data)
        
        if (!success) {
                toast({
                    title: "Error",
                    description: message,
                    status: "error",
                    isClosable: true,
            position: 'top-right'
                });
                //navigate("/login")
                // ProtectedRoutes(null)
            } else {
                toast({
                    title: "Success",
                    description: message,
                    status: "success",
                    isClosable: true,
            position: 'top-right'
                });
                login(data);
                navigate("/")
            }
          
            //setUser({ email: "", password: "" });
    }

  return (
     <Container maxW={"container.sm"}>
                <VStack spacing={8}>
                    <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                        SIGN IN
                    </Heading>
    
                    <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
                        <VStack spacing={4}>
                            <Input
                                placeholder='Email'
                                name='email'
                                value={User.email}
                  // El operador ... (operador de propagación)es una herramienta poderosa para copiar 
                  // y actualizar objetos de forma parcial, asegurándote de 
                  // no sobrescribir valores existentes accidentalmente.
                                onChange={(e) => setUser({ ...User, email: e.target.value })}
                            />
                            <Input
                                placeholder='Password'
                                name='password'
                                type='password'
                                value={User.password}
                                onChange={(e) => setUser({ ...User, password: e.target.value })}
                            />
                            {/* <Link to={"/"}>
                                <Button colorScheme='blue' onClick={ProtectedRoutes(User)} w='full'>
                                    Login
                                </Button>
                            </Link> */}

                            {/* <Link to={"/"}> */}
                                <Button colorScheme='blue' onClick={handleAuthenticacion} w='full'>
                                    Login2
                                </Button>
                            {/* </Link> */}
                        </VStack>
                    </Box>
                </VStack>
            </Container>
  )
}

export default LoginPage
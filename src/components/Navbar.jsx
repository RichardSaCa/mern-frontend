import {  Button, Container, Flex, HStack, Text, useColorMode, useDisclosure} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { LockIcon, PlusSquareIcon, UnlockIcon } from "@chakra-ui/icons"
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import {useAuth} from "../utils/authContext";
import { jwtDecode } from "jwt-decode";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Cart from "./Cart";

const Navbar = () => {
    const {colorMode, toggleColorMode} = useColorMode();
    const { token ,logout } = useAuth();
    const { isOpen, onOpen, onClose } = useDisclosure();

   

    const handleAuthenticacion = async() => {
        logout();
    }
    console.log("role ",token)
    let decoded = null;
    if(token){ decoded = jwtDecode(token);}
 
  return (
    <Container maxW={"1140px"} px={4}>
        <Flex 
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
            base: "column",
            sm: "row"
        }}
        >
            <Text
                fontSize={{ base: "22", sm: "28" }}
                fontWeight={"bold"}
                textTransform={"uppercase"}
                textAlign={"center"}
                bgGradient={"linear(to-r, cyan.400, blue.500)"}
                bgClip={"text"}
            >
                <Link to={"/"}>Product Store 🛒</Link>
            </Text>

            <HStack spacing={2} alignItems={"center"}>
            {!token ? (
               <></>
            ):
                (decoded.role === "ROLE_ADMIN") && 
                    <Link to={"/create"}>
                    <Button>
                        <PlusSquareIcon fontSize={20} />
                    </Button>
                </Link>
                
                    
            }
                
                
                <Button onClick={toggleColorMode}>
						{colorMode === "light" ? <IoMoon /> : <LuSun size='20' />}
				</Button>

                {!token ? (
            <Link to="/login">
            <Button>
                <LockIcon fontSize={20} />
            </Button>
            </Link>
            ) : (
                <Button onClick={handleAuthenticacion}>
                <UnlockIcon fontSize={20} />
                </Button>
            )}
                
                    <Button  onClick={onOpen}>
                        <AiOutlineShoppingCart fontSize={25} />
                    </Button>

                    <Cart onOpen={onOpen} isOpen={isOpen} onClose={onClose} ></Cart>
                
			</HStack>

        </Flex>

        
    </Container>

    
    
  )
}

export default Navbar
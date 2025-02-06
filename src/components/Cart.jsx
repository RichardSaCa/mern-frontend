import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, HStack, IconButton, Text,VStack } from "@chakra-ui/react";



import { FaTrash } from "react-icons/fa";


function Cart({isOpen, onClose, cart}) {
    
console.log("ca ",cart);
    




  return (
    <Box >
           <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Shopping Cart from</DrawerHeader>
              <DrawerBody>
                {/* {cart.length === 0 ? (
                  <Text>No items in cart</Text>
                ) : (
                  <VStack spacing={4}>
                    {cart.map((item) => (
                      <HStack key={item.id} w="full" justify="space-between">

                        <Text>{item.name}</Text>
                        <Text>{item.price}</Text>
                        <IconButton
                          icon={<FaTrash />}
                          colorScheme="red"
                          size="sm"
                        //   onClick={() => removeFromCart(item.id)}
                        />
                      </HStack>
                    ))}
                  </VStack>
                )} */}
              </DrawerBody>
            </DrawerContent>
          </Drawer>
  
        </Box>
  )
}

export default Cart
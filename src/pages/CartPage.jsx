

// function CartPage() {
//   return (
//     <div>CartPage</div>
//   )
// }

// export default CartPage

import  { useState } from "react";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Image,
  Text,
  VStack,
  HStack,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { FaShoppingCart, FaTrash } from "react-icons/fa";

const products = [
  {
    id: 1,
    name: "Nike Air Max",
    price: "$120",
    rating: "4.5",
    sizes: ["S", "M", "L"],
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Adidas Ultraboost",
    price: "$140",
    rating: "4.7",
    sizes: ["M", "L", "XL"],
    image: "https://via.placeholder.com/150",
  },
];

const CartPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <Box p={5}>
      <HStack spacing={4}>
        {products.map((product) => (
          <VStack key={product.id} p={4} borderWidth="1px" borderRadius="lg" w="200px">
            <Image src={product.image} alt={product.name} boxSize="150px" objectFit="cover" />
            <Text fontSize="lg" fontWeight="bold">{product.name}</Text>
            <Text color="gray.600">{product.price}</Text>
            <Text fontSize="sm">⭐ {product.rating}</Text>
            <HStack>
              {product.sizes.map((size) => (
                <Button key={size} size="xs" variant="outline">{size}</Button>
              ))}
            </HStack>
            <Button colorScheme="blue" size="sm" onClick={() => addToCart(product)}>
              Add to Cart
            </Button>
          </VStack>
        ))}
      </HStack>

      <IconButton
        icon={<FaShoppingCart />}
        colorScheme="blue"
        position="fixed"
        bottom={4}
        right={4}
        size="lg"
        onClick={onOpen}
      />

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Shopping Cart</DrawerHeader>
          <DrawerBody>
            {cart.length === 0 ? (
              <Text>No items in cart</Text>
            ) : (
              <VStack spacing={4}>
                {cart.map((item) => (
                  <HStack key={item.id} w="full" justify="space-between">
                    <Image src={item.image} boxSize="50px" />
                    <Text>{item.name}</Text>
                    <Text>{item.price}</Text>
                    <IconButton
                      icon={<FaTrash />}
                      colorScheme="red"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                    />
                  </HStack>
                ))}
              </VStack>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default CartPage;

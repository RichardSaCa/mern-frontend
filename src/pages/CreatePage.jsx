import { Box, Button, Container, Heading, Img, Input, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";


const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: ""
  });

  const toast = useToast();
  const {createProduct}=useProductStore();

  const preset_name = "tienda_test";                         //16 Pegamos el "name" rescatado en el punto 24
  const cloud_name = "ddec4exrh"                          //16.2 Pegamos el cloud_name rescatado en punto 20

	const [ image, setImage ] = useState('');       //12 Creamos estado local que guarde la url de la imagen subida
    const [ loading, setLoading ] = useState(false) //7 Creamos un estado local con valor incial boolean "false" para saber si la imagen esta cargando.
  

    const uploadImage = async (e)=>{            //2 Preparamos para recibir el evento al ejecutarse la función async
        const files = e.target.files            //3 recuperamos el array de e.target.files
        const data = new FormData()             //4 Creamos/Instanciamos un FormData objeto con nombre data
        data.append('file', files[0])           //5 Utilizando metodo append() agregamos al data el archivo desde files[0]
        data.append('upload_preset',preset_name)  //6 Como prop "upload preset" le pasamos la variable de la linea 6 (punto 16.2).

        setLoading(true)                        //8 Ponemos en true el estado local que indica que la imagen esta cargándose.

        try {
            //10 enviamos el pedido de upload con el data en body 
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
                method: 'POST',
                body: data
            });

            const file = await response.json();     //11 Traducimos la respuesta de JSON
            setImage(file.secure_url);              //13 Recuperamos la url de la imagen en estado local
            setLoading(false);                      //14 Dejamos el loading en false para que intente mostrar la magen
            console.log("url image 1: "+file.secure_url)

			

			setNewProduct({ ...newProduct, image: file.secure_url })
            console.log("url image 2: "+file.public_id)
            //await actions.sendPhoto(file.secure_url) //15 Enviamos la url a un action para hacer algo en back. Lo dejamos bloqueado para que no de error de importacion de Context actions o de la función.
        } catch (error) {
            console.error('Error uploading image:', error);
            setLoading(false);
        }

    }

  const handleAddProduct = async() => {
    const {success, message} = await createProduct(newProduct)
	console.log("PRODUCT: ",newProduct)
    console.log("success", success)
    console.log("message", message)
    if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				isClosable: true,
        position: 'top-right'
			});
		} else {
			toast({
				title: "Success",
				description: message,
				status: "success",
				isClosable: true,
        position: 'top-right'
			});
		}
		setNewProduct({ name: "", price: "", image: "" });
		setImage('');
  }

  return (
    <Container maxW={"container.sm"}>
			<VStack spacing={8}>
				<Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
					Create New Product
				</Heading>

				<Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
					<VStack spacing={4}>
						<Input
							placeholder='Product Name'
							name='name'
							value={newProduct.name}
              // El operador ... (operador de propagación)es una herramienta poderosa para copiar 
              // y actualizar objetos de forma parcial, asegurándote de 
              // no sobrescribir valores existentes accidentalmente.
							onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
						/>
						<Input
							placeholder='Price'
							name='price'
							type='number'
							value={newProduct.price}
							onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
						/>
						{/* <Input
							placeholder='Image URL'
							name='image'
							value={newProduct.image}
							onChange={() => setNewProduct({ ...newProduct, image: image })}
						/> */}
						
							<h1>Upload Image</h1>

							{/*1 - El siguiente input type file envia la imagen por el evento al handler uploadImage */}

							<Input type="file"
							name="file"
							placeholder='Upload an image'
							// accept='image/png, image/jpeg' 
							onChange={(e)=>{uploadImage(e)}}
							/>

							{/* ------------------------------------------------------------------------------------ */}

							
								{/* 9 - Si loading true, Mostramos Loading, si no mostramos la imagen la cual su url deberia estar cargada en un estado local */}
								{loading ? (
									<h3>Loading...</h3>
								) : (
								<Img src={image}
								boxSize='100px'	
								alt="Subir imagen"
								
								/>
								
								)}
								{/* ------------------------------------------------------------------------------------ */}
								
						
						{/* <Cloudinary></Cloudinary> */}

						<Button colorScheme='blue' onClick={handleAddProduct} w='full'>
							Add Product
						</Button>
					</VStack>
				</Box>
			</VStack>
		</Container>
  )
}

export default CreatePage
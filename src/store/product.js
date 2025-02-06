import {create} from "zustand"
// Zustand es una librería ligera y moderna para la gestión del estado en aplicaciones
// React. Fue creada por Paul Henschel y se ha vuelto popular por su simplicidad,
// eficiencia y flexibilidad. A diferencia de otras soluciones como Redux o Context
//  API, Zustand ofrece una API minimalista y directa para manejar el estado global 
//  en tu aplicación.
export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({products}),
    createProduct: async (newProduct) => {
        if(!newProduct.name || !newProduct.image || !newProduct.price){
            return {success: false, message: "Please fill in all fields"}
        }
		const token = localStorage.getItem("token"); 
        const res = await fetch("/api/products", {
            method: "POST",
            headers: {
				"Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        })
        const data = await res.json();
        set((state) => ({products: [...state.products, data.data]}))
        return {success: true, message: "Product created successfully"}
    },

    fetchProducts: async () => {
		const token = localStorage.getItem("token"); 
		const res = await fetch("/api/products",{
			method: "GET",
			headers: {
				"Authorization": `Bearer ${token}`,
            	"Content-Type": "application/json"
			}
		});
		if (!res.ok) {
			console.error("Error fetching products", res.status);
			return;
		}
		const data = await res.json();
		set({ products: data.message });
	},

    deleteProduct: async (pid) => {
		const token = localStorage.getItem("token");
		const res = await fetch(`/api/products/${pid}`, {
			method: "DELETE",
			headers: {
				"Authorization": `Bearer ${token}`,
            	"Content-Type": "application/json"
			}
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({ products: state.products.filter((product) => product._id !== pid) }));
		return { success: true, message: data.message };
	},

    updateProduct: async (pid, updatedProduct) => {
		const token = localStorage.getItem("token");
		const res = await fetch(`/api/products/${pid}`, {
			method: "PUT",
			headers: {
				"Authorization": `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedProduct),
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({
			products: state.products.map((product) => (product._id === pid ? data.data : product)),
		}));

		return { success: true, message: data.message };
	},
}))


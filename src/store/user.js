
import {create} from "zustand"

export const userStore = create((set) => ({

    signin: async (User) => {
		const res = await fetch("/api/auth/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(User)
        });

        let data;
        try{
            data = await res.json();
        }catch(error){
            console.log(error);
            return {success: false, message: "User no authenticated check failed"}
        }
		
        
		set({ user: data.message });
        localStorage.setItem("token", data)

		return {success: true, message: "User authenticated", data: data}
	},
}))



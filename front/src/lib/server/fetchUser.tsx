import { ILoginUser, IUser } from "@/interface/index";

export const postRegister = async (user: Omit<IUser, "id">) =>{
  console.log('entró');
  
  try {
    const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });


    console.log("Estado de respuesta:", response.status);
    console.log("Encabezados de respuesta:", response.headers);

      if (!response.ok) {
        console.error("Error en la solicitud", response.statusText)
        return null;
      }

      const data = await response.json();
      return data;
}  catch (error) {
  console.error("Error en la solicitud de registro", error);
  return null;
}
};



export const postLogin = async (credentials: ILoginUser) => {
  try {
    const response = await fetch("http://localhost:3000/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

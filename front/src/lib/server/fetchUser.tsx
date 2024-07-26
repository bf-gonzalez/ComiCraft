import { ILoginUser, IUser } from "@/interface/index";

export const postRegister = async (user: Omit<IUser, "id">) =>{
    const response = await fetch("", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      return data;
}

export const postLogin = async (credentials: ILoginUser) =>{
    const response = await fetch("", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      return data;
}
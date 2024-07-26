"use client";

import React, { useState, useContext} from "react";
import { validateLogin } from "@/helpers/validateLogin";
import { Bebas_Neue } from "next/font/google";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { UserContext } from "@/context/userContext";

const bebas = Bebas_Neue({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-bebas',
});

export const Login = () => {
    const router = useRouter();
    const {singIn} = useContext(UserContext);

    const [loginValue, setLoginValue] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginValue({ ...loginValue, [name]: value });

        const newErrors = validateLogin({ ...loginValue, [name]: value });
        setErrors(newErrors);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validateLogin(loginValue);
        if (Object.keys(validationErrors).length === 0) {
      const respuesta = await singIn(loginValue);
      if (respuesta) {
        Swal.fire({
          icon: "success",
          title: "bienvenido",
          text: "Disfrute de lo mejor!",
        });
        router.push("/home");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Tus Credenciales no son correctas!",
        });
      }
    }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <form onSubmit={handleSubmit} className="bg-custom-transparent shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={handleChange}
                        placeholder="Email"
                        value={loginValue.email}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 placeholder-black leading-tight focus:outline-none focus:shadow-outline bg-custom-input"
                    />
                    {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={handleChange}
                        placeholder="Contraseña"
                        value={loginValue.password}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 placeholder-black leading-tight focus:outline-none focus:shadow-outline bg-custom-input"
                    />
                    {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                </div>
                <div className="flex items-center justify-between">
                    <button type="submit" className={`${bebas.variable} font-sans 
                    login cursor-pointer
                    text-4xl text-white hover:text-yellow-400
                    transition-all custom-transition duration-300`}>Iniciar Sesión</button>
                </div>
            </form>
        </div>
    );
};

export default Login;

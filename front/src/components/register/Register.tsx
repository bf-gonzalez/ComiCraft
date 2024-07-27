"use client";

import React, { useContext, useState } from "react";
import { validateRegister } from "@/helpers/validateRegister";
import { Bebas_Neue } from "next/font/google";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/userContext";
import {postRegister} from '@/lib/server/fetchUser'

const bebas = Bebas_Neue({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-bebas',
});

export const Register = () => {
    const router = useRouter();
    const { signUp } = useContext(UserContext);

    const [signUpValues, setSignUp] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: "",
        phone: "",
        dob: ""
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignUp({ ...signUpValues, [name]: value });
        const newErrors = validateRegister({ ...signUpValues, [name]: value });
        setErrors(newErrors);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const validationErrors = validateRegister(signUpValues);

        if (Object.keys(validationErrors).length === 0) {
            const user = {
                email: signUpValues.email,
                password: signUpValues.password,
                confirmPassword: signUpValues.confirmPassword,
                name: signUpValues.name,
                address: signUpValues.address,
                phone: signUpValues.phone,
                dob: signUpValues.dob,
            };
            try {
                const respuesta = await postRegister(user);
                console.log(user);
                 

                if (respuesta) {
                    Swal.fire({
                        icon: "success",
                        title: "Bienvenido",
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
            } catch (error) {
                console.error("Error durante el registro:", error);
            }
        } else {
            console.log("Errores en el formulario:", validationErrors);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 ">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nombre:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        onChange={handleChange}
                        placeholder="Nombre"
                        value={signUpValues.name}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={handleChange}
                        placeholder="Email"
                        value={signUpValues.email}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={handleChange}
                        placeholder="Contraseña"
                        value={signUpValues.password}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">Confirmar Contraseña:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        onChange={handleChange}
                        placeholder="Confirmar Contraseña"
                        value={signUpValues.confirmPassword}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-xs italic">{errors.confirmPassword}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Teléfono:</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        onChange={handleChange}
                        placeholder="Teléfono"
                        value={signUpValues.phone}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.phone && <p className="text-red-500 text-xs italic">{errors.phone}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">Dirección:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        onChange={handleChange}
                        placeholder="Dirección"
                        value={signUpValues.address}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.address && <p className="text-red-500 text-xs italic">{errors.address}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="dob" className="block text-gray-700 text-sm font-bold mb-2">Fecha de Nacimiento:</label>
                    <input
                        type="date"
                        id="dob"
                        name="dob"
                        onChange={handleChange}
                        value={signUpValues.dob}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.dob && <p className="text-red-500 text-xs italic">{errors.dob}</p>}
                </div>
                <div className="flex items-center justify-between">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Registrarse</button>
                </div>
            </form>
        </div>
    );
};

export default Register;
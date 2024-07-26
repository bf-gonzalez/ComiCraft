"use client";

import React, { useContext, useState } from "react";
import { validateRegister } from "@/helpers/validateRegister";
import { Bebas_Neue } from "next/font/google";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/userContext";

const bebas = Bebas_Neue({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-bebas',
});

export const Register = () => {
    const router = useRouter();
    const { singUp } = useContext(UserContext);

    const [signUpValue, setSignUp] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: "",
        phone: "",
        birthday: ""
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignUp({ ...signUpValue, [name]: value });
        const newErrors = validateRegister({ ...signUpValue, [name]: value });
        setErrors(newErrors);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validateRegister(signUpValue);
        if (Object.keys(validationErrors).length === 0) {
            const user = {
                email: signUpValue.email,
                password: signUpValue.password,
                name: signUpValue.name,
                address: signUpValue.address,
                phone: signUpValue.phone,
                birthday: signUpValue.birthday,
            };
            const respuesta = await singUp(user);

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
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nombre:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        onChange={handleChange}
                        placeholder="Nombre"
                        value={signUpValue.name}
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
                        value={signUpValue.email}
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
                        value={signUpValue.password}
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
                        value={signUpValue.confirmPassword}
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
                        value={signUpValue.phone}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.phone && <p className="text-red-500 text-xs italic">{errors.phone}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="direccion" className="block text-gray-700 text-sm font-bold mb-2">Dirección:</label>
                    <input
                        type="text"
                        id="direccion"
                        name="address"
                        onChange={handleChange}
                        placeholder="Dirección"
                        value={signUpValue.address}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.direccion && <p className="text-red-500 text-xs italic">{errors.direccion}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="birthday" className="block text-gray-700 text-sm font-bold mb-2">Fecha de Nacimiento:</label>
                    <input
                        type="date"
                        id="birthday"
                        name="birthday"
                        onChange={handleChange}
                        value={signUpValue.birthday}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.birthdate && <p className="text-red-500 text-xs italic">{errors.birthdate}</p>}
                </div>
                <div className="flex items-center justify-between">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Registrarse</button>
                </div>
            </form>
        </div>
    );
};

export default Register;


"use client";

import React, { useState } from "react";
import { validateRegister } from "@/helpers/validateRegister";
import { Bebas_Neue } from "next/font/google";


const bebas = Bebas_Neue({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-bebas',
});

export const Register = () => {
    const [signUpValue, setSignUp] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        direccion: "",
        phone: "",
        birthdate: ""
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignUp({ ...signUpValue, [name]: value });
        const newErrors = validateRegister({ ...signUpValue, [name]: value });
        setErrors(newErrors);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validateRegister(signUpValue);
        if (Object.keys(validationErrors).length === 0) {
            alert(JSON.stringify(signUpValue, null, 2));
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <form onSubmit={handleSubmit} className="bg-custom-transparent shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <input
                        type="text"
                        id="name"
                        name="name"
                        onChange={handleChange}
                        placeholder="Nombre"
                        value={signUpValue.name}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 placeholder-black leading-tight focus:outline-none focus:shadow-outline bg-custom-input"
                    />
                    {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
                </div>
                <div className="mb-4">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={handleChange}
                        placeholder="Email"
                        value={signUpValue.email}
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
                        value={signUpValue.password}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 placeholder-black leading-tight focus:outline-none focus:shadow-outline bg-custom-input"
                    />
                    {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        onChange={handleChange}
                        placeholder="Confirmar Contraseña"
                        value={signUpValue.confirmPassword}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 placeholder-black leading-tight focus:outline-none focus:shadow-outline bg-custom-input"
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-xs italic">{errors.confirmPassword}</p>}
                </div>
                <div className="mb-4">
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        onChange={handleChange}
                        placeholder="Teléfono"
                        value={signUpValue.phone}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 placeholder-black leading-tight focus:outline-none focus:shadow-outline bg-custom-input"
                    />
                    {errors.phone && <p className="text-red-500 text-xs italic">{errors.phone}</p>}
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        id="direccion"
                        name="direccion"
                        onChange={handleChange}
                        placeholder="Dirección"
                        value={signUpValue.direccion}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 placeholder-black leading-tight focus:outline-none focus:shadow-outline bg-custom-input"
                    />
                    {errors.direccion && <p className="text-red-500 text-xs italic">{errors.direccion}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="birthdate" className="block text-yellow-600 text-sm font-bold mb-2">Fecha de Nacimiento:</label>
                    <input
                        type="date"
                        id="birthdate"
                        name="birthdate"
                        onChange={handleChange}
                        value={signUpValue.birthdate}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 placeholder-black leading-tight focus:outline-none focus:shadow-outline bg-custom-input"
                    />
                    {errors.birthdate && <p className="text-red-500 text-xs italic">{errors.birthdate}</p>}
                </div>
                <div className="flex items-center justify-between">
                    <button type="submit" className={`${bebas.variable} font-sans 
                    login cursor-pointer
                    text-4xl text-white hover:text-yellow-400
                    transition-all custom-transition duration-300`}>Registrarse</button>
                </div>
            </form>
        </div>
    );
};

export default Register;

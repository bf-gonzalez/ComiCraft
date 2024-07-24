"use client";


import React, { useState } from "react";
import { validateLogin } from "@/helpers/validateLogin";

export const Login = () => {
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validateLogin(loginValue);
        if (Object.keys(validationErrors).length === 0) {
            alert(JSON.stringify(loginValue, null, 2));
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={handleChange}
                        placeholder="Email"
                        value={loginValue.email}
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
                        value={loginValue.password}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                </div>
                <div className="flex items-center justify-between">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Iniciar Sesión</button>
                </div>
            </form>
        </div>
    );
};

export default Login;
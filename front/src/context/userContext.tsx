"use client";
import { ILoginUser, ILoginUserResponse, IUser, IUserContext } from "@/interface/index";
import { postRegister, postLogin } from "@/lib/server/fetchUser";
import React, { createContext, useEffect, useState } from "react";
import { jwtDecode , JwtPayload } from 'jwt-decode';

interface DecodedToken extends JwtPayload {
  id: string;
  name: string;
  email: string;
}

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const UserContext = createContext<IUserContext>({
    user: null,
    setUser: () => {},
    isLogged: false,
    setIsLogged: () => {},
    signIn: async () => false,
    signUp: async () => false,
    logOut: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<Partial<ILoginUserResponse> | null>(null);
    const [isLogged, setIsLogged] = useState(false);

    const signUp = async (user: Omit<IUser, "id">) => {
        console.log('entró');
        
        try {
            const data = await postRegister(user);
            if (data.id) {
                signIn({ email: user.email, password: user.password });
                return true;
            }
            return false;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const signIn = async (credentials: ILoginUser) => {
        try {
            const data = await postLogin(credentials);
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
            localStorage.setItem("token", data.token);
            const token = localStorage.getItem("token") || "";
            const decoded = decodeToken(token);
            localStorage.setItem("decodedUser", JSON.stringify(decoded));
            setIsLogged(true);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const logOut = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("decodedUser");
        setUser(null);
        setIsLogged(false);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = decodeToken(token);
            if (decoded) {
                console.log('Datos del token desencriptados:', decoded);
                localStorage.setItem("decodedUser", JSON.stringify(decoded));
                setUser(decoded as Partial<ILoginUserResponse>);
                setIsLogged(true);
            }
        }
    }, []);

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setUser(JSON.parse(user));
            return;
        }
        setUser(null);
    }, []);

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                isLogged,
                setIsLogged,
                signIn,
                signUp,
                logOut,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
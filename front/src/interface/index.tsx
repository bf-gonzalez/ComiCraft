import React from "react";

export interface IRegisterUser {
name: string;
email:string;
password:string;
address:string;
phone: string;
dob: string;
}

export interface IRegisterUserResponse {
  name: string;
  email:string;
  password:string;
  address:string;
  phone: string;
  dob: string;
  role: string;
  credential: ICreadential;
  }

  export interface ICreadential {
  password: string;
  id: number;
}

export interface ILoginUser {
  email: string
  password: string
}

  export interface IUser {
    id: number;
    name: string;
    email:string;
    password:string;
    address:string;
    phone: string;
    dob: string;
    role?: string;
    credential?: ICreadential;
  }

  export interface ILoginUserResponse {
    loggin: boolean;
    user: Partial<IUser> | null;
    token: string;
  }

  export interface IUserContext {
    user: Partial<ILoginUserResponse> | null,
    setUser: React.Dispatch<React.SetStateAction<Partial<ILoginUserResponse> | null>>,
    isLogged: boolean,
    setIsLogged: (isLogged: boolean) => void,
    signIn: (credentials: ILoginUser) => Promise<boolean>,
    signUp: (user: Omit<IRegisterUser, "id">)=> Promise<boolean>,
    logOut: () => void,
  }

  export interface MembershipOption {
    name: string;
    price: number;
    description: string;
    features: {
        text: string;
        isAvailable: boolean;
    }[];
}
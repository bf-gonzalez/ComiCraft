'use client';

import decodeJwt from "@/utils/decodeGJWT";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useState } from "react";


export default function GLogin() {

    const [email, setEmail] = useState<string | null>(null);
    const [pfp,setpfp] = useState<string | null>(null);

    function handleSuccess(googleCredentialsResponse: CredentialResponse) {
        console.log("googleCredentialsResponse", googleCredentialsResponse );
        if (googleCredentialsResponse.credential) {
            const  { payload } = decodeJwt(googleCredentialsResponse.credential);
            console.log("payload credential", payload);
            setEmail(payload.email);
            setpfp(payload.picture);
        }
    }

    function handleError() {
        console.log("Login por Google Fallido");
    }

    return(
        <div>
            {email === null && <GoogleLogin onError={handleError} onSuccess = {handleSuccess} />}

            {email && <p>Has inicado sesión con tu correo de google: {email} !</p>}

            {pfp && <img src={pfp} className="rounded-xl bg-yellow-400 p-1 bg-opacity-50"></img>}

        </div>
    )
}
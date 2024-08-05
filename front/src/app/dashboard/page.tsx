'use client'
import AlertSignIn from "@/components/alertSignIn/AlertSignIn";
import { UserContext } from "@/context/userContext";
import { Bebas_Neue, Josefin_Sans } from "next/font/google";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { useEffect, useState } from "react";
import styles from "@/components/backgrounds/experiment.module.css";

const  josefin = Josefin_Sans({
    subsets:['latin'],
    weight: ['600'],
    variable: '--font-bebas',
});
const bebas = Bebas_Neue({
    subsets:['latin'],
    weight: ['400'],
    variable: '--font-bebas',
});

export default function dashboard() {

    const {isLogged, user} = useContext(UserContext);
    const router = useRouter();
    const [userName, setUserName] = useState<string | null>(null);

    useEffect(() => {
        const decodedUser = localStorage.getItem("decodedUser");
        if (decodedUser) {
          const user = JSON.parse(decodedUser);
          setUserName(user.name);
        }
      }, []);


    return (
        <div className={styles.fondo}>

        {!isLogged ? (<AlertSignIn></AlertSignIn>) : (

<main className="flex flex-col max-w-screen-2xl pt-44 pb-36">

<section className="flex flex-row-reverse justify-evenly items-center">

<div className="flex flex-col flex-wrap max-w-screen-xl items-end ">
<p className={`${bebas.variable} font-sans 
            text-4xl text-rose-800
            self-center pb-6
            `}>CREADOR (CONDICIONAL)</p>
<h1 className={`${josefin.variable} font-sans 
            text-7xl text-white pb-1
            `}>BIENVENIDO/A</h1>
<h2 className={`${josefin.variable} font-sans 
            text-7xl text-white uppercase self-center
            
            `}> {userName} </h2>

<section className="flex flex-row space-x-12 self-center pt-6">
<p className={`${bebas.variable} font-sans 
            text-3xl text-yellow-400 max-w-96
`}>(NÚMERO) SEGUIDORES</p>    
<p className={`${bebas.variable} font-sans 
            text-3xl text-yellow-400 max-w-96
`}>(NÚMERO) COMICS</p>    
</section>                    

</div>

<div className="flex flex-col items-center">
{/* SUSTITUIR H1 POR EL BOTÓN DE SUBIR ARCHIVO:                    */}
<img src="/images/userIcon2.png" className="max-w-72 pb-8  "/>  

<button className="">
<p className={`${josefin.variable} font-sans uppercase text-white max-w-60 hover:text-blue-500 duration-300 self-center text-3xl`}>Cambiar foto de perfil</p>
</button>

</div>

</section>



{/* EXCLUSIVO DE CREADORES: */}
<section className="">
<img src="/images/contenidoSubido.png" className="max-w-lg flex ml-auto mr-auto pt-12 "/>   

<div className="flex flex-col max-w-9xl flex-wrap pt-10 items-center">

        {/* AQUÍ VA UN CONDICIONAL                             */}
        <h1 className={`${josefin.variable} font-sans 
            text-6xl text-rose-800 max-w-[60vw] text-center pb-6
`}>AÚN NO HAS SUBIDO COMICS!</h1>

<button type="button" onClick={() => router.push('/upload')}>
            <img src="/images/subirExample.png" alt="añadir"
            className="subir w-96
            duration-500 hover:scale-105 cursor-pointer pb-5 "/>
<h1 className={`${josefin.variable} font-sans text-center`}>AÑADE MÁS CONTENIDO!</h1>
</button>
</div>   

</section> 

{/* PARA TODOS LOS USERS: */}
<section className="">
<img src="/images/biblioteca.png" className="max-w-sm flex  ml-auto mr-auto pt-48 "/>

<div className="flex flex-col max-w-9xl flex-wrap pt-10 items-center ">

{/* AQUÍ VA UN CONDICIONAL                             */}
<h1 className={`${josefin.variable} font-sans 
            text-6xl text-rose-800 max-w-[60vw] text-center pb-6
`}>AÚN NO HAS AÑADIDO COMICS!</h1>

<button type="button" onClick={() => router.push('/home')}>
            <img src="/images/subirExample.png" alt="añadir"
            className="subir w-96
            duration-500 hover:scale-105 cursor-pointer pb-5 "/>
<h1 className={`${josefin.variable} font-sans text-center`}>DESCUBRE MÁS CONTENIDO!</h1>
</button>
</div>   

</section>                           

</main>

        )}


        

        </div>
    )
}
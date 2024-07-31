'use client'
import AlertSignIn from "@/components/alertSignIn/AlertSignIn";
import { Bebas_Neue, Josefin_Sans } from "next/font/google";
import { useRouter } from "next/navigation";

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

    const router = useRouter();


    return (
        <div className="h-auto bg-slate-950">

        {/* {!isLogged ? (<AlertSignIn></AlertSignIn>) : ()} */}


        <main className="flex flex-col max-w-screen-2xl pt-64 pb-36">

        <section className="flex flex-row-reverse justify-evenly items-center">

        <div className="flex flex-col max-w-screen-xl items-end ">
        <h1 className={`${josefin.variable} font-sans 
                    text-7xl text-white pb-4
                    `}>BIENVENIDO/A</h1>
        <h2 className={`${josefin.variable} font-sans 
                    text-7xl text-white
                    
                    `}>
                        {/* SUSTITUIR NOMBRE POR LA SIGUIENTE LÍNEA:
                        {user?.user?.name} */}
                        NOMBRE
        </h2>
        <p>CREADOR (CONDICIONAL)</p>
        </div>
        
        <div className="flex flex-col items-center">
        {/* SUSTITUIR H1 POR EL BOTÓN DE SUBIR ARCHIVO:                    */}
        <h1 className={`${josefin.variable} font-sans 
                    text-5xl text-red-600 max-w-96
        `}>AQUÍ VA LA FOTO DE PERFIL</h1>

        <button>
        <p className="text-white hover:text-blue-500 duration-300">Subir foto de perfil</p>
        </button>

        </div>

        </section>

        <section className="flex flex-row pt-12 space-x-12 justify-end mr-12 ">
        <p className={`${bebas.variable} font-sans 
                    text-3xl text-yellow-400 max-w-96
        `}>NÚMERO DE SEGUIDORES</p>    
        <p className={`${bebas.variable} font-sans 
                    text-3xl text-yellow-400 max-w-96
        `}>NÚMERO DE ARCHIVOS SUBIDOS</p>    
        </section>                    

        {/* EXCLUSIVO DE CREADORES: */}
        <section className="">
        <img src="/images/contenidoSubido.png" className="max-w-lg flex ml-auto mr-auto pt-48 "/>   

        <div className="flex flex-row max-w-9xl flex-wrap pt-10 ml-12 mr-12 space-x-14 space-y-14 ">
        
        {/* EN EL SIGUIENTE BOTÓN, DEBERÍA TRAER UNA IMÁGEN Y PRECIO DE LA DB: */}
        <button type="button" onClick={() => router.push('/home')}>
                    <img src="/images/activeSubscription.png" alt="añadir"
                    className="subir w-96
                    duration-500 hover:scale-105 cursor-pointer pb-5 "/>
        <h1>THE BOYS</h1>
        <h1>TIER 3</h1>
        </button>

                {/* *AQUÍ VA UN CONDICIONAL*                             */}
                <h1 className={`${josefin.variable} font-sans 
                    text-6xl text-rose-800 max-w-96 text-left
        `}>AÚN NO HAS SUBIDO CONTENIDO!</h1>

        <button type="button" onClick={() => router.push('/upload')}>
                    <img src="/images/subirExample.png" alt="añadir"
                    className="subir w-96
                    duration-500 hover:scale-105 cursor-pointer pb-5"
                    />
        <h1>AÑADIR MÁS CONTENIDO!</h1>
        </button>
        </div>   

        </section> 

        {/* PARA TODOS LOS USERS: */}
        <section className="">
        <img src="/images/biblioteca.png" className="max-w-sm flex  ml-auto mr-auto pt-48 "/>

        <div className="flex flex-row max-w-9xl flex-wrap pt-10 ml-12 mr-12 space-x-14 space-y-14 ">
        
        {/* EN EL SIGUIENTE BOTÓN, DEBERÍA TRAER UNA IMÁGEN, NOMBRE Y PRECIO DE LA DB: */}
        <button type="button" onClick={() => router.push('/home')}>
                    <img src="/images/activeSubscription.png" alt="añadir"
                    className="subir w-96
                    duration-500 hover:scale-105 cursor-pointer pb-5"/>
        <h1>THE BOYS</h1>
        <h1>TIER 3</h1>
        </button>

        {/* *AQUÍ VA UN CONDICIONAL*                             */}
        <h1 className={`${josefin.variable} font-sans 
                    text-6xl text-rose-800 max-w-96 text-left
        `}>AÚN NO HAS AÑADIDO CONTENIDO!</h1>

        <button type="button" onClick={() => router.push('/home')}>
                    <img src="/images/subirExample.png" alt="añadir"
                    className="subir w-96
                    duration-500 hover:scale-105 cursor-pointer pb-5 "/>
        <h1>DESCUBRE MÁS CONTENIDO!</h1>
        </button>
        </div>   

        </section>                           

        </main>

        </div>
    )
}
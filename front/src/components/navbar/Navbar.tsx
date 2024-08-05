'use client'
import { Bebas_Neue } from "next/font/google"
import { usePathname, useRouter } from "next/navigation"
import { useContext } from "react";
import { UserContext } from "@/context/userContext";

const  bebas = Bebas_Neue({
    subsets:['latin'],
    weight: ['400'],
    variable: '--font-bebas',
});

function Navbar() {
    const {isLogged, logOut} = useContext(UserContext);
    
    const router = useRouter();

    const pathname = usePathname();

    const handleLogOut= () => {
        logOut();
        router.push("/")
    }

    return(
        <main>
        {pathname !== '/' && (
            <div className="absolute top-0 flex flex-row w-full">

                <section className="flex flex-row items-center space-x-8 ml-4 pt-4 w-[100vw]">
                <button type="button" onClick={() => router.push('/home')}>
                    <img src="/images/ccLogo.png" alt="logo"
                    className="logo
                    duration-500 hover:scale-105 cursor-pointer h-24"
                    />
                </button>
                </section>

                <section className="flex flex-row align-middle space-x-12 mr-4">


                {pathname !== '/membership' && isLogged && (
                <button type="button" className="flex flex-row self-center border-2
                border-yellow-400 rounded-2xl items-center w-60 h-16
                bg-black bg-opacity-0 hover:bg-opacity-80 p-6"
                onClick={() => router.push('/membership')}>
                <img
                src="/images/crown.png"
                className="w-10 flex h-8 "
                alt="crown"
                />
                    <h1 className={`${bebas.variable} font-sans 
                login cursor-pointer
                text-4xl text-white hover:text-yellow-400
                transition-all custom-transition duration-300 pl-2`}>SUSCRIBIRSE</h1>
                </button>
                )}
                

                {pathname !== '/all-comics' &&  (
                    <button type="button" onClick={() => router.push('/all-comics')}>
                    <h1 className={`${bebas.variable} font-sans 
                login cursor-pointer
                text-4xl text-white hover:text-yellow-400
                transition-all custom-transition duration-300`}>COMICS</h1>
                </button>
                )}

                {pathname === '/home' &&  (
                    <a href="#creatorsHome" className="self-center">
                        <h1 className={`${bebas.variable} font-sans 
                    login cursor-pointer
                    text-4xl text-white hover:text-yellow-400
                    transition-all custom-transition duration-300`}>CREADORES</h1>
                    </a>
                )}

                {pathname !== '/register' && !isLogged && (
                    <button type="button" onClick={() => router.push('/register')} 
                    className="">
                        <h1 className={`${bebas.variable} font-sans 
                    login cursor-pointer
                    text-4xl text-white hover:text-yellow-400
                    transition-all custom-transition duration-300`}>REGISTRARSE</h1>
                    </button>
                )}
                {pathname !== '/login' && !isLogged && (
                    <button type="button" onClick={() => router.push('/login')}>
                        <h1 className={`${bebas.variable} font-sans 
                    login cursor-pointer
                    text-4xl text-white hover:text-yellow-400
                    transition-all custom-transition duration-300`}>INICIAR_SESIÓN</h1>
                    </button>
                )}
                {pathname !== '/dashboard' && isLogged &&  (
                    <button type="button" onClick={() => router.push('/dashboard')}>
                        <h1 className={`${bebas.variable} font-sans 
                    login cursor-pointer
                    text-4xl text-white hover:text-yellow-400
                    transition-all custom-transition duration-300`}>PERFIL</h1>
                    </button>
                )}


{pathname !== '/' && isLogged && (        
        <button type="button" onClick={handleLogOut} >
<p
                className={`${bebas.variable} font-sans 
                home cursor-pointer
                text-4xl text-white
                rounded-xl p-2 hover:text-red-600
                transition-all custom-transition duration-300
                `} 
                 >CERRAR_SESIÓN</p>
            </button> 
        
        )}

                </section>
            </div>

        )}
        </main>
    )
}export default Navbar;
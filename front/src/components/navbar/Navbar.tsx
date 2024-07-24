'use client'
import { Bebas_Neue } from "next/font/google"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image";
import SearchBar from "../searchBar/SearchBar";

const  bebas = Bebas_Neue({
    subsets:['latin'],
    weight: ['400'],
    variable: '--font-bebas',
});

function Navbar() {
    
    const router = useRouter();

    const pathname = usePathname();

    return(
        <main>

        {pathname !== '/' && (
            <div className="absolute top-0 flex flex-row">

                <section className="flex flex-row items-center w-[88vw] h-24 justify-evenly p-2">
                <SearchBar placeholder="buscar por nombre" />
                <button type="button" onClick={() => router.push('/home')}>
                    <Image src="/images/ccLogo.png" alt="logo"
                    className="logo
                    duration-500 hover:scale-105 cursor-pointer ml-2 mt-4"
                    height={100} width={200}/>
                </button>
                </section>

                <section className="flex flex-row align-middle mr-6 space-x-12">

                {pathname !== '/register' && (
                    <button type="button" onClick={() => router.push('/register')} 
                    className="">
                        <h1 className={`${bebas.variable} font-sans 
                    login cursor-pointer
                    text-4xl text-white hover:text-yellow-400
                    transition-all custom-transition duration-300`}>REGISTRARSE</h1>
                    </button>
                )}
                {pathname !== '/login' && (
                    <button type="button" onClick={() => router.push('/login')}>
                        <h1 className={`${bebas.variable} font-sans 
                    login cursor-pointer
                    text-4xl text-white hover:text-yellow-400
                    transition-all custom-transition duration-300`}>LOGIN</h1>
                    </button>
                )}

                </section>
            </div>

        )}
        </main>
    )
}export default Navbar;
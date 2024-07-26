'use client'
import { Bebas_Neue } from "next/font/google"
import { usePathname, useRouter } from "next/navigation"
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
            <div className="absolute top-0 flex flex-row w-full">

                <section className="flex flex-row items-center space-x-8 ml-4 pt-4">
                <button type="button" onClick={() => router.push('/home')}>
                    <img src="/images/ccLogo.png" alt="logo"
                    className="logo
                    duration-500 hover:scale-105 cursor-pointer h-24"
                    />
                </button>
                <SearchBar placeholder="Buscar" />
                </section>

                <section className="flex flex-row align-middle space-x-12 mr-4">

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
                {pathname !== '/dashboard' && (
                    <button type="button" onClick={() => router.push('/dashboard')}>
                        <h1 className={`${bebas.variable} font-sans 
                    login cursor-pointer
                    text-4xl text-white hover:text-yellow-400
                    transition-all custom-transition duration-300`}>DASHBOARD</h1>
                    </button>
                )}

                </section>
            </div>

        )}
        </main>
    )
}export default Navbar;
import { Bebas_Neue } from "next/font/google";
import { useRouter } from "next/navigation";

const  bebas = Bebas_Neue({
    subsets:['latin'],
    weight: ['400'],
    variable: '--font-bebas',
});   

function AlertSignIn() {

    const router = useRouter();

    return (

        <main className="pt-56 pb-36">
            <section className="text-center">
                <h1 className={`${bebas.variable} font-sans 
                    text-8xl text-yellow-400
                `}>No has iniciado sesión :( </h1>
                <h2 className={`${bebas.variable} font-sans 
                    text-7xl pt-6 text-rose-800
                `}>Inicia sesión o crea una cuenta aquí:</h2>
            </section>

            <section className=" text-center space-x-10 mt-12">

                <button type="button" onClick={() => router.push('/login')}
                className= {`${bebas.variable} font-sans
              text-white text-5xl
                hover:scale-105  hover:shadow-lg
                cursor-pointer  border-rose-800
                border-4 w-72 h-24 rounded-xl
                transition duration-300
              hover:text-yellow-400`}> INICIAR SESIÓN
                </button>

                <button type="button" onClick={() => router.push('/register')}
                className= {`${bebas.variable} font-sans
              text-white text-5xl
                hover:scale-105  hover:shadow-lg
                cursor-pointer  border-rose-800
                border-4 w-72 h-24 rounded-xl
                transition duration-300
              hover:text-yellow-400`}> REGISTRARSE
                </button>

            </section>

        </main>
    )
}

export default AlertSignIn;
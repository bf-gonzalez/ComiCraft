'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";

const HomeButtons: React.FC = () => {
    const router = useRouter()

    return(
        <main className="w-screen h-screen relative">
            <div className="flex flex-wrap max-w-3xl max-h-screen absolute inset-x-0 bottom-6 ml-72 space-x-24 space-y-4"> 

                <div className="flex flex-row justify-between space-x-24">
                <button type="button" onClick={() => router.push('/home')}>
                    <img src="/images/homeLandBtn.png"
                    className=" h-16 hover:scale-105 
                    transition-all custom-transition duration-500">
                    </img>
                </button>
                

                <button type="button" onClick={() => router.push('/login')}>
                    <img src="/images/loginLandBtn.png"
                    className=" h-16 hover:scale-105 
                    transition-all custom-transition duration-500">
                    </img>
                </button>
                </div>

                <button type="button" onClick={() => router.push('/register')}>
                    <img src="/images/registerLandBtn.png"
                    className=" h-16 hover:scale-105 
                    transition-all custom-transition duration-500">
                    </img>
                </button>

            </div>
        </main>
    )
}

export default HomeButtons;
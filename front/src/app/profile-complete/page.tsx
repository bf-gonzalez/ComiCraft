'use client'
import Register from "@/components/register/Register"
import styles from "../../components/backgrounds/justice.module.css"
import CompleteProfile from "@/components/registerCompleteProfile/RegisterCompleteProfile"
import { useEffect, useState } from "react"

const CompleteProfilePage: React.FC = () => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("googleToken");

        if (storedToken) {
            setToken(storedToken); 
        } else {
            console.error("Token de Google no encontrado en LocalStorage");
        }
    }, []);

    return ( 
        <main className={styles.fondo}>
        <div className="flex h-screen">
            <div className="flex-1"></div>
            <div className="p-12 mx-38 mt-8 w-2/4">
                <CompleteProfile token={token}/>
            </div>
        </div>
    </main>
        
    )

}

export default CompleteProfilePage;

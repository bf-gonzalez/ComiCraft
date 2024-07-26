import Login from "@/components/login/Login"
import styles from "../../components/backgrounds/cyclops.module.css"

export default function loginPage() {
    return (
        <main className={styles.fondo}>
        <div className="flex h-screen">
            <div className="flex-1"></div>
            <div className="p-12 mx-38 mt-8 w-2/4">
            <Login/> 
            </div>
        </div>
        </main>
    )
}
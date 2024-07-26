import Login from "@/components/login/Login"
import styles from "../../components/regularBackground/RegularBackground.module.css"

export default function loginPage() {
    return (
        <main className={styles.fondo}>
        <div className="w-screen h-screen">
           <Login/>
        </div>
        </main>
    )
}
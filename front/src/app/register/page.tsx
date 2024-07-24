import Register from "@/components/register/Register"
import styles from "../../components/regularBackground/RegularBackground.module.css"

export default function loginPage() {
    return (
        <main className={styles.fondo}>
        <div className="h-screen">
            <Register/>
        </div>
        </main>
    )
}
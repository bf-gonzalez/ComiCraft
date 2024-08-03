import Register from "@/components/register/Register"
import styles from "../../components/backgrounds/justice.module.css"

export default function Cancel() {
    return (
        <main className={styles.fondo}>
            <div className="flex h-screen">
                <div className="flex-1"></div>
                <div className="p-12 mx-38 mt-8 w-2/4">
                    tu pago fue rechazado
                </div>
            </div>
        </main>
    )
}
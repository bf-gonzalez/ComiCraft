import React from 'react'
import styles from "../../components/backgrounds/cyclops.module.css"

export default function Success() {
    return (
        <main className={styles.fondo}>
            <div className="flex h-screen">
            <div className="flex-1"></div>
            <div className="p-12 mx-38 mt-8 w-2/4">
            gracias por tu compra
            </div>
        </div>
        </main>
   );      
}

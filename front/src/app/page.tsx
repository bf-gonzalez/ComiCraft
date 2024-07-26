import styles from "../components/homeImage/HomeImage.module.css"
import HomeButtons from "@/components/homeButtons/HomeButtons";

export default function LandingPage() {
    return(
        <main className={styles.fondo}>
            <HomeButtons />
        </main>
    );
}
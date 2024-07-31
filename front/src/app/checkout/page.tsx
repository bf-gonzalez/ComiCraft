import { AnnualMembershipCard, MonthlyMembershipCard } from "@/components/membershipCard/MembershipCard"
import styles from "../../components/regularBackground/RegularBackground.module.css"

export default function Checkout() {
    return (
        <>
            <main className={styles.fondo}>
                <div className="flex items-center justify-center min-h-screen">    
                     <div className="mr-4">
                     <MonthlyMembershipCard />   
                    </div>
                    <div>
                      <AnnualMembershipCard />  
                    </div>
                </div>
            </main>
        </>
    )
}

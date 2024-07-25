import styles from "../../components/regularBackground/RegularBackground.module.css"

export default function TermsOfServicePage() {
    return (
        <main className={styles.fondo}>
            <div className="w-full bg-gradient-to-r from-[#F5C702]/70 to-[#01061A]/70 p-4 mt-32"> {/* Contenedor con gradiente de fondo y margen inferior */}
                <h1 className="text-3xl font-bold mb-4">Términos de Servicio</h1>
            </div>
            <div className="h-screen p-8"> {/* Añadido mt-24 para margen superior */}
                
                <section className="mb-6"> {/* Añadido mt-32 para compensar el espacio del contenedor fijo */}
                    <h2 className="text-2xl font-semibold mb-2">1. Términos</h2>
                    <p>Al acceder a esta página web, usted acepta estar sujeto a estos términos de servicio, todas las leyes y regulaciones aplicables, y acepta que es responsable del cumplimiento de cualquier ley local aplicable. Si no está de acuerdo con alguno de estos términos, se le prohíbe usar o acceder a este sitio.</p>
                </section>
                
                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">2. Uso de la Licencia</h2>
                    <p>Se concede permiso para descargar temporalmente una copia de los materiales (información o software) en el sitio web de ComiCraft para uso personal y no comercial. No debe modificar o copiar los materiales, usar los materiales para cualquier propósito comercial, o para cualquier exhibición pública (comercial o no comercial), intentar descompilar o realizar ingeniería inversa de cualquier software contenido en el sitio web de ComiCraft, eliminar cualquier derecho de autor u otras notaciones de propiedad de los materiales, o transferir los materiales a otra persona o "reflejar" los materiales en cualquier otro servidor.</p>
                </section>
                
                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">3. Descargo de Responsabilidad</h2>
                    <p>Los materiales en el sitio web de ComiCraft se proporcionan exactamente como están propuestas por los autores. ComiCraft no ofrece garantías, expresas o implícitas, y por la presente renuncia y niega todas las demás garantías, incluidas, sin limitación, las garantías implícitas o condiciones de comerciabilidad, idoneidad para un propósito particular, o no infracción de la propiedad intelectual u otra violación de derechos. Además, ComiCraft no garantiza ni hace ninguna representación con respecto a la precisión, los resultados probables o la fiabilidad del uso de los materiales en su sitio web o de otra manera relacionado con dichos materiales o en cualquier sitio vinculado a este sitio. ComiCraft no se hace responsable del mal uso de la condición de edad para acceder a contenido para mayores de edad.</p>
                </section>
                
                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">4. Devoluciones</h2>
                    <p>No se realizarán devoluciones de pagos. Los usuarios pueden cancelar su suscripción en cualquier momento.</p>
                </section>
                
                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">5. Revisión y Errata</h2>
                    <p>Los materiales que aparecen en el sitio web de ComiCraft pueden incluir errores técnicos, tipográficos o fotográficos. ComiCraft no garantiza que ninguno de los materiales en su sitio web sea preciso, completo o actual. ComiCraft puede realizar cambios en los materiales contenidos en su sitio web en cualquier momento sin previo aviso. Sin embargo, ComiCraft no se compromete a actualizar los materiales.</p>
                </section>
                
                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">6. Links</h2>
                    <p>ComiCraft no ha revisado todos los sitios vinculados a su sitio web y no es responsable del contenido de ningún sitio vinculado. La inclusión de cualquier enlace no implica aprobación por parte de ComiCraft del sitio. El uso de cualquier sitio web vinculado es bajo el propio riesgo del usuario.</p>
                </section>
                
                <section className="mb-6">
                    <h2 className="text-2xl font-semibold mb-2">7. Modificaciones de los Términos de Servicio</h2>
                    <p>ComiCraft puede revisar estos términos de servicio para su sitio web en cualquier momento sin previo aviso. Al usar este sitio web, usted acepta estar sujeto a la versión actual de estos términos de servicio.</p>
                </section>
            </div>
        </main>
    )
}
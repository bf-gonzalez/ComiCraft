import styles from "../../components/regularBackground/RegularBackground.module.css"

export default function PrivacyPolicyPage() {
    return (
        <main className={styles.fondo}>
            <div className="w-full bg-gradient-to-r from-[#F5C702]/70 to-[#01061A]/70 p-4 mt-32">
                <h1 className="text-3xl font-bold mb-4">Nuestra política de privacidad</h1>
            </div>
            <div className="h-screen p-8">
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-2">1. Información que recopilamos</h2>
                    <p>Recopilamos información personal que nos proporcionas al registrarte para una suscripción mensual.</p>
                </section>
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-2">2. Uso de la información</h2>
                    <p>Utilizamos la información personal de los usuarios para los siguientes propósitos:</p>
                    <ul className="list-disc list-inside">
                        <li>Para mejorar el servicio al cliente: La información que proporcionas nos ayuda a responder a tus solicitudes de servicio al cliente y necesidades de soporte de manera más eficiente.</li>
                        <li>Para personalizar la experiencia del usuario: Podemos usar la información de manera agregada para entender cómo nuestros usuarios como grupo utilizan los servicios y recursos proporcionados en nuestro sitio.</li>
                        <li>Para mejorar nuestro sitio: Podemos usar los comentarios que proporcionas para mejorar nuestros productos y servicios.</li>
                        <li>Para procesar pagos: Podemos usar la información que los usuarios proporcionan sobre sí mismos al realizar un pedido solo para proporcionar servicio a ese pedido. No compartimos esta información con terceros, excepto en la medida necesaria para proporcionar el servicio.</li>
                        <li>Para ejecutar una promoción, concurso, encuesta u otra característica del sitio: Para enviar a los usuarios información que acordaron recibir sobre temas que creemos serán de su interés.</li>
                        <li>Para enviar correos electrónicos periódicos: Podemos usar la dirección de correo electrónico para enviar información y actualizaciones relacionadas con su pedido. También puede usarse para responder a sus consultas, preguntas y/u otras solicitudes. Si el usuario decide optar por nuestra lista de correo, recibirá correos electrónicos que pueden incluir noticias de la empresa, actualizaciones, información relacionada con productos o servicios, etc. Si en algún momento el usuario desea darse de baja para no recibir futuros correos electrónicos, incluimos instrucciones detalladas para darse de baja al final de cada correo electrónico o el usuario puede contactarnos a través de nuestro sitio.</li>
                    </ul>
                </section>
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-2">3. Compartir información</h2>
                    <p>No compartimos tu información personal con terceros, excepto cuando sea necesario para cumplir con la ley.</p>
                </section>
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-2">4. Seguridad de la información</h2>
                    <p>Implementamos medidas de seguridad para proteger tu información personal.</p>
                </section>
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-2">5. Cambios a esta política</h2>
                    <p>Podemos actualizar esta política de privacidad periódicamente. Te notificaremos sobre cualquier cambio importante.</p>
                </section>
            </div>
        </main>
    )
}
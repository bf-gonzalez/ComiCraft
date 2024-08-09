import { Bebas_Neue } from 'next/font/google';
import React from 'react';
import axios from 'axios';
import { GoAlert } from "react-icons/go";

const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-bebas',
});

function UnBanUserButton({ userId }) {
  // Función para verificar si el ID es un UUID válido
  const isValidUUID = (id) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  };

  // Función para manejar el ban de usuario
  const handleBanUser = async () => {
    // Verifica que el ID sea un UUID válido
    if (!isValidUUID(userId)) {
      console.error('Invalid UUID:', userId);
      return;
    }

    try {
      // Realiza la solicitud PUT para cambiar el estado isDeleted del usuario
      const response = await axios.put(`http://localhost:3000/users/deleted/${userId}`);
      console.log('User banned successfully:', response.data);
    } catch (error) {
      console.error('Error banning user:', error);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleBanUser} // Llama a la función handleBanUser al hacer clic
        className={`${bebas.variable} font-sans bg-red-700 text-black uppercase w-[10vw] h-[10vh] rounded-2xl text-2xl flex flex-col items-center border-black border-2 hover:text-white hover:scale-105 hover:border-white duration-300 self-center`}
      >
        DESBLOQUEAR USUARIO
        <GoAlert className='size-[3vw]' />
      </button>
    </>
  );
}

export default UnBanUserButton;

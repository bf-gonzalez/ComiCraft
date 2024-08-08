import { Bebas_Neue } from 'next/font/google';
import React, { useState } from 'react';
import { GoAlert } from "react-icons/go";

const bebas = Bebas_Neue({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-bebas',
});

function BanUserButton() {

  return (
    <>
      <button type="submit" className={`${bebas.variable} font-sans  bg-red-700  text-black uppercase w-[10vw] h-[10vh] rounded-2xl text-2xl
      flex flex-col items-center border-black border-2 hover:text-white hover:scale-105 hover:border-white duration-300 self-center`}>
        BANEAR USUARIO
        <GoAlert className='size-[3vw]'/>
      </button>
      </>
  );
};

export default BanUserButton;
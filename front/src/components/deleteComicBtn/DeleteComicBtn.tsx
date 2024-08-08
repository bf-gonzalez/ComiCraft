import { Bebas_Neue } from 'next/font/google';
import React, { useState } from 'react';
import { GoAlert } from "react-icons/go";

const bebas = Bebas_Neue({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-bebas',
});

function DeleteComicButton() {

  return (
    <>
      <button type="submit" className={`${bebas.variable} font-sans  bg-yellow-500 hover:bg-red-700  text-black uppercase w-[10vw] h-[8vh] rounded-2xl text-lg self-center
      flex flex-col items-center border-black border-2  hover:scale-105 duration-300 hover:text-white`}>
        BORRAR COMIC
        <GoAlert className='size-[3vw]'/>
      </button>
      </>
  );
};

export default DeleteComicButton;
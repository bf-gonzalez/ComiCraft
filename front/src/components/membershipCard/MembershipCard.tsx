"use client";
import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-bebas',
});

export const MonthlyMembershipCard = () => (
    <div className="w-full max-w-sm p-4  rounded-lg shadow bg-custom-transparent ">
    <h5 className="mb-4 text-xl font-medium text-custom-input text-yellow-500 ">Plan estándar</h5>
    <div className="flex items-baseline text-yellow-500 ">
      <span className="text-3xl font-semibold">$</span>
      <span className="text-5xl font-extrabold tracking-tight">49</span>
      <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">/mes</span>
    </div>
    <ul className="space-y-5 my-7">
      <li className="flex items-center">
        <svg
          className="flex-shrink-0 w-4 h-4 text-yellow-500  "
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        </svg>
        <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
          2 miembros del equipo
        </span>
      </li>
      <li className="flex items-center">
        <svg
          className="flex-shrink-0 w-4 h-4 text-yellow-500 "
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        </svg>
        <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
          20GB de almacenamiento en la nube
        </span>
      </li>
      <li className="flex items-center">
        <svg
          className="flex-shrink-0 w-4 h-4 text-yellow-500 "
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        </svg>
        <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
          Ayuda con la integración
        </span>
      </li>
      <li className="flex line-through decoration-gray-500">
        <svg
          className="flex-shrink-0 w-4 h-4 text-gray-400 dark:text-gray-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        </svg>
        <span className="text-base font-normal leading-tight text-gray-500 ms-3">
          Archivos de Sketch
        </span>
      </li>
      <li className="flex line-through decoration-gray-500">
        <svg
          className="flex-shrink-0 w-4 h-4 text-gray-400 dark:text-gray-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        </svg>
        <span className="text-base font-normal leading-tight text-gray-500 ms-3">
          Acceso a la API
        </span>
      </li>
      <li className="flex line-through decoration-gray-500">
        <svg
          className="flex-shrink-0 w-4 h-4 text-gray-400 dark:text-gray-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        </svg>
        <span className="text-base font-normal leading-tight text-gray-500 ms-3">
          Documentación completa
        </span>
      </li>
      <li className="flex line-through decoration-gray-500">
        <svg
          className="flex-shrink-0 w-4 h-4 text-gray-400 dark:text-gray-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        </svg>
        <span className="text-base font-normal leading-tight text-gray-500 ms-3">
          Soporte 24×7 por teléfono y correo electrónico
        </span>
      </li>
    </ul>
    <button
      type="button"
      className={`${bebas.variable} font-sans 
                    login cursor-pointer
                    text-4xl text-white hover:text-yellow-400
                    transition-all custom-transition duration-300`}
    >
      Elegir plan
    </button>
  </div>
);

export const AnnualMembershipCard = () => (
    <div className="w-full max-w-sm p-4  rounded-lg shadow bg-custom-transparent">
    <h5 className="mb-4 text-xl font-medium text-custom-input text-yellow-500 ">Plan anual</h5>
    <div className="flex items-baseline text-yellow-500 ">
      <span className="text-3xl font-semibold">$</span>
      <span className="text-5xl font-extrabold tracking-tight">499</span>
      <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">/año</span>
    </div>
    <ul className="space-y-5 my-7">
      <li className="flex items-center">
        <svg
          className="flex-shrink-0 w-4 h-4 text-yellow-500 "
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        </svg>
        <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
          2 miembros del equipo
        </span>
      </li>
      <li className="flex items-center">
        <svg
          className="flex-shrink-0 w-4 h-4 text-yellow-500 "
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        </svg>
        <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
          20GB de almacenamiento en la nube
        </span>
      </li>
      <li className="flex items-center">
        <svg
          className="flex-shrink-0 w-4 h-4 text-yellow-500 "
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        </svg>
        <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
          Ayuda con la integración
        </span>
      </li>
      <li className="flex items-center">
        <svg
          className="flex-shrink-0 w-4 h-4 text-yellow-500 "
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        </svg>
        <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
          Archivos de Sketch
        </span>
      </li>
      <li className="flex items-center">
        <svg
          className="flex-shrink-0 w-4 h-4 text-yellow-500 "
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        </svg>
        <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
          Acceso a la API
        </span>
      </li>
      <li className="flex items-center">
        <svg
          className="flex-shrink-0 w-4 h-4 text-yellow-500 "
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        </svg>
        <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
          Documentación completa
        </span>
      </li>
      <li className="flex items-center">
        <svg
          className="flex-shrink-0 w-4 h-4 text-yellow-500 "
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        </svg>
        <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
          Soporte 24×7 por teléfono y correo electrónico
        </span>
      </li>
    </ul>
    <button
      type="button"
      className={`${bebas.variable} font-sans 
                    login cursor-pointer
                    text-4xl text-white hover:text-yellow-400
                    transition-all custom-transition duration-300 `}
    >
      Elegir plan
    </button>
  </div>
);

export default { MonthlyMembershipCard, AnnualMembershipCard};
"use client"

import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const DeleteComicsPage = () => {
  const handleDeleteAllFolders = async () => {
    try {
      const response = await axios.delete('/api/folders');
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Carpetas eliminadas',
          text: 'Todas las carpetas han sido eliminadas exitosamente.',
        });
      } else {
        throw new Error('Error al eliminar las carpetas');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al eliminar las carpetas.',
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <button onClick={handleDeleteAllFolders} className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800 transition-colors duration-300">
        Eliminar todas las carpetas
      </button>
    </div>
  );
};

export default DeleteComicsPage;
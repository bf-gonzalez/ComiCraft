"use client"
import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../components/regularBackground/RegularBackground.module.css';
import ImageUpload from '@/components/ImageUpload';
import { UserContext } from '@/context/userContext';

export default function UploadPage() {
  const [folderName, setFolderName] = useState('');
  const [description, setDescription] = useState('');
  const [comicData, setComicData] = useState(null); // Estado para almacenar el objeto comicData
  const { user } = useContext(UserContext);
  const router = useRouter();
  const [uploadMode, setUploadMode] = useState('single'); // Estado para manejar el modo de subida

  const handleComicDataChange = (data) => {
    setComicData(data);
  };

  const resetFields = () => {
    setFolderName('');
    setDescription('');
    setComicData(null);
  };

  return (
    <main className={styles.fondo}>
      <div className="flex flex-col items-center justify-center mt-48 p-4">
        <div className="flex flex-col items-center">
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => setUploadMode('single')}
              className={`px-4 py-2 rounded ${uploadMode === 'single' ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-800'} transition-colors duration-300`}
            >
              Subir Imágenes Individuales
            </button>
            <button
              onClick={() => setUploadMode('folder')}
              className={`px-4 py-2 rounded ${uploadMode === 'folder' ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-800'} transition-colors duration-300`}
            >
              Subir Carpeta
            </button>
          </div>
          <input 
            type="text" 
            placeholder="Nombre del Cómic" 
            value={folderName} 
            onChange={(e) => setFolderName(e.target.value)} 
            className="py-2 px-4 border-2 rounded-lg text-white border-rose-800 bg-black bg-opacity-30"
          />
          <textarea
            placeholder="Descripción del Cómic"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="py-2 px-4 border-2 rounded-lg text-white border-rose-800 bg-black bg-opacity-30 "
            maxLength={256}
          />
          <div className="text-right text-sm text-gray-500">{description.length}/256</div>
          <ImageUpload 
            folderName={folderName} 
            description={description} 
            onComicDataChange={handleComicDataChange} 
            onUploadSuccess={resetFields} // Cambio aquí
            uploadMode={uploadMode} // Pasar el modo de subida al componente ImageUpload
          />
        </div>
        {comicData && (
          <div className="mt-4 p-4 border rounded bg-gray-100">
            <h3 className="text-lg font-bold">Objeto enviado al backend:</h3>
            <pre className="text-sm">{JSON.stringify(comicData, null, 2)}</pre>
          </div>
        )}
      </div>
    </main>
  );
}
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
      <div className="flex flex-col items-center justify-center mt-[9vw]">
        <div className="flex flex-col items-center ">
          <section className='flex flex-row-reverse '>
        <img src="/images/subirInstrucc1.png" alt="instrucciones"
                    className="instrucciones h-[40vh] pl-[42vw]"
                    />
          <div className='flex flex-col items-center'>
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
          </div>
          </section>
          <ImageUpload folderName={folderName} description={description} onComicDataChange={handleComicDataChange} onUploadSuccess={resetFields} />
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
"use client"

import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../components/regularBackground/RegularBackground.module.css';
import ImageUpload from '@/components/ImageUpload';
import { UserContext } from '@/context/userContext';

export default function UploadPage() {
  const [folders, setFolders] = useState([]);
  const [folderName, setFolderName] = useState('');
  const [description, setDescription] = useState('');
  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await fetch('/api/folders');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setFolders(data);
      } catch (error) {
        console.error('Error fetching folders:', error);
      }
    };

    fetchFolders();
  }, []);

  useEffect(() => {
    if (user) {
      setFolderName(` @${user.name}`);
    }
  }, [user]);

  const handleFolderClick = (folder) => {
    router.push(`/upload/${folder}`);
  };

  return (
    <main className={styles.fondo}>
      <div className="flex flex-col items-start justify-start mt-48 p-4">
        <div>
          <input 
            type="text" 
            placeholder="Nombre del Cómic" 
            value={folderName} 
            onChange={(e) => setFolderName(e.target.value)} 
            className="mb-4 p-2 border rounded text-black"
          />
          <textarea
            placeholder="Descripción del Cómic"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mb-4 p-2 border rounded text-black"
          />
          <ImageUpload folderName={folderName} description={description} />
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4">
          {folders.map((folder) => (
            <div key={folder.name} onClick={() => handleFolderClick(folder.name)} className="relative w-64 h-80 border-2 border-gray-400 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300">
              <img src={folder.firstImage} alt={folder.name} className="absolute inset-0 w-full h-full object-cover" />
              <p className="absolute bottom-0 bg-black bg-opacity-50 text-white w-full text-center">{folder.name}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
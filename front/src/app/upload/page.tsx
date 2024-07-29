"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../components/regularBackground/RegularBackground.module.css';
import ImageUpload from '@/components/ImageUpload';


export default function UploadPage() {
  const [folders, setFolders] = useState([]);
  const [folderName, setFolderName] = useState('');
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

  const handleFolderClick = (folder) => {
    router.push(`/upload/${folder}`);
  };

  return (
    <main className={styles.fondo}>
      <div className="flex h-screen items-center justify-center">
        <div>
          <input 
            type="text" 
            placeholder="Nombre de la carpeta" 
            value={folderName} 
            onChange={(e) => setFolderName(e.target.value)} 
            className="mb-4 p-2 border rounded"
          />
          <ImageUpload folderName={folderName} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 p-4">
        {folders.map((folder) => (
          <div key={folder.name} onClick={() => handleFolderClick(folder.name)} className="cursor-pointer">
            <img src={folder.firstImage} alt={folder.name} className="w-full h-auto" />
            <p>{folder.name}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
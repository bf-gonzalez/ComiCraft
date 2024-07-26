"use client"

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import styles from '../../../components/regularBackground/RegularBackground.module.css';

export default function FolderPage() {
  const [images, setImages] = useState([]);
  const router = useRouter();
  const { title: folderName } = useParams();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`/api/images?folder=${folderName}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    if (folderName) {
      fetchImages();
    }
  }, [folderName]);

  return (
    <main className={styles.fondo}>
      <div className="grid grid-cols-3 gap-4 p-4">
        {images.map((image) => (
          <div key={image.public_id} className="cursor-pointer">
            <img src={image.secure_url} alt={image.public_id} className="w-full h-auto" />
          </div>
        ))}
      </div>
    </main>
  );
}
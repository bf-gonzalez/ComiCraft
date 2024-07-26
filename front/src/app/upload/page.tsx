"use client"

import { useEffect, useState } from 'react';
import ImageUpload from '@/components/ImageUpload';
import styles from '../../components/regularBackground/RegularBackground.module.css';

export default function UploadPage() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/images');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <main className={styles.fondo}>
      <div className="flex h-screen items-center justify-center">
        <ImageUpload />
      </div>
      <div className="grid grid-cols-3 gap-4 p-4">
        {images.map((image) => (
          <img key={image.public_id} src={image.secure_url} alt={image.public_id} className="w-full h-auto" />
        ))}
      </div>
    </main>
  );
}
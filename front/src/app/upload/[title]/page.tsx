"use client"

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import styles from '../../../components/regularBackground/RegularBackground.module.css';

export default function FolderPage() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
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

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <main className={styles.fondo} style={{ paddingTop: '5%', paddingBottom: '10px' }}>
      <div className="flex justify-center items-center min-h-screen">
        {images.length > 0 && (
          <div className="relative">
            <button onClick={handlePrev} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded">Prev</button>
            <img src={images[currentIndex].secure_url} alt={images[currentIndex].public_id} className="w-full h-auto" />
            <button onClick={handleNext} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded">Next</button>
          </div>
        )}
      </div>
    </main>
  );
}
"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import styles from '../../../components/regularBackground/RegularBackground.module.css';

export default function FolderPage() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [comic, setComic] = useState(null);
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

    const fetchComic = async () => {
      try {
        const response = await fetch(`http://localhost:3000/comics?folder=${folderName}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setComic(data);
      } catch (error) {
        console.error('Error fetching comic:', error);
      }
    };

    if (folderName) {
      fetchImages();
      fetchComic();
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
        {comic && (
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">{comic.title}</h1>
            <p className="text-gray-700">{comic.username}</p>
            <p className="text-gray-500 mt-4">{comic.description}</p>
            <p className="text-gray-500">{comic.data_post}</p>
          </div>
        )}
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
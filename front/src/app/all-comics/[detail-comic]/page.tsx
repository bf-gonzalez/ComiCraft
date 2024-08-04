"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ComicDetailPage = () => {
  const params = useParams(); // Obtener los parámetros de la URL
  const detailComic = params?.['detail-comic']; // Obtener el id del cómic desde los parámetros
  const [comic, setComic] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (detailComic) {
      const fetchComic = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/comics/${detailComic}`);
          setComic(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching comic:', error);
          setLoading(false);
        }
      };

      fetchComic();
    }
  }, [detailComic]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!comic) {
    return <div>Comic not found</div>;
  }

  return (
    <main className="flex flex-row items-start p-4">
      <img 
        src={comic.folderName} 
        alt={comic.title} 
        className="rounded-xl border-2 h-[36vh] border-rose-900 p-2 object-cover object-top w-[12.5vw]" 
        height={350} 
      />
      <div className="ml-4">
        <h1 className="text-2xl font-bold">{comic.title}</h1>
        <p className="mt-2">{comic.description}</p>
        <p className="mt-2">Author: {comic.author}</p>
        <p className="mt-2">Category: {comic.categoryname || 'N/A'}</p>
        <p className="mt-2">Published Date: {comic.data_post}</p>
      </div>
    </main>
  );
};

export default ComicDetailPage;
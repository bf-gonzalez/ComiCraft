"use client"

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import styles from "@/components/backgrounds/experiment.module.css";
import { Bebas_Neue, Josefin_Sans } from 'next/font/google';

const josefin = Josefin_Sans({
  subsets:['latin'],
  weight: ['600'],
  variable: '--font-josefin',
})

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
});




const ComicDetailPage = () => {
  const params = useParams();
  const detailComic = params?.['detail-comic'];
  const [comic, setComic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (detailComic) {
      const fetchComic = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/comics/${detailComic}`);
          setComic(response.data);
          setLoading(false);

          if (isValidUrl(response.data.folderName)) {
            setImages([{ secure_url: response.data.folderName }]);
          } else {
            fetchImages(response.data.folderName);
          }

          const commentsWithUsernames = await Promise.all(
            response.data.comment.map(async (comment) => {
              const commentResponse = await axios.get(`http://localhost:3000/comment/${comment.id}`);
              return {
                ...comment,
                username: commentResponse.data.user.username,
              };
            })
          );

          setComments(commentsWithUsernames);
        } catch (error) {
          console.error('Error fetching comic:', error);
          setLoading(false);
        }
      };

      fetchComic();
    }
  }, [detailComic]);

  const fetchImages = async (folderName) => {
    try {
      const response = await axios.get(`/api/images?folder=${folderName}`);
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleCommentSubmit = async () => {
    const user = JSON.parse(localStorage.getItem('decodedUser'));
    if (!user || !user.id) {
      console.error('User not found in localStorage');
      return;
    }

    const commentData = {
      userId: user.id,
      content: newComment,
    };

    try {
      const response = await axios.post(`http://localhost:3000/comment/${detailComic}`, commentData);
      setNewComment('');
      setComments([...comments, {
        id: response.data.id,
        content: response.data.content,
        created_at: response.data.created_at,
        username: response.data.user.username,
      }]);
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!comic) {
    return <div>Comic not found</div>;
  }

  return (
    <main className={styles.fondo}>
    <section className="pt-36 flex flex-col items-center p-4 ">
      <div className="flex flex-row pb-16 ">
        {images.length > 0 && (
          <img 
            src={images[0].secure_url} 
            alt={comic.title} 
            className=" ml-auto rounded-xl border-2 h-[72vh] border-rose-900 p-2 object-cover object-center w-[24vw]" 
            height={350} 
          />
        )}
        <div className="self-center w-[50vw] ml-20">
          
          <h1 className={`${bebas.variable} font-sans text-8xl text-yellow-400 text-center`}>{comic.title}</h1>
          <p className={`${josefin.variable} font-sans text-4xl text-white text-end pb-10`}>{comic.description}</p>

          <div className='flex flex-row'>
          <p className={`${bebas.variable} font-sans text-5xl text-rose-700 pr-3`}>Autor:</p>
          <p className={`${bebas.variable} font-sans text-5xl text-white`}>{comic.author}</p>
          </div>

          <div className='flex flex-row'>
          <p className={`${bebas.variable} font-sans text-5xl text-rose-700 pr-3`}>Categoria:</p>
          <p className={`${bebas.variable} font-sans text-5xl text-white`}>{comic.categoryname || 'N/A'}</p>
          </div>

          <div className='flex flex-row'>
          <p className={`${bebas.variable} font-sans text-5xl text-rose-700 pr-3`}>Fecha de publicación:</p>
          <p className={`${bebas.variable} font-sans text-5xl text-white`}>{comic.data_post}</p>
          </div>

        </div>
      </div>
      {images.length > 0 && (
        <div className={`mt-4 grid grid-cols-10 gap-2 border-2 border-yellow-400 border-opacity-60 p-2 rounded-xl`}>
          {images.map((image, index) => (
            <img 
              key={index} 
              src={image.secure_url} 
              alt={`Comic image ${index + 1}`} 
              className="w-[10vw] h-[28vh] cursor-pointer" 
              onClick={() => router.push(`/upload/${comic.folderName}`)} 
            />
          ))}
        </div>
      )}
      <div className="mt-8 w-full flex flex-col pl-8 pb-16">
        <h2 className="text-xl font-bold mb-4">Comentarios</h2>
        <input
          type="text"
          placeholder="Escribe tu comentario"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="p-4 mb-4 border-2 border-rose-900 rounded bg-[#01061A] text-white placeholder-gray-500 w-[30vw] h-[12vh]"
        />
        <button
          onClick={handleCommentSubmit}
          className="mt-2 bg-blue-500 text-white hover:bg-blue-700 transition-colors duration-300 w-[10vw] h-[8vh] rounded-xl"
        >
          Enviar Comentario
        </button>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="mb-4 p-4 border-2 border-rose-900 rounded bg-[#01061A]">
              <p>{comment.content}</p>
              <p className="text-sm text-gray-500">Fecha: {new Date(comment.created_at).toLocaleDateString()}</p>
              <p className="text-sm text-gray-500">Usuario: {comment.username}</p>
            </div>
          ))
        ) : (
          <p className='text-center text-3xl pt-8'>No hay comentarios aún.</p>
        )}
      </div>

      <img src= "/images/masComics.png"
            className="max-w-sm ml-auto mr-auto pb-48 "
            height={400} />
            

    </section>
    </main>
  );
};

export default ComicDetailPage;
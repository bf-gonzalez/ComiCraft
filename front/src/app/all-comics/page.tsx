"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from '../../components/regularBackground/RegularBackground.module.css';
import { Bebas_Neue } from "next/font/google";
import Pagination from '../../components/Pagination';
import SearchBar from '../../components/searchBar/SearchBar';
import DateFilter from '../../components/DateFilter';
import CategoryFilter from '../../components/CategoryFilter';

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
});

const AllComicsPage = () => {
  const [comics, setComics] = useState([]);
  const [images, setImages] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [comicsPerPage] = useState(2); // Número de cómics por página
  const [searchQuery, setSearchQuery] = useState('');
  const [dateOrder, setDateOrder] = useState<'newest' | 'oldest'>('newest');
  const [categoryFilter, setCategoryFilter] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const response = await axios.get('http://localhost:3000/comics');
        setComics(response.data);
        response.data.forEach(comic => {
          if (isValidUrl(comic.folderName)) {
            setImages(prevImages => ({ ...prevImages, [comic.id]: [{ secure_url: comic.folderName }] }));
          } else {
            fetchImages(comic.folderName, comic.id);
          }
        });
      } catch (error) {
        console.error('Error fetching comics:', error);
      }
    };

    const fetchImages = async (folderName, comicId) => {
      try {
        const response = await axios.get(`/api/images?folder=${folderName}`);
        setImages(prevImages => ({ ...prevImages, [comicId]: response.data }));
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchComics();
  }, []);

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;  
    }
  };

  const handleComicClick = (comicId) => {
    router.push(`/all-comics/${comicId}`);
  };

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const handleFilterChange = (order) => {
    setDateOrder(order);
  };

  const handleCategoryChange = (category) => {
    setCategoryFilter(category);
  };

  const filteredComics = comics
    .filter(comic => comic.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(comic => !categoryFilter || comic.categoryname === categoryFilter)
    .sort((a, b) => {
      if (dateOrder === 'newest') {
        return new Date(b.data_post) - new Date(a.data_post);
      } else {
        return new Date(a.data_post) - new Date(b.data_post);
      }
    });

  // Calcular el número total de páginas
  const totalPages = Math.ceil(filteredComics.length / comicsPerPage);

  // Obtener los cómics para la página actual
  const indexOfLastComic = currentPage * comicsPerPage;
  const indexOfFirstComic = indexOfLastComic - comicsPerPage;
  const currentComics = filteredComics.slice(indexOfFirstComic, indexOfLastComic);

  return (
    <main className={styles.fondo} style={{ marginTop: '100px' }}>
      <section className="flex flex-col items-center justify-center h-screen">
        <SearchBar onSearch={handleSearch} />
        <DateFilter onFilterChange={handleFilterChange} />
        <CategoryFilter onCategoryChange={handleCategoryChange} />
        <div className="flex flex-row flex-wrap justify-center mt-4">
          {currentComics.map((comic, index) => (
            <div key={index} className="flex flex-col items-center mb-8 mx-2">
              <div 
                className="relative p-2 border-4 border-red-800 rounded shadow-lg w-96 h-144 cursor-pointer overflow-hidden"
                onClick={() => handleComicClick(comic.id)}
              >
                <div className="absolute inset-0 flex items-center justify-center p-2">
                  {images[comic.id]?.[0] && (
                    <img 
                      src={images[comic.id][0].secure_url} 
                      alt={images[comic.id][0].public_id} 
                      className="w-full h-full object-contain" 
                    />
                  )}
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#F5C702] bg-opacity-0 hover:bg-opacity-50 hover:text-black text-transparent transition-all duration-300">
                  <p className={`${bebas.variable} text-center mt-4 text-lg font-bold uppercase`}>{comic.description}</p>
                  <p className={`${bebas.variable} absolute bottom-2 right-2 text-lg font-bold uppercase text-black`}>{comic.data_post}</p>
                </div>
              </div>
              <p className="text-lg text-gray-400">{comic.categoryname}</p>
              <h1 className="text-2xl font-bold mt-2" style={{ color: '#F5C702' }}>{comic.title}</h1>
              <p className="text-sm text-white">{comic.author}</p>
            </div>
          ))}
        </div>
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={setCurrentPage} 
        />
      </section>
    </main>
  );
};

export default AllComicsPage;
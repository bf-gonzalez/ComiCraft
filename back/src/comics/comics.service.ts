import { Injectable } from '@nestjs/common';
import { Comic } from './interfaces/comic.interface';

const comics: Comic[] = [
  {
    id: 1,
    title: 'The Amazing Spider-Man',
    author: 'Stan Lee',
    url: 'https://m.media-amazon.com/images/I/81v72hqINaL._AC_UY327_FMwebp_QL65_.jpg',
  },
  {
    id: 2,
    title: 'Batman: The Dark Knight Returns',
    author: 'Frank Miller',
    url: 'https://m.media-amazon.com/images/I/41ZxIlhoiOL._SY445_SX342_.jpg',
  },
  {
    id: 3,
    title: 'Watchmen',
    author: 'Alan Moore',
    url: 'https://m.media-amazon.com/images/I/81nqASLZU5L._AC_UY327_FMwebp_QL65_.jpg',
  },
  {
    id: 4,
    title: 'Sandman',
    author: 'Neil Gaiman',
    url: 'https://m.media-amazon.com/images/I/71MgEPnRGZL._AC_UY327_FMwebp_QL65_.jpg',
  },
  {
    id: 5,
    title: 'Saga',
    author: 'Brian K. Vaughan',
    url: 'https://m.media-amazon.com/images/I/61FruD4bhIL._AC_UY327_FMwebp_QL65_.jpg',
  },
  {
    id: 6,
    title: 'Y: The Last Man',
    author: 'Brian K. Vaughan',
    url: 'https://m.media-amazon.com/images/I/81DP-VNOJRL._AC_UY327_FMwebp_QL65_.jpg',
  },
  {
    id: 7,
    title: 'The Walking Dead',
    author: 'Robert Kirkman',
    url: 'https://m.media-amazon.com/images/I/81w2wDvI2KL._AC_UY327_FMwebp_QL65_.jpg',
  },
  {
    id: 8,
    title: 'Preacher',
    author: 'Garth Ennis',
    url: 'https://m.media-amazon.com/images/I/71uwD9RukaL._AC_UY327_FMwebp_QL65_.jpg',
  },
  {
    id: 9,
    title: 'V for Vendetta',
    author: 'Alan Moore',
    url: 'https://m.media-amazon.com/images/I/91wx3LG3HzL._AC_UY327_FMwebp_QL65_.jpg',
  },
  {
    id: 10,
    title: 'Maus',
    author: 'Art Spiegelman',
    url: 'https://m.media-amazon.com/images/I/A1pUyqvAOwL._AC_UY327_FMwebp_QL65_.jpg',
  },
];

@Injectable()
export class ComicsService {
  getComics() {
    return comics;
  }

  getComicById(id: number) {
    return (
      comics.find((comic) => comic.id === id) ||
      'No se encontró comic con ese ID'
    );
  }

  getComicByName(name: string) {
    return comics.filter((comic) =>
      comic.title.toLowerCase().includes(name.toLowerCase()),
    );
  }

  postComic(comic: Comic) {
    const newComic = { id: comics.length + 1, ...comic };
    comics.push(newComic);
    return newComic;
  }

  putComic(id: number, updatedComic: Partial<Comic>) {
    const comicIndex = comics.findIndex((comic) => comic.id === id);
    if (comicIndex === -1) {
      return 'No se encontró comic con ese ID';
    }

    const existingComic = comics[comicIndex];
    const updated = { ...existingComic, ...updatedComic };

    comics[comicIndex] = updated;
    return comics[comicIndex];
  }

  deleteComic(id: number) {
    const comicIndex = comics.findIndex((comic) => comic.id === id);
    if (comicIndex === -1) {
      return 'No se encontró comic con ese ID';
    }
    comics.splice(comicIndex, 1);
    return 'Comic Eliminado correctamente';
  }
}

import { Injectable } from '@nestjs/common';

const comics = [
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

export default comics;

@Injectable()
export class ComicsService {
  getComics() {
    return comics;
  }

  getComicById(id: number) {
    if (id > comics.length) return 'no se encontro comic con ese id ';
    return comics.find((comic) => comic.id === id);
  }
}

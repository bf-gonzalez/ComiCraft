import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query.toLowerCase());
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center pb-2">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Buscar cómics"
        className="py-2 px-4 border-2 rounded-lg text-white border-rose-800 bg-transparent rounded-r-none"
      />
      <button type="submit" className=" pl-6 py-2 px-4 bg-yellow-400 text-black uppercase rounded-lg rounded-l-none">
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;
import { Bebas_Neue } from 'next/font/google';
import React, { useState } from 'react';

const  bebas = Bebas_Neue({
  subsets:['latin'],
  weight: ['400'],
  variable: '--font-bebas',
});

interface CategoryFilterProps {
  onCategoryChange: (categories: string[]) => void;
  initialCategories: string[];
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ onCategoryChange, initialCategories }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategories);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((cat) => cat !== category)
        : [...prevCategories, category]
    );
  };

  const handleApplyFilters = () => {
    onCategoryChange(selectedCategories);
  };

  return (
    <div className="category-filter pb-6">
      <div className="flex flex-wrap justify-center space-x-2">
        {['Comic Americano', 'Comic Europeo', 'Manga Japonés', 'Comic Latino', 'Acción', 'Drama', 'Romance'].map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryToggle(category)}
            className={`px-4 py-2 rounded ${selectedCategories.includes(category) ? 'bg-rose-900 text-white' : 'bg-gray-200 text-gray-800'} transition-colors duration-300`}
          >
            {category}
          </button>
        ))}
      </div>
      <button onClick={handleApplyFilters} className="mt-4 px-4 py-2 bg-[#F5C702] text-gray-800 rounded hover:bg-blue-700 hover:text-white transition-colors duration-300">Aplicar Filtros</button>
    </div>
  );
};

export default CategoryFilter;
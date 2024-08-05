import { Bebas_Neue } from 'next/font/google';
import React, { useState } from 'react';

const  bebas = Bebas_Neue({
  subsets:['latin'],
  weight: ['400'],
  variable: '--font-bebas',
});

interface CategoryFilterProps {
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ onCategoryChange }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  return (
    <div className="category-filter pb-6">
      <select value={selectedCategory} onChange={handleCategoryChange} className=" border-2 border-rose-900 rounded text-white text-base bg-rose-800 uppercase p-2">
        <option value="">Todas las categorías</option>
        <option value="Acción">Acción</option>
        <option value="Romance">Romance</option>
        <option value="Drama">Drama</option>
      </select>
    </div>
  );
};

export default CategoryFilter;
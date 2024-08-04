import React, { useState } from 'react';

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
    <div className="category-filter">
      <select value={selectedCategory} onChange={handleCategoryChange} className="py-2 px-4 border rounded">
        <option value="">Todas las categorías</option>
        <option value="Acción">Acción</option>
        <option value="Romance">Romance</option>
        <option value="Drama">Drama</option>
      </select>
    </div>
  );
};

export default CategoryFilter;
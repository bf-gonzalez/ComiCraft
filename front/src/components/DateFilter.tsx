import React, { useState } from 'react';

interface DateFilterProps {
  onFilterChange: (order: 'newest' | 'oldest') => void;
}

const DateFilter: React.FC<DateFilterProps> = ({ onFilterChange }) => {
  const [order, setOrder] = useState<'newest' | 'oldest'>('newest');

  const handleToggle = () => {
    const newOrder = order === 'newest' ? 'oldest' : 'newest';
    setOrder(newOrder);
    onFilterChange(newOrder);
  };

  return (
    <button onClick={handleToggle} className="py-2 px-4 bg-blue-500 text-white rounded">
      {order === 'newest' ? 'Mostrar más viejos' : 'Mostrar más nuevos'}
    </button>
  );
};

export default DateFilter;
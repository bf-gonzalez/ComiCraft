import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

export interface CategoryOption {
  readonly value: string;
  readonly label: string;
}

export const categoryOptions: readonly CategoryOption[] = [
  { value: 'accion', label: 'Acción' },
  { value: 'romance', label: 'Romance' },
  { value: 'comedia', label: 'Comedia' },
];

const animatedComponents = makeAnimated();

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: '#01061A',
    color: 'white',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#01061A',
    color: 'white',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'white',
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#01061A',
    color: 'white',
    border: '1px solid white',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: 'white',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'white',
  }),
  input: (provided) => ({
    ...provided,
    color: 'white',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? 'white' : '#01061A',
    color: state.isFocused ? 'black' : 'white',
  }),
};

const CategorySelector = ({ onChange }) => {
  const handleChange = (selectedOptions) => {
    const selectedCategories = selectedOptions.map(option => option.value);
    onChange(selectedCategories);
  };

  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      defaultValue={[categoryOptions[0], categoryOptions[1]]}
      isMulti
      options={categoryOptions}
      styles={customStyles}
      onChange={handleChange}
    />
  );
};

export default CategorySelector;
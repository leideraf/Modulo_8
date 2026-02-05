import React from 'react';

const FilterBar = ({ categories, selectedCategory, onCategoryChange, notesByCategory }) => {
  const allCategories = ['Todas', ...categories];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Filtrar por categoría:</h3>
      <div className="flex flex-wrap gap-2">
        {allCategories.map((category) => {
          const count = notesByCategory[category] || 0;
          const isSelected = selectedCategory === category;

          return (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2
                ${
                  isSelected
                    ? 'bg-blue-600 text-white focus:ring-blue-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400'
                }`}
            >
              {category}
              {count > 0 && (
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-semibold
                  ${
                    isSelected
                      ? 'bg-blue-800 text-blue-100'
                      : 'bg-gray-400 text-white'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FilterBar;
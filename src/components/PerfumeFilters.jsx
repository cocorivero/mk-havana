import React from "react";
import { perfumes } from "../mock/perfumes";

const PerfumeFilters = ({
  selectedCategory,
  onCategoryChange,
  selectedBrand,
  onBrandChange,
  priceRange,
  onPriceChange,
}) => {
  const categories = ["Todas", ...new Set(perfumes.map((perfume) => perfume.category))];
  const brands = ["Todas", ...new Set(perfumes.map((perfume) => perfume.brand))];
  const prices = perfumes.map((p) => p.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  return (
    <div className="bg-pink-50 rounded-2xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-pink-900 mb-4">Filtros</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-pink-700 mb-2">Categoría</label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-3 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white text-pink-700 cursor-pointer"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-pink-700 mb-2">Marca</label>
          <select
            value={selectedBrand}
            onChange={(e) => onBrandChange(e.target.value)}
            className="w-full px-3 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white text-pink-700 cursor-pointer"
          >
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-pink-700 mb-2">Precio máximo: ${priceRange}</label>
          <input
            type="range"
            min={minPrice - 10}
            max={maxPrice + 10}
            step="10"
            value={priceRange}
            onChange={(e) => onPriceChange(parseInt(e.target.value))}
            className="w-full h-2 bg-pink-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-sm text-pink-500 mt-1">
            <span>${minPrice - 10}</span>
            <span>${maxPrice + 10}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfumeFilters;

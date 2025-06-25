import React from "react";

const PerfumeFilters = ({
  selectedCategory,
  onCategoryChange,
  selectedBrand,
  onBrandChange,
  priceRange,
  onPriceChange,
}) => {
  const categories = ["Todos", "Masculino", "Femenino", "Unisex"];
  const brands = [
    "Todas",
    "Luxe Paris",
    "Aqua Essence",
    "Floral Dreams",
    "Arabian Nights",
    "Fresh Start",
    "Sweet Essence",
  ];

  return (
    <div className="bg-pink-50 rounded-2xl shadow-lg p-6 mb-8">
      <h3 className="text-lg font-semibold text-pink-900 mb-4">Filtros</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-pink-700 mb-2">Categoría</label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-3 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white text-pink-700"
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
            className="w-full px-3 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white text-pink-700"
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
            min="500"
            max="3000"
            step="100"
            value={priceRange}
            onChange={(e) => onPriceChange(parseInt(e.target.value))}
            className="w-full h-2 bg-pink-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-sm text-pink-500 mt-1">
            <span>$500</span>
            <span>$3000</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfumeFilters;

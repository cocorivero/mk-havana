import React from "react";
import PerfumeHero from "./PerfumeHero";
import PerfumeFilters from "./PerfumeFilters";
import PerfumeCard from "./PerfumeCard";
import { AnimatePresence, motion } from "framer-motion";

const HomePage = ({
  filteredPerfumes,
  selectedCategory,
  setSelectedCategory,
  selectedBrand,
  setSelectedBrand,
  priceRange,
  setPriceRange,
  searchTerm,
  handleAddToCart,
  setSelectedPerfume,
}) => {
  return (
    <>
      <AnimatePresence>
        {!searchTerm.trim() && (
          <motion.div
            key="perfume-hero"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="-mt-16 z-0 relative"
          >
            <PerfumeHero />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PerfumeFilters
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedBrand={selectedBrand}
          onBrandChange={setSelectedBrand}
          priceRange={priceRange}
          onPriceChange={setPriceRange}
        />
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-pink-900 mb-2">
            {searchTerm ? `Resultados para "${searchTerm}"` : "Nuestros Perfumes"}
          </h2>
          <p className="text-pink-600">
            {filteredPerfumes.length} {filteredPerfumes.length === 1 ? "producto encontrado" : "productos encontrados"}
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredPerfumes.map((perfume) => (
            <PerfumeCard
              key={perfume.id}
              perfume={perfume}
              onAddToCart={handleAddToCart}
              onViewDetails={setSelectedPerfume}
            />
          ))}
        </div>
        {filteredPerfumes.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-24 h-24 text-pink-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-pink-900 mb-2">No se encontraron productos</h3>
            <p className="text-pink-600">Intenta ajustar los filtros o buscar con otros términos</p>
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;

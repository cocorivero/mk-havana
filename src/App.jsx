import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { perfumes } from "./mock/perfumes";

import PerfumeHeader from "./components/PerfumeHeader";
import PerfumeHero from "./components/PerfumeHero";
import PerfumeFilters from "./components/PerfumeFilters";
import PerfumeCard from "./components/PerfumeCard";
import PerfumeDetail from "./components/PerfumeDetail";
import PerfumeCart from "./components/PerfumeCart";
import AboutUsPage from "./components/AboutUsPage";
import FAQPage from "./components/FAQPage";
import FooterPage from "./components/FooterPage";

import { sendWhatsAppMessage } from "./utils/whatsapp";
import { AnimatePresence, motion } from "framer-motion";
import ScrollToTop from './components/ScrollTop';

const App = () => {
  const [filteredPerfumes, setFilteredPerfumes] = useState(perfumes);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedBrand, setSelectedBrand] = useState("Todas");
  const [priceRange, setPriceRange] = useState(3000);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPerfume, setSelectedPerfume] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    let filtered = perfumes;

    if (selectedCategory !== "Todos") {
      filtered = filtered.filter((perfume) => perfume.category === selectedCategory);
    }

    if (selectedBrand !== "Todas") {
      filtered = filtered.filter((perfume) => perfume.brand === selectedBrand);
    }

    filtered = filtered.filter((perfume) => perfume.price <= priceRange);

    if (searchTerm) {
      filtered = filtered.filter(
        (perfume) =>
          perfume.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          perfume.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          perfume.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPerfumes(filtered);
  }, [selectedCategory, selectedBrand, priceRange, searchTerm, perfumes]);

  const handleAddToCart = (perfume) => {
    const existingItem = cartItems.find((item) => item.id === perfume.id);

    if (existingItem) {
      setCartItems(cartItems.map((item) => (item.id === perfume.id ? { ...item, quantity: item.quantity + 1 } : item)));
    } else {
      setCartItems([...cartItems, { ...perfume, quantity: 1 }]);
    }
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(id);
      return;
    }

    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)));
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    sendWhatsAppMessage(cartItems, total);
    setCartItems([]); // Vaciar carrito después de "comprar"
    setIsCartOpen(false);
    alert("Tu pedido ha sido enviado. ¡Gracias por tu compra!");
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Router>
      <div className="min-h-screen bg-pink-50">
        <PerfumeHeader onSearch={setSearchTerm} cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />
        <ScrollToTop />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <AnimatePresence>
                  {!searchTerm.trim() && (
                    <motion.div
                      key="perfume-hero"
                      initial={{ opacity: 0, y: -100 }} // Comienza arriba, invisible
                      animate={{ opacity: 1, y: 0 }} // Baja suavemente y aparece
                      exit={{ opacity: 0, y: -100 }} // Sube y desaparece
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
                      {filteredPerfumes.length}{" "}
                      {filteredPerfumes.length === 1 ? "producto encontrado" : "productos encontrados"}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
                      <svg
                        className="w-24 h-24 text-pink-300 mx-auto mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
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
            }
          ></Route>
          <Route path="/aboutUs" element={<AboutUsPage />}></Route>
          <Route path="/faq" element={<FAQPage />}></Route>
        </Routes>

        <FooterPage />

        <PerfumeDetail
          perfume={selectedPerfume}
          onClose={() => setSelectedPerfume(null)}
          onAddToCart={handleAddToCart}
        />

        <PerfumeCart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onCheckout={handleCheckout}
        />
      </div>
    </Router>
  );
};

export default App;

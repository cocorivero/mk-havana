import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { perfumes } from "./mock/perfumes";

import PerfumeHeader from "./components/PerfumeHeader";
import PerfumeDetail from "./components/PerfumeDetail";
import PerfumeCart from "./components/PerfumeCart";
import AboutUsPage from "./components/AboutUsPage";
import FAQPage from "./components/FAQPage";
import FooterPage from "./components/FooterPage";

import { sendWhatsAppMessage } from "./utils/whatsapp";
import ScrollToTop from "./components/ScrollTop";
import HomePage from "./components/HomePage";

const App = () => {
  const [filteredPerfumes, setFilteredPerfumes] = useState(perfumes);
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [selectedBrand, setSelectedBrand] = useState("Todas");
  const [priceRange, setPriceRange] = useState(Math.max(...perfumes.map((p) => p.price)) + 10);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPerfume, setSelectedPerfume] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    let filtered = perfumes;

    if (selectedCategory !== "Todas") {
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
    setCartItems([]);
    setIsCartOpen(false);
    alert("Tu pedido ha sido enviado. ¡Gracias por tu compra!");
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setSelectedCategory("Todas");
    setSelectedBrand("Todas");
    setPriceRange(Math.max(...perfumes.map((p) => p.price)) + 10);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-pink-50">
        <PerfumeHeader onSearch={handleSearch} cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />
        <ScrollToTop />

        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                filteredPerfumes={filteredPerfumes}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedBrand={selectedBrand}
                setSelectedBrand={setSelectedBrand}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                searchTerm={searchTerm}
                handleAddToCart={handleAddToCart}
                setSelectedPerfume={setSelectedPerfume}
              />
            }
          />
          <Route path="/aboutUs" element={<AboutUsPage />} />
          <Route path="/faq" element={<FAQPage />} />
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
    </BrowserRouter>
  );
};

export default App;

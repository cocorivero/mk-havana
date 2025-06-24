import React, { useState, useEffect } from "react";
import { perfumes as initialPerfumes } from "./mock/perfumes";
import { users } from "./mock/users";
import { orders as initialOrders } from "./mock/orders";

import PerfumeHeader from "./components/PerfumeHeader";
import PerfumeHero from "./components/PerfumeHero";
import PerfumeFilters from "./components/PerfumeFilters";
import PerfumeCard from "./components/PerfumeCard";
import PerfumeDetail from "./components/PerfumeDetail";
import PerfumeCart from "./components/PerfumeCart";
import AuthLogin from "./components/AuthLogin";
import AdminPerfumeList from "./components/AdminPerfumeList";
import AdminPerfumeForm from "./components/AdminPerfumeForm";
import AdminOrderList from "./components/AdminOrderList";
import AdminOrderDetail from "./components/AdminOrderDetail";
import UserOrderList from "./components/UserOrderList";
import AboutUsPage from "./components/AboutUsPage";
import FAQPage from "./components/FAQPage";

import { sendWhatsAppMessage } from "./utils/whatsapp";
import { AnimatePresence, motion } from "framer-motion";

const App = () => {
  const [perfumes, setPerfumes] = useState(initialPerfumes);
  const [orders, setOrders] = useState(initialOrders);
  const [filteredPerfumes, setFilteredPerfumes] = useState(perfumes);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedBrand, setSelectedBrand] = useState("Todas");
  const [priceRange, setPriceRange] = useState(3000);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPerfume, setSelectedPerfume] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");

  const [currentUser, setCurrentUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  const [editingPerfume, setEditingPerfume] = useState(null);
  const [showingOrderDetail, setShowingOrderDetail] = useState(null);

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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // también puedes usar behavior: 'auto'
  }, [currentPage]);

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
    if (!currentUser) {
      alert("Por favor, inicia sesión para realizar un pedido.");
      setShowLogin(true);
      return;
    }

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const newOrder = {
      id: `order${orders.length + 1}`,
      userId: currentUser.id,
      items: cartItems.map((item) => ({
        perfumeId: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total: total,
      status: "Pendiente",
      date: new Date().toISOString(),
    };
    setOrders([...orders, newOrder]);
    sendWhatsAppMessage(cartItems, total);
    setCartItems([]); // Vaciar carrito después de "comprar"
    setIsCartOpen(false);
    alert("Tu pedido ha sido enviado. ¡Gracias por tu compra!");
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogin = (username, password) => {
    const foundUser = users.find((user) => user.username === username && user.password === password);
    if (foundUser) {
      setCurrentUser(foundUser);
      setShowLogin(false);
      setCurrentPage("home"); // Redirigir a home después de login
    } else {
      alert("Usuario o contraseña incorrectos.");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage("home");
  };

  const handleNavigate = (page) => {
    if (page === "adminPerfumes" || page === "adminOrders" || page === "userOrders") {
      if (!currentUser) {
        alert("Necesitas iniciar sesión para acceder a esta sección.");
        setShowLogin(true);
        return;
      }
      if (page.startsWith("admin") && currentUser.role !== "admin") {
        alert("No tienes permisos para acceder a esta sección.");
        return;
      }
    }
    setCurrentPage(page);
  };

  // Admin Perfume Management
  const handleAddPerfume = () => {
    setEditingPerfume({}); // Objeto vacío para nuevo perfume
  };

  const handleEditPerfume = (perfume) => {
    setEditingPerfume(perfume);
  };

  const handleDeletePerfume = (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este perfume?")) {
      setPerfumes(perfumes.filter((p) => p.id !== id));
    }
  };

  const handleSavePerfume = (perfumeData) => {
    if (perfumeData.id) {
      // Editar existente
      setPerfumes(perfumes.map((p) => (p.id === perfumeData.id ? perfumeData : p)));
    } else {
      // Agregar nuevo
      const newId = `perfume${perfumes.length + 1}`;
      setPerfumes([...perfumes, { ...perfumeData, id: newId }]);
    }
    setEditingPerfume(null); // Cerrar formulario
  };

  // Admin Order Management
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)));
  };

  const handleDeleteOrder = (orderId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este pedido?")) {
      setOrders(orders.filter((order) => order.id !== orderId));
    }
  };

  const handleViewOrderDetail = (order) => {
    setShowingOrderDetail(order);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
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
        );
      case "adminPerfumes":
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <AdminPerfumeList
              perfumes={perfumes}
              onEdit={handleEditPerfume}
              onDelete={handleDeletePerfume}
              onAdd={handleAddPerfume}
            />
          </div>
        );
      case "adminOrders":
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <AdminOrderList
              orders={orders}
              onUpdateStatus={handleUpdateOrderStatus}
              onDeleteOrder={handleDeleteOrder}
              onViewDetails={handleViewOrderDetail}
            />
          </div>
        );
      case "userOrders":
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <UserOrderList orders={orders} userId={currentUser.id} />
          </div>
        );
      case "aboutUs":
        return <AboutUsPage onNavigate={handleNavigate} />;
      case "faq":
        return <FAQPage onNavigate={handleNavigate} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-pink-50">
      <PerfumeHeader
        onSearch={setSearchTerm}
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        onLoginClick={() => setShowLogin(true)}
        onLogoutClick={handleLogout}
        currentUser={currentUser} // Pasar el objeto currentUser completo
        onNavigate={handleNavigate}
      />

      {renderPage()}

      <footer className="bg-pink-900 text-white py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-pink-200 mb-2">PerfumeShop</h3>
            <p className="text-pink-100">Tu destino para fragancias exclusivas.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-4 text-pink-100">
            <a href="#" onClick={() => handleNavigate("aboutUs")} className="hover:text-pink-300 transition-colors">
              Sobre Nosotros
            </a>
            <a href="#" className="hover:text-pink-300 transition-colors">
              Política de Privacidad
            </a>
            <a href="#" className="hover:text-pink-300 transition-colors">
              Términos y Condiciones
            </a>
            <a href="#" onClick={() => handleNavigate("faq")} className="hover:text-pink-300 transition-colors">
              Preguntas Frecuentes
            </a>
          </div>
          <div className="mb-4 text-pink-100">
            <p>Teléfono: +52 55 1234 5678</p>
            <p>Email: info@perfumeshop.com</p>
          </div>
          <p className="text-pink-300 text-sm">
            &copy; {new Date().getFullYear()} PerfumeShop. Todos los derechos reservados.
          </p>
        </div>
      </footer>

      <PerfumeDetail perfume={selectedPerfume} onClose={() => setSelectedPerfume(null)} onAddToCart={handleAddToCart} />

      <PerfumeCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      {showLogin && (
        <AuthLogin
          users={users}
          onLogin={(user) => {
            setCurrentUser(user);
            setShowLogin(false);
            setCurrentPage("home");
          }}
          onClose={() => setShowLogin(false)}
        />
      )}

      {editingPerfume && (
        <AdminPerfumeForm
          perfume={editingPerfume.id ? editingPerfume : null}
          onSave={handleSavePerfume}
          onClose={() => setEditingPerfume(null)}
        />
      )}
      {showingOrderDetail && (
        <AdminOrderDetail order={showingOrderDetail} onClose={() => setShowingOrderDetail(null)} />
      )}
    </div>
  );
};

export default App;

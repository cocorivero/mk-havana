import React, { useState } from "react";
import { Info } from "lucide-react";
import { ShoppingCart } from "lucide-react";

const PerfumeHeader = ({ onSearch, cartCount, onCartClick, onLoginClick, onLogoutClick, currentUser, onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleNavigationClick = (page) => {
    onNavigate(page);
    setIsDropdownOpen(false); // Cerrar dropdown al navegar
  };

  const handleLogoutClick = () => {
    onLogoutClick();
    setIsDropdownOpen(false); // Cerrar dropdown al cerrar sesión
  };

  const getInitials = (username) => {
    return username ? username.charAt(0).toUpperCase() : "";
  };

  return (
    <header className="bg-pink-100 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center cursor-pointer" onClick={() => onNavigate("home")}>
              <img src="/img/icon-hear.png" alt="PerfumeShop Logo" className="h-10 w-10 rounded-full object-cover" />
              <h1 className="ml-2 text-2xl font-bold text-pink-900">MK Havana</h1>
            </div>
          </div>

          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar perfumes..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full px-4 py-2 pl-10 pr-4 text-pink-700 bg-pink-50 border border-pink-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              <svg
                className="absolute left-3 top-2.5 w-5 h-5 text-pink-400"
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
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="mr-8">
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="w-10 h-10 rounded-full bg-pink-600 text-white font-bold flex items-center justify-center text-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    {getInitials(currentUser.username)}
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
                      {currentUser.role === "admin" && (
                        <>
                          <button
                            onClick={() => handleNavigationClick("adminPerfumes")}
                            className="block w-full text-left px-4 py-2 text-pink-700 hover:bg-pink-100"
                          >
                            Gestión Perfumes
                          </button>
                          <button
                            onClick={() => handleNavigationClick("adminOrders")}
                            className="block w-full text-left px-4 py-2 text-pink-700 hover:bg-pink-100"
                          >
                            Gestión Pedidos
                          </button>
                        </>
                      )}
                      {currentUser.role === "user" && (
                        <button
                          onClick={() => handleNavigationClick("userOrders")}
                          className="block w-full text-left px-4 py-2 text-pink-700 hover:bg-pink-100"
                        >
                          Mis Pedidos
                        </button>
                      )}
                      <div className="border-t border-pink-100 my-1"></div>
                      <button
                        onClick={handleLogoutClick}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                      >
                        Cerrar Sesión
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={onLoginClick}
                  className="bg-pink-500 text-white py-1 px-3 rounded-lg font-semibold hover:bg-pink-600 transition-colors"
                >
                  Entrar
                </button>
              )}
            </div>

            <button
              onClick={() => handleNavigationClick("aboutUs")}
              className="text-pink-600 hover:text-pink-800 transition-colors font-semibold"
              title="Sobre Nosotros"
            >
              <Info />
            </button>

            <button onClick={onCartClick} className="relative text-pink-600 hover:text-pink-800 transition-colors">
              <ShoppingCart />
              {cartCount > 0 && (
                <span className="absolute -top-3 -right-5 bg-pink-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PerfumeHeader;

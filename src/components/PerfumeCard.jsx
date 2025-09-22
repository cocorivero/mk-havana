import React from "react";
import { useNavigate } from "react-router-dom";

const PerfumeCard = ({ perfume, onAddToCart }) => {
  const navigate = useNavigate();

  const discount = Math.round(
    ((perfume.originalPrice - perfume.price) / perfume.originalPrice) * 100
  );

  // ---- NUEVO: estado y timer del toast ----
  const [showToast, setShowToast] = React.useState(false);
  const toastTimer = React.useRef(null);

  const handleAdd = () => {
    onAddToCart(perfume);
    // Limpia cualquier timer previo para evitar superposiciones
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setShowToast(true);
    toastTimer.current = setTimeout(() => setShowToast(false), 2500);
  };

  // Limpieza al desmontar
  React.useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);
  // -----------------------------------------

  return (
    <>
      <div className="bg-pink-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col justify-between">
        <div className="relative overflow-hidden">
          <img
            src={perfume.image}
            alt={perfume.name}
            loading="lazy"
            decoding="async"
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {discount > 0 && (
            <div className="absolute top-3 left-3 bg-pink-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              -{discount}%
            </div>
          )}
          {!perfume.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-semibold text-sm">{perfume.upComing ? "En camino" : "Agotado"}</span>
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-pink-600 font-medium">{perfume.brand}</span>
            <span className="text-xs text-gray-500">{perfume.category}</span>
          </div>

          <h3 className="text-lg font-bold text-pink-900 mb-1">{perfume.name}</h3>

          <p className="text-gray-600 text-xs mb-2 line-clamp-2">{perfume.description}</p>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-1">
              <span className="text-lg font-bold text-pink-900">${perfume.price}</span>
              {discount > 0 && (
                <span className="text-sm text-gray-500 line-through">
                  ${perfume.originalPrice}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-xs text-gray-500">{perfume.format}</span>
              <span className="text-xs text-gray-500">{perfume.size}</span>
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => navigate(`/perfumes/${perfume.id}`)}
              className="flex-1 bg-pink-100 text-pink-700 py-1 px-2 rounded-md text-sm hover:bg-pink-200 transition-colors"
            >
              Detalles
            </button>
            <button
              onClick={handleAdd}
              disabled={!perfume.inStock}
              className={`flex-1 py-1 px-2 rounded-md text-sm font-medium transition-colors ${
                perfume.inStock
                  ? "bg-pink-600 text-white hover:bg-pink-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {perfume.inStock ? "Agregar" : "Agotado"}
            </button>
          </div>
        </div>
      </div>

      {/* ---- NUEVO: Toast flotante ---- */}
      <div
        aria-live="polite"
        className="pointer-events-none fixed bottom-4 right-4 z-50"
      >
        <div
          className={`transform transition-all duration-300 ease-out ${
            showToast ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <div className="pointer-events-auto bg-white shadow-lg rounded-xl px-4 py-3 border border-pink-200">
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-pink-600"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 10-1.414 1.414L9 13.414l4.707-4.707z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm text-pink-900">
                <span className="font-semibold">{perfume.name}</span> se agregó al carrito.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* -------------------------------- */}
    </>
  );
};

export default PerfumeCard;

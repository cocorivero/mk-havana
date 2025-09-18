import React from "react";
import { ArrowLeft } from "lucide-react";

const PerfumeDetail = ({ perfume, onAddToCart }) => {
  if (!perfume) return <p className="text-center mt-10">Perfume no encontrado.</p>;

  const discount = Math.round(((perfume.originalPrice - perfume.price) / perfume.originalPrice) * 100);

  return (
    <main className="bg-pink-50 min-h-screen py-10 px-6 sm:px-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Imagen y descuento */}
        <div className="relative">
          <img src={`/${perfume.image}`} alt={perfume.name} className="w-full h-[32rem] object-cover rounded-2xl" />
          {discount > 0 && (
            <div className="absolute top-4 left-4 bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              -{discount}%
            </div>
          )}
        </div>

        {/* Detalles */}
        <div className="pb-8  flex flex-col justify-between">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-pink-700 hover:text-pink-900 rounded-xl transition-colors"
            aria-label="Volver a la página anterior"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver
          </button>
          <div>
            {/* >>> Botón Volver (arriba del brand) <<< */}

            <span className="text-lg text-pink-600 font-medium">{perfume.brand}</span>

            <div className="flex items-center justify-between my-2">
              <h1 className="text-4xl font-bold text-pink-900">{perfume.name}</h1>
              <span className="bg-pink-100 text-pink-700 px-3 py-3 rounded-full text-sm">{perfume.category}</span>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">{perfume.description}</p>

            <h3 className="text-lg font-semibold text-pink-900 mb-5">Notas olfativas</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {perfume.notes.map((note, index) => (
                <span key={index} className="bg-pink-200 text-pink-800 px-3 py-1 rounded-full text-sm">
                  {note}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-pink-900">${perfume.price}</span>
                {discount > 0 && <span className="text-xl text-gray-500 line-through">${perfume.originalPrice}</span>}
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-lg text-gray-600">{perfume.format}</span>
                <span className="text-lg text-gray-600">{perfume.size}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {perfume.inStock ? (
              <span className="text-green-600 font-medium text-sm">✓ Disponible en stock</span>
            ) : (
              <span className="text-yellow-600 font-medium text-sm">¡Disponible por encargo!</span>
            )}

            <button
              onClick={() => onAddToCart(perfume)}
              disabled={!perfume.inStock}
              className={`w-full py-3 px-6 rounded-lg font-semibold text-lg transition-colors ${
                perfume.inStock
                  ? "bg-pink-600 text-white hover:bg-pink-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {perfume.inStock ? "Agregar al carrito" : perfume.upComing ? "Disponible pronto" : "Agotado" }
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PerfumeDetail;

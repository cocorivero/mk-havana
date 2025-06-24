import React from "react";

const PerfumeCart = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onCheckout }) => {
  if (!isOpen) return null;

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-end z-50">
      <div className="bg-pink-50 h-full w-full max-w-md overflow-y-auto">
        <div className="p-6 border-b border-pink-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-pink-900">Carrito de compras</h2>
            <button onClick={onClose} className="p-2 hover:bg-pink-100 rounded-full transition-colors">
              <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1 p-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="w-16 h-16 text-pink-300 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <p className="text-pink-500">Tu carrito está vacío</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 bg-pink-100 p-4 rounded-lg">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-pink-900">{item.name}</h3>
                    <p className="text-sm text-pink-600">{item.brand}</p>
                    <p className="text-lg font-bold text-pink-700">${item.price}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 bg-pink-200 rounded-full flex items-center justify-center hover:bg-pink-300 transition-colors text-pink-800"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-semibold text-pink-800">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 bg-pink-200 rounded-full flex items-center justify-center hover:bg-pink-300 transition-colors text-pink-800"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t border-pink-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold text-pink-900">Total:</span>
              <span className="text-2xl font-bold text-pink-700">${total}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full bg-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
            >
              Finalizar compra por WhatsApp
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PerfumeCart;

import React from "react";
import { Plus, Minus, ShoppingCart } from "lucide-react";

const toSafeSrc = (src) => {
  if (!src) return "/placeholder.png";
  if (/^https?:\/\//i.test(src)) return src;
  if (!src.startsWith("/")) return `/${src}`;
  return src;
};

const PerfumeCart = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onCheckout }) => {
  const hasPushedRef = React.useRef(false);
  const popHandlerRef = React.useRef(null);

  // Vincular el modal al botón Atrás
  React.useEffect(() => {
    if (!isOpen) return;

    // Empuja un estado para que "Atrás" cierre el modal
    if (!hasPushedRef.current) {
      history.pushState({ cartOpen: true }, "", "");
      hasPushedRef.current = true;
    }

    // popstate: cerrar el modal
    const onPop = () => {
      hasPushedRef.current = false;
      onClose(); // cerramos el carrito en vez de navegar
    };
    popHandlerRef.current = onPop;
    window.addEventListener("popstate", onPop);

    // Escape también cierra "como atrás"
    const onKey = (e) => {
      if (e.key === "Escape") {
        handleClose(); // usa history.back() para consumir el estado
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  // Cerrar consumiendo el estado si lo empujamos
  const handleClose = () => {
    if (hasPushedRef.current) {
      // Esto disparará popstate -> onClose()
      history.back();
    } else {
      // Por si el modal se abre sin pushState (caso raro)
      onClose();
    }
  };

  if (!isOpen) return null;

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-end z-50" role="dialog" aria-modal="true">
      <div className="bg-pink-50 h-full w-full max-w-md overflow-y-auto">
        <div className="p-4 border-b border-pink-200">
          <div className="relative">
            <h2 className="text-xl font-bold text-pink-900 text-center">Carrito de compras</h2>
            <button
              onClick={handleClose}
              className="absolute top-0 right-0 p-2 hover:bg-pink-100 rounded-full transition-colors"
              aria-label="Cerrar carrito"
            >
              <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <p className="text-sm text-pink-700 text-center">
            ¿Te interesa un producto agotado?
            <br />
            Contáctanos y te ayudamos con su encargo
          </p>
        </div>

        <div className="flex-1 p-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 text-pink-300 mx-auto mb-4" />
              <p className="text-pink-500">Tu carrito está vacío</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => {
                const src = toSafeSrc(item.image);
                return (
                  <div key={item.id} className="flex items-center space-x-4 bg-pink-100 p-4 rounded-lg">
                    <img
                      src={src}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                      loading="lazy"
                      onError={(e) => { e.currentTarget.src = "/placeholder.png"; }}
                    />
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
                        <Minus />
                      </button>
                      <span className="w-8 text-center font-semibold text-pink-800">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-pink-200 rounded-full flex items-center justify-center hover:bg-pink-300 transition-colors text-pink-800"
                      >
                        <Plus />
                      </button>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      aria-label={`Eliminar ${item.name}`}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                );
              })}
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

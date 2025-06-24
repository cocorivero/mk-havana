import React from 'react';

const AdminOrderDetail = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-pink-900">Detalle del Pedido #{order.id}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div className="space-y-4 text-gray-800">
          <p><span className="font-semibold">Usuario:</span> {order.userId}</p>
          <p><span className="font-semibold">Fecha:</span> {new Date(order.date).toLocaleString()}</p>
          <p><span className="font-semibold">Estado:</span> {order.status}</p>
          <p><span className="font-semibold">Total:</span> ${order.total}</p>

          <h3 className="text-xl font-bold text-pink-800 mt-6 mb-3">Productos:</h3>
          <ul className="space-y-3">
            {order.items.map((item, index) => (
              <li key={index} className="bg-pink-100 p-4 rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                </div>
                <p className="font-bold text-pink-700">${item.price * item.quantity}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 text-right">
          <button
            onClick={onClose}
            className="bg-pink-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetail;
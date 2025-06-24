import React, { useState } from 'react';

const UserOrderList = ({ orders, userId }) => {
  const userOrders = orders.filter(order => order.userId === userId);
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div className="bg-pink-50 p-8 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-pink-900 mb-6">Mis Pedidos</h2>

      {userOrders.length === 0 ? (
        <div className="text-center py-12 text-gray-600">
          <p>Aún no tienes pedidos.</p>
          <p>¡Explora nuestros perfumes y haz tu primera compra!</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-pink-200">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold text-pink-800">ID Pedido</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-pink-800">Fecha</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-pink-800">Total</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-pink-800">Estado</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-pink-800">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {userOrders.map((order) => (
                <tr key={order.id} className="border-b border-pink-100 last:border-b-0 hover:bg-pink-50">
                  <td className="py-3 px-4 text-sm text-gray-800">{order.id}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">${order.total}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">{order.status}</td>
                  <td className="py-3 px-4 text-sm">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      Ver Detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-pink-900">Detalle del Pedido #{selectedOrder.id}</h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <div className="space-y-4 text-gray-800">
              <p><span className="font-semibold">Fecha:</span> {new Date(selectedOrder.date).toLocaleString()}</p>
              <p><span className="font-semibold">Estado:</span> {selectedOrder.status}</p>
              <p><span className="font-semibold">Total:</span> ${selectedOrder.total}</p>
              <h4 className="text-lg font-bold text-pink-800 mt-6 mb-3">Productos:</h4>
              <ul className="space-y-3">
                {selectedOrder.items.map((item, index) => (
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
                onClick={() => setSelectedOrder(null)}
                className="bg-pink-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserOrderList;
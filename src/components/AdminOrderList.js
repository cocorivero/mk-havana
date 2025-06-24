import React, { useState } from 'react';

const AdminOrderList = ({ orders, onUpdateStatus, onDeleteOrder, onViewDetails }) => {
  const [filterStatus, setFilterStatus] = useState('Todos');
  const [filterText, setFilterText] = useState('');

  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'Todos' || order.status === filterStatus;
    const matchesText = filterText === '' || 
                        order.id.toLowerCase().includes(filterText.toLowerCase()) ||
                        order.userId.toLowerCase().includes(filterText.toLowerCase()) ||
                        order.items.some(item => item.name.toLowerCase().includes(filterText.toLowerCase()));
    return matchesStatus && matchesText;
  });

  const statusOptions = ['Todos', 'Pendiente', 'Enviado', 'Entregado', 'Cancelado'];

  return (
    <div className="bg-pink-50 p-8 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-pink-900 mb-6">Gestión de Pedidos</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-pink-700 text-sm font-semibold mb-2">Filtrar por Estado</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-pink-800"
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-pink-700 text-sm font-semibold mb-2">Buscar por ID/Usuario/Producto</label>
          <input
            type="text"
            placeholder="Buscar..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-pink-800"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-pink-200">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold text-pink-800">ID Pedido</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-pink-800">Usuario</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-pink-800">Total</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-pink-800">Estado</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-pink-800">Fecha</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-pink-800">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-b border-pink-100 last:border-b-0 hover:bg-pink-50">
                <td className="py-3 px-4 text-sm text-gray-800">{order.id}</td>
                <td className="py-3 px-4 text-sm text-gray-800">{order.userId}</td>
                <td className="py-3 px-4 text-sm text-gray-800">${order.total}</td>
                <td className="py-3 px-4 text-sm">
                  <select
                    value={order.status}
                    onChange={(e) => onUpdateStatus(order.id, e.target.value)}
                    className="px-2 py-1 border border-pink-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-pink-500 text-pink-800 bg-white"
                  >
                    {statusOptions.slice(1).map(status => ( // Excluir 'Todos'
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </td>
                <td className="py-3 px-4 text-sm text-gray-800">{new Date(order.date).toLocaleDateString()}</td>
                <td className="py-3 px-4 text-sm">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onViewDetails(order)}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      Ver
                    </button>
                    <button
                      onClick={() => onDeleteOrder(order.id)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredOrders.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No se encontraron pedidos.</p>
      )}
    </div>
  );
};

export default AdminOrderList;
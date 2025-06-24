import React, { useState } from 'react';

const AdminPerfumeList = ({ perfumes, onEdit, onDelete, onAdd }) => {
  const [filterText, setFilterText] = useState('');

  const filteredPerfumes = perfumes.filter(perfume =>
    perfume.name.toLowerCase().includes(filterText.toLowerCase()) ||
    perfume.brand.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="bg-pink-50 p-8 rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-pink-900">Gestión de Perfumes</h2>
        <button
          onClick={onAdd}
          className="bg-pink-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
        >
          Agregar Nuevo Perfume
        </button>
      </div>

      <input
        type="text"
        placeholder="Buscar perfume..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        className="w-full px-4 py-2 mb-6 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-pink-800"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-pink-200">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold text-pink-800">ID</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-pink-800">Nombre</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-pink-800">Marca</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-pink-800">Precio</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-pink-800">Stock</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-pink-800">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredPerfumes.map((perfume) => (
              <tr key={perfume.id} className="border-b border-pink-100 last:border-b-0 hover:bg-pink-50">
                <td className="py-3 px-4 text-sm text-gray-800">{perfume.id}</td>
                <td className="py-3 px-4 text-sm text-gray-800">{perfume.name}</td>
                <td className="py-3 px-4 text-sm text-gray-800">{perfume.brand}</td>
                <td className="py-3 px-4 text-sm text-gray-800">${perfume.price}</td>
                <td className="py-3 px-4 text-sm text-gray-800">
                  {perfume.inStock ? (
                    <span className="text-green-600 font-semibold">Sí</span>
                  ) : (
                    <span className="text-red-600 font-semibold">No</span>
                  )}
                </td>
                <td className="py-3 px-4 text-sm">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(perfume)}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => onDelete(perfume.id)}
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
      {filteredPerfumes.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No se encontraron perfumes.</p>
      )}
    </div>
  );
};

export default AdminPerfumeList;
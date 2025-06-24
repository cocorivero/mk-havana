import React, { useState, useEffect } from 'react';

const AdminPerfumeForm = ({ perfume, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    brand: '',
    price: '',
    originalPrice: '',
    image: '',
    category: '',
    description: '',
    notes: '',
    size: '',
    inStock: true,
    rating: 0,
    reviews: 0,
  });

  useEffect(() => {
    if (perfume) {
      setFormData({
        ...perfume,
        notes: perfume.notes.join(', '), // Convertir array a string para el input
      });
    } else {
      setFormData({
        id: '',
        name: '',
        brand: '',
        price: '',
        originalPrice: '',
        image: '',
        category: '',
        description: '',
        notes: '',
        size: '',
        inStock: true,
        rating: 0,
        reviews: 0,
      });
    }
  }, [perfume]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSave = {
      ...formData,
      price: parseFloat(formData.price),
      originalPrice: parseFloat(formData.originalPrice),
      notes: formData.notes.split(',').map(note => note.trim()), // Convertir string a array
      rating: parseFloat(formData.rating),
      reviews: parseInt(formData.reviews),
    };
    onSave(dataToSave);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-3xl font-bold text-pink-900 mb-6 text-center">
          {perfume ? 'Editar Perfume' : 'Agregar Nuevo Perfume'}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-pink-700 text-sm font-semibold mb-2">Nombre</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required
              className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-pink-800" />
          </div>
          <div>
            <label className="block text-pink-700 text-sm font-semibold mb-2">Marca</label>
            <input type="text" name="brand" value={formData.brand} onChange={handleChange} required
              className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-pink-800" />
          </div>
          <div>
            <label className="block text-pink-700 text-sm font-semibold mb-2">Precio</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} required
              className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-pink-800" />
          </div>
          <div>
            <label className="block text-pink-700 text-sm font-semibold mb-2">Precio Original</label>
            <input type="number" name="originalPrice" value={formData.originalPrice} onChange={handleChange}
              className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-pink-800" />
          </div>
          <div>
            <label className="block text-pink-700 text-sm font-semibold mb-2">URL Imagen</label>
            <input type="text" name="image" value={formData.image} onChange={handleChange} required
              className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-pink-800" />
          </div>
          <div>
            <label className="block text-pink-700 text-sm font-semibold mb-2">Categoría</label>
            <select name="category" value={formData.category} onChange={handleChange} required
              className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-pink-800">
              <option value="">Selecciona una categoría</option>
              <option value="Femenino">Femenino</option>
              <option value="Masculino">Masculino</option>
              <option value="Unisex">Unisex</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-pink-700 text-sm font-semibold mb-2">Descripción</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required rows="3"
              className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-pink-800 resize-none"></textarea>
          </div>
          <div className="md:col-span-2">
            <label className="block text-pink-700 text-sm font-semibold mb-2">Notas (separadas por coma)</label>
            <input type="text" name="notes" value={formData.notes} onChange={handleChange}
              className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-pink-800" />
          </div>
          <div>
            <label className="block text-pink-700 text-sm font-semibold mb-2">Tamaño</label>
            <input type="text" name="size" value={formData.size} onChange={handleChange}
              className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-pink-800" />
          </div>
          <div>
            <label className="block text-pink-700 text-sm font-semibold mb-2">Rating</label>
            <input type="number" name="rating" value={formData.rating} onChange={handleChange} step="0.1" min="0" max="5"
              className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-pink-800" />
          </div>
          <div>
            <label className="block text-pink-700 text-sm font-semibold mb-2">Reseñas</label>
            <input type="number" name="reviews" value={formData.reviews} onChange={handleChange} min="0"
              className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-pink-800" />
          </div>
          <div className="flex items-center md:col-span-2">
            <input type="checkbox" name="inStock" checked={formData.inStock} onChange={handleChange}
              className="h-5 w-5 text-pink-600 rounded focus:ring-pink-500" />
            <label className="ml-2 text-pink-700 text-sm font-semibold">En Stock</label>
          </div>
          <div className="md:col-span-2 flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-pink-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPerfumeForm;
import React, { useState, useRef } from "react";

const AuthLogin = ({ users, onLogin, onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const modalRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Por favor, ingresa tu usuario y contraseña.");
      return;
    }

    const foundUser = users.find((user) => user.username === username && user.password === password);

    if (foundUser) {
      onLogin(foundUser);
    } else {
      setError("Usuario o contraseña incorrectos.");
    }
  };

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
    >
      <div ref={modalRef} className="relative bg-white rounded-2xl p-8 shadow-2xl w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-pink-600 hover:text-pink-800 text-2xl font-bold focus:outline-none"
          
          aria-label="Cerrar"
        >
          &times;
        </button>

        <h2 className="text-3xl font-bold text-pink-900 mb-6 text-center">Iniciar Sesión</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-pink-700 text-sm font-semibold mb-2" htmlFor="username">
              Usuario
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-pink-800"
              placeholder="Tu nombre de usuario"
            />
          </div>
          <div>
            <label className="block text-pink-700 text-sm font-semibold mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-pink-800"
              placeholder="Tu contraseña"
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-pink-700 transition-colors"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthLogin;

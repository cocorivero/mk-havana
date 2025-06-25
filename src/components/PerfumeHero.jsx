import React from "react";

const PerfumeHero = () => {
  return (
    <div className="relative text-white py-20">
      <div
        className="absolute inset-0 bg-cover bg-right sm:bg-center bg-no-repeat z-0"
        style={{ backgroundImage: `url("/img/portada.png")` }}
      />

      {/* <div className="absolute inset-0 bg-gradient-to-r from-pink-600/50 to-rose-400/50 z-10" /> */}

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-left">
          Descubre tu
          <span className="block text-pink-200">Fragancia Perfecta</span>
        </h1>

        <p className="text-xl md:text-2xl mb-8 max-w-3xl text-left">
          Explora nuestra exclusiva colección de perfumes de las mejores marcas del mundo. Encuentra la fragancia que
          define tu personalidad.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:justify-start">
          {/* Bloque 1 */}
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 flex items-center space-x-3">
            <svg className="w-8 h-8 text-pink-200" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="font-semibold">Calidad Premium</span>
          </div>

          {/* Bloque 2 */}
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 flex items-center space-x-3">
            <svg className="w-8 h-8 text-pink-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <span className="font-semibold">Envío a Domicilio</span>
          </div>

          {/* Bloque 3 */}
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 flex items-center space-x-3">
            <svg className="w-8 h-8 text-pink-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="font-semibold">Garantía 100%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfumeHero;

import React from 'react';

const AboutUsPage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-pink-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-pink-900 mb-6 text-center">Sobre Nosotros</h1>
          
          <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
            En PerfumeShop, creemos que cada fragancia cuenta una historia. Somos más que una tienda de perfumes; somos curadores de experiencias olfativas, dedicados a conectar a nuestros clientes con aromas que resuenan con su esencia y estilo de vida.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div>
              <h2 className="text-3xl font-bold text-pink-800 mb-4">Nuestra Misión</h2>
              <p className="text-gray-700 leading-relaxed">
                Nuestra misión es democratizar el acceso a perfumes de alta calidad, ofreciendo una selección diversa que abarca desde clásicos atemporales hasta las últimas tendencias. Nos esforzamos por brindar una experiencia de compra excepcional, informada y personalizada, asegurando que cada cliente encuentre su fragancia perfecta. Queremos que el acto de elegir un perfume sea un viaje de autodescubrimiento y placer.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-pink-800 mb-4">Nuestra Visión</h2>
              <p className="text-gray-700 leading-relaxed">
                Visualizamos un mundo donde el perfume es una extensión natural de la personalidad, una forma de expresión artística y un catalizador de recuerdos. Aspiramos a ser la plataforma líder en la venta de perfumes, reconocida por nuestra autenticidad, nuestro compromiso con la calidad y nuestra pasión por el arte de la perfumería. Queremos construir una comunidad de amantes de las fragancias.
              </p>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold text-pink-800 mb-6 text-center">¿Por Qué Elegirnos?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-pink-100 p-6 rounded-lg shadow-md text-center">
                <svg className="w-12 h-12 text-pink-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <h3 className="text-xl font-semibold text-pink-900 mb-2">Calidad Garantizada</h3>
                <p className="text-gray-700">Solo ofrecemos productos 100% originales y de las mejores marcas.</p>
              </div>
              <div className="bg-pink-100 p-6 rounded-lg shadow-md text-center">
                <svg className="w-12 h-12 text-pink-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c1.657 0 3 .895 3 2s-1.343 2-3 2-3-.895-3-2 1.343-2 3-2zM12 14c-1.657 0-3 .895-3 2v1h6v-1c0-1.105-1.343-2-3-2z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <h3 className="text-xl font-semibold text-pink-900 mb-2">Atención Personalizada</h3>
                <p className="text-gray-700">Nuestro equipo está listo para ayudarte a encontrar tu fragancia ideal.</p>
              </div>
              <div className="bg-pink-100 p-6 rounded-lg shadow-md text-center">
                <svg className="w-12 h-12 text-pink-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h10m-9 4h8m-10 0h2m-2-4h2m-2-4h2M3 6h18v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6z"/>
                </svg>
                <h3 className="text-xl font-semibold text-pink-900 mb-2">Precios Competitivos</h3>
                <p className="text-gray-700">Ofrecemos los mejores precios sin comprometer la calidad.</p>
              </div>
            </div>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-pink-800 mb-4">Nuestro Equipo</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Detrás de PerfumeShop hay un equipo apasionado por las fragancias, dedicado a ofrecerte lo mejor del mundo de la perfumería. Desde nuestros expertos en aromas hasta nuestro equipo de atención al cliente, todos trabajamos para tu satisfacción.
            </p>
            {/* Aquí podrías agregar fotos y descripciones de miembros del equipo si lo deseas */}
          </div>

          <div className="bg-pink-100 rounded-2xl p-8 shadow-md text-center mb-12">
            <h2 className="text-3xl font-bold text-pink-800 mb-4">Contáctanos</h2>
            <p className="text-gray-700 mb-4">
              ¿Tienes alguna pregunta, sugerencia o simplemente quieres charlar sobre perfumes? ¡Estamos aquí para escucharte!
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Email:</span> info@perfumeshop.com
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Teléfono:</span> +52 55 1234 5678
            </p>
            <p className="text-gray-700 mb-4">
              <span className="font-semibold">Dirección:</span> Calle de los Aromas #123, Colonia Fragancia, Ciudad de México, México
            </p>
            <button
              onClick={() => window.open('https://wa.me/5215512345678?text=Hola,%20me%20gustaría%20saber%20más%20sobre%20PerfumeShop.', '_blank')}
              className="bg-green-500 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-green-600 transition-colors flex items-center justify-center mx-auto"
            >
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.6-3.807-1.6-5.87 0-6.592 5.306-11.984 11.862-11.984 3.428 0 6.618 1.448 8.938 3.768 2.32 2.32 3.768 5.51 3.768 8.938 0 6.592-5.306 11.984-11.862 11.984-1.998 0-3.995-.48-5.799-1.448l-6.163 1.687zm6.592-3.998c1.185.681 2.542 1.048 3.998 1.048 5.45 0 9.862-4.412 9.862-9.862 0-5.45-4.412-9.862-9.862-9.862-5.45 0-9.862 4.412-9.862 9.862 0 1.456.367 2.813 1.048 3.998l-1.381 5.048 5.048-1.381zM17.5 12.2c-.2-.1-.8-.4-1.2-.6-.4-.2-.7-.2-.9-.2-.2 0-.4.1-.6.3-.2.2-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-1.7-1.6-2.3-2.4-2.6-2.9-.3-.5-.1-.7.1-.9.1-.1.2-.2.3-.3.1-.1.2-.2.3-.4.1-.2 0-.4-.1-.6-.1-.2-.9-2.2-1.2-3-.3-.8-.6-.7-.8-.7-.2 0-.4 0-.6.1-.2.1-.5.2-.8.5-.3.3-1 .9-1 2.2 0 1.3 1 2.5 1.1 2.7.2.2 1.9 3.1 4.6 4.3 2.7 1.2 2.7 1 3.2.9.5-.1 1.5-.6 1.7-.9.2-.2.4-.5.5-.7.1-.2.1-.4.1-.6 0-.2-.1-.4-.2-.5z"/>
              </svg>
              Envíanos un WhatsApp
            </button>
          </div>

          <div className="text-center">
            <button
              onClick={() => onNavigate('home')}
              className="bg-pink-600 text-white py-3 px-8 rounded-lg font-semibold text-lg hover:bg-pink-700 transition-colors"
            >
              Volver a la Tienda
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
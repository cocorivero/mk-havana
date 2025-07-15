import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

const FooterPage = () => {
  return (
    <footer className="bg-pink-900 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-pink-200 mb-2">MK Havana</h3>
          <p className="text-pink-100">Tu destino para fragancias exclusivas</p>
        </div>
        {/* <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-4 text-pink-100">
          <Link to="/aboutUs" className="hover:text-pink-300 transition-colors">
            Sobre Nosotros
          </Link>
          <a href="#" className="hover:text-pink-300 transition-colors">
            Política de Privacidad
          </a>
          <a href="#" className="hover:text-pink-300 transition-colors">
            Términos y Condiciones
          </a>
          <Link to="/faq" className="hover:text-pink-300 transition-colors">
            Preguntas Frecuentes
          </Link>
        </div> */}
        <div className="mb-4 text-pink-100">
          <p>Teléfono: +52 50524333</p>
          <p>Email: mkhavanastore@gmail.com</p>
          {/* Redes sociales */}
          <div className="flex justify-center space-x-6 mt-4">
            <a href="https://wa.me/50524333" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <FaWhatsapp className="w-6 h-6 text-green-500" />
            </a>
            <a
              href="https://www.instagram.com/mk_havana?igsh=Z3c4MmwwdmNremcx"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram className="w-6 h-6 text-pink-500" />
            </a>
            {/* <a
              href="https://www.facebook.com/tu_cuenta"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebook className="w-6 h-6 text-blue-600" />
            </a> */}
          </div>
        </div>
        <p className="text-pink-300 text-sm">
          &copy; {new Date().getFullYear()} MK Havana. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default FooterPage;

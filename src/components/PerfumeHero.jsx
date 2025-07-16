import React from "react";

import { LuStar } from "react-icons/lu";
import { FaMotorcycle } from "react-icons/fa";
import { LucideCheckCircle } from "lucide-react";
const PerfumeHero = () => {
  const features = [
    {
      icon: <LuStar className="w-8 h-8 text-pink-200" />,
      text: "Productos originales",
    },
    {
      icon: <FaMotorcycle className="w-8 h-8 text-pink-200" />,
      text: "Servicio de mensajería",
    },
    {
      icon: <LucideCheckCircle className="w-8 h-8 text-pink-200" />,
      text: "Calidad garantizada",
    },
  ];

  return (
    <div className="relative text-white py-20">
      <div
        className="absolute inset-0 bg-cover bg-right sm:bg-center bg-no-repeat z-0"
        style={{ backgroundImage: `url("img/portada.png")` }}
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
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white/20 backdrop-blur-md rounded-lg px-5 py-4 flex items-center gap-3 shadow-lg"
            >
              {item.icon}
              <span className="font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerfumeHero;

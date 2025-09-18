// hooks/useScrollRestoration.js
import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

let scrollPositions = {};

export const useScrollRestoration = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    const pathname = location.pathname;

    // Restaurar si tenemos una posición guardada
    if (scrollPositions[pathname]) {
      const y = scrollPositions[pathname];
      requestAnimationFrame(() => {
        window.scrollTo(0, y);
      });
    }

    const handleBeforeUnload = () => {
      scrollPositions[pathname] = window.scrollY;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      scrollPositions[pathname] = window.scrollY;
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [location.pathname]);
};

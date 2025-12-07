import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { Toaster } from "./components/ui/sonner";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function App() {
  useEffect(() => {
    // 1. Inicializar Lenis (Configuración sugerida por usuario)
    const lenis = new Lenis({
      lerp: 0.08, // Configuración clásica y robusta
      smoothWheel: true,
      wheelMultiplier: 1,
      syncTouch: false,
    });

    // Sincronizar Lenis con GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Inyectar el RAF de Lenis en el Ticker de GSAP
    // Esto asegura que ambos se actualicen en el mismo frame
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Desactivar ajuste de lag para scroll más fluido
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="noise-overlay">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;

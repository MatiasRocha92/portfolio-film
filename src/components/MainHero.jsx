import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- CONFIGURACIÓN DE VIDEO ---
// Ahora soporta tanto Vimeo como MP4 directo
const HERO_VIDEO_URL = "https://player.vimeo.com/video/148799600?h=5a5b1a4670";

export const MainHero = () => {
  const containerRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const titleWrapperRef = useRef(null);
  const textBlockRef = useRef(null);
  const blocksRef = useRef([]);

  // Detectar tipo de video
  const isVimeo = HERO_VIDEO_URL.includes('vimeo');
  
  // Preparar URL de Vimeo para modo background (sin UI, autoplay, loop, mute)
  const vimeoSrc = isVimeo 
    ? (HERO_VIDEO_URL.includes('?') 
        ? `${HERO_VIDEO_URL}&background=1&autoplay=1&loop=1&byline=0&title=0&muted=1` 
        : `${HERO_VIDEO_URL}?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1`)
    : '';

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // --- INTRO SEQUENCE ---
      const tl = gsap.timeline({ delay: 0.1 });

      // 1. Taglines Entran (Primero)
      tl.from(".tagline-anim", {
        y: "110%",
        duration: 1,
        stagger: 0.1,
        ease: "power3.out"
      });

      // 2. Espera de 1 segundo
      tl.addLabel("titleStart", "+=1"); // Pequeña pausa antes del título

      // 3. Título entra (Blur Reveal)
      tl.from(".char-anim", {
        filter: "blur(20px)",
        y: "50%",
        opacity: 0,
        duration: 1.5,
        stagger: 0.02,
        ease: "power3.out"
      }, "titleStart");

      // 4. Video Reveal (Empieza 0.4s ANTES que el título)
      tl.to(blocksRef.current, {
        scaleX: 0, 
        transformOrigin: "left center",
        duration: 1.5,
        stagger: 0.2, // Mantengo el stagger del usuario
        ease: "expo.inOut"
      }, "titleStart-=1");

      // --- SCROLL ANIMATIONS ---
      const tlScroll = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top", 
          scrub: 0, 
        }
      });

      // Título
      tlScroll.to(titleWrapperRef.current, { y: "-50%", ease: "none" }, 0);

      // Video
      tlScroll.to(videoWrapperRef.current, { y: "20%", ease: "none" }, 0);

      // Efecto Rebote Texto
      tlScroll.to(textBlockRef.current, {
        keyframes: {
          "0%":   { y: "0%" },
          "75%":  { y: "20%" },
          "100%": { y: "-150%" }
        },
        ease: "none"
      }, 0);
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const taglines = ['TRANSFORMA', 'TU IDEA', 'EN', 'UNA EXPERIENCIA VISUAL.'];
  const titleText = "NAHUFILMMAKER";

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-[180vh] bg-black"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col lg:flex-row">
        
        {/* TITLE OVERLAY */}
        <div 
           ref={titleWrapperRef}
           className="absolute top-12 left-10 z-50 pointer-events-none mix-blend-difference"
        >
           <div className="overflow-visible pr-4">
              <h1 
                className="text-white font-medium tracking-tighter block whitespace-nowrap flex overflow-hidden"
                style={{
                  fontSize: 'clamp(5rem, 20vw, 22rem)', 
                  lineHeight: '0.85',
                  letterSpacing: '-0.04em', 
                  marginLeft: '91px'
                }}
              >
                {titleText.split('').map((char, index) => (
                  <span key={index} className="inline-block char-anim will-change-transform">
                    {char}
                  </span>
                ))}
              </h1>
           </div>
        </div>

        {/* LEFT COLUMN - Taglines */}
        <div className="lg:w-[35%] w-full h-full relative z-20 hidden lg:block bg-black">
          <div 
            ref={textBlockRef}
            className="absolute bottom-16 left-10 pr-8 z-20 text-white"
          >
            <div className="space-y-2 opacity-90">
              {taglines.map((text, i) => (
                <div 
                  key={i} 
                  className={`overflow-hidden line-parent ${i === 2 ? 'mt-10' : ''}`}
                >
                  <div className="text-3xl lg:text-5xl font-bold leading-none tracking-tight tagline-anim">
                    {text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - Video with MASK REVEAL */}
        <div className="flex-1 h-full relative bg-black overflow-hidden flex items-center justify-center z-10">
           <div 
             ref={videoWrapperRef}
             className="w-full h-full relative group" 
           >
             {isVimeo ? (
               <iframe
                 src={vimeoSrc}
                 className="absolute inset-0 w-full h-full object-cover pointer-events-none scale-150"
                 frameBorder="0"
                 allow="autoplay; fullscreen; picture-in-picture"
                 title="Hero Video"
               />
             ) : (
               <video
                className="absolute inset-0 w-full h-full object-cover"
                src={HERO_VIDEO_URL}
                autoPlay
                loop
                muted
                playsInline
              />
             )}

            {/* REVEAL BLOCKS (Staircase Effect) */}
            <div className="absolute inset-0 z-20 flex flex-col h-full w-full pointer-events-none">
              {[0, 1, 2, 3, 4].map((i) => (
                <div 
                  key={i}
                  ref={el => blocksRef.current[i] = el}
                  className="flex-1 w-full bg-black origin-left scale-y-105" // Escala Y > 100% para evitar líneas divisorias
                />
              ))}
            </div>

           </div>
           
           {/* Mobile Content (Alternative) */}
           <div className="absolute inset-0 flex flex-col justify-between p-8 lg:hidden z-30 pointer-events-none mix-blend-difference">
              <h1 className="text-white text-[18vw] font-bold mt-20 leading-none tracking-tighter">NAHUEL</h1>
           </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-[65%] -translate-x-1/2 text-white flex flex-col items-center gap-2 opacity-50 hidden lg:flex mix-blend-difference z-40">
           <span className="text-[10px] uppercase tracking-[0.3em] font-medium">Scroll</span>
           <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>

      </div>
    </section>
  );
};

export default MainHero;

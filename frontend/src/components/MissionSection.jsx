import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Separator } from './ui/separator';

gsap.registerPlugin(ScrollTrigger);

export const MissionSection = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // Animación de Textos "Mask Reveal"
      // Seleccionamos todos los elementos con la clase .reveal-text
      const textElements = gsap.utils.toArray('.reveal-text');

      textElements.forEach((text) => {
        // El padre debe tener overflow-hidden (ya está en el JSX)
        // Animamos el texto desde abajo
        gsap.fromTo(text, 
          { y: "100%", skewY: 7 },
          { 
            y: "0%", 
            skewY: 0,
            duration: 1.5, 
            ease: "power4.out",
            scrollTrigger: {
              trigger: text,
              start: "top 95%", // Empieza cuando el texto entra un poco
            }
          }
        );
      });

      // Animación del Separador (Línea)
      gsap.fromTo(".separator-line",
        { scaleX: 0, transformOrigin: "left center" },
        { 
          scaleX: 1, 
          duration: 1.5, 
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".separator-line",
            start: "top 90%"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-background py-32 md:py-48 lg:py-64"
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
          
          {/* Mission */}
          <div>
            <div className="overflow-hidden mb-6">
               <span className="text-label block reveal-text">Misión</span>
            </div>
            
            <div className="overflow-hidden">
              <p className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed text-foreground reveal-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit —
              </p>
            </div>
            <div className="overflow-hidden">
               <p className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed text-foreground reveal-text">
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
               </p>
            </div>
            <div className="overflow-hidden">
               <p className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed text-foreground reveal-text">
                 Ut enim ad minim veniam.
               </p>
            </div>
          </div>

          {/* Goal */}
          <div>
            <div className="overflow-hidden mb-6">
              <span className="text-label block reveal-text">Objetivo</span>
            </div>
            
            <div className="space-y-6">
               <div className="overflow-hidden">
                 <p className="text-editorial reveal-text">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                 </p>
               </div>
               
               <div className="overflow-hidden">
                 <p className="text-editorial reveal-text">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.
                 </p>
               </div>
            </div>
          </div>
        </div>

        {/* Decorative Line */}
        <div className="mt-32 md:mt-48 separator-line w-full">
          <Separator className="bg-border/50" />
        </div>
      </div>
    </section>
  );
};

export default MissionSection;

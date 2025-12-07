import React from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { AnimatedTitle } from './ui/AnimatedTitle';

export const ContactSection = () => {
  return (
    <section
      id="contact"
      className="relative z-10 bg-background pt-32 pb-24 md:pt-48 md:pb-32 rounded-b-[3rem] shadow-2xl"
      style={{ marginBottom: '80vh' }} // El espacio para que se vea el footer
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Giant Title */}
        <div className="mb-24 md:mb-32">
          <AnimatedTitle 
            text="Let's Work" 
            className="title-section text-foreground text-[12vw] leading-[0.85] tracking-tighter uppercase"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">
          
          {/* Left: Context */}
          <div className="space-y-12">
             <p className="text-2xl md:text-3xl font-light leading-snug text-foreground max-w-xl">
               ¿Tienes un proyecto en mente? Actualmente estamos aceptando nuevos clientes para el primer trimestre de 2025.
             </p>
             
             <a
                href="mailto:contacto@nahuelfilmmaker.com"
                className="group flex items-center gap-4 text-xl tracking-wide text-foreground hover:opacity-50 transition-opacity duration-300"
              >
                <div className="p-4 rounded-full border border-foreground/20 group-hover:border-foreground transition-colors">
                   <Mail className="w-6 h-6" />
                </div>
                contacto@nahuelfilmmaker.com
             </a>
          </div>

          {/* Right: Minimal Form */}
          <form className="space-y-8 w-full max-w-lg">
             <div className="group">
                <Input
                  type="email"
                  placeholder="Tu Email"
                  className="bg-transparent border-0 border-b-2 border-foreground/10 px-0 py-8 text-2xl placeholder:text-foreground/20 focus-visible:ring-0 focus-visible:border-foreground transition-colors"
                />
             </div>
             
             <div className="pt-8">
                <Button
                  size="lg"
                  className="w-full h-16 text-lg bg-foreground text-background hover:bg-foreground/90 rounded-full flex justify-between items-center px-8 group"
                >
                  Enviar Mensaje
                  <div className="bg-background text-foreground rounded-full p-2 group-hover:translate-x-1 transition-transform">
                     <ArrowUpRight className="w-5 h-5" />
                  </div>
                </Button>
             </div>
          </form>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;

import React from 'react';
import { Instagram, Twitter, Linkedin, Dribbble } from 'lucide-react';

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Dribbble, href: '#', label: 'Dribbble' },
];

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full h-[80vh] bg-[#111] text-white -z-10 flex flex-col justify-between px-6 md:px-20 py-20">
      
      {/* Top Content */}
      <div className="flex flex-col md:flex-row justify-between items-start">
         <div>
            <span className="text-gray-500 uppercase tracking-widest text-sm mb-4 block">Redes</span>
            <div className="flex gap-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="bg-white/10 p-4 rounded-full hover:bg-white hover:text-black transition-all duration-300"
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
         </div>
      </div>

      {/* Main Title (Big Reveal) */}
      <div className="text-center">
         <h1 className="text-[12vw] font-bold leading-none tracking-tighter opacity-20 select-none">
            NAHUEL
         </h1>
      </div>

      {/* Bottom Legal */}
      <div className="flex justify-between items-end border-t border-white/10 pt-8">
         <div className="flex gap-8 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Política de Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos de Uso</a>
         </div>
         <p className="text-sm text-gray-500">
           © {new Date().getFullYear()} Nahuel Filmmaker.
         </p>
      </div>
    </footer>
  );
};

export default Footer;

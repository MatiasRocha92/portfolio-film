import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const navLinks = [
  { label: 'Work', href: '#works' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled
            ? 'bg-background/80 backdrop-blur-md border-b border-border/30'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo */}
            <a
              href="#"
              className="font-display text-2xl md:text-3xl tracking-wider text-foreground hover:opacity-70 transition-opacity duration-500"
            >
              LUMIÈRE
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-12">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-500 line-reveal pb-1"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-foreground hover:bg-transparent"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-background"
          >
            <div className="flex flex-col h-full px-6 py-8">
              <div className="flex justify-between items-center relative z-10">
                <span className="font-display text-2xl tracking-wider text-foreground">
                  LUMIÈRE
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground hover:bg-transparent relative z-20"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <div className="flex flex-col justify-center flex-1 gap-8">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.label}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.6 }}
                    onClick={() => scrollToSection(link.href)}
                    className="font-display text-5xl text-left text-foreground hover:text-muted-foreground transition-colors duration-300"
                  >
                    {link.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;

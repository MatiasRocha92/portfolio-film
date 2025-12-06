import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUp, Instagram, Twitter, Linkedin, Dribbble } from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Dribbble, href: '#', label: 'Dribbble' },
];

const footerLinks = [
  { label: 'Work', href: '#works' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
  { label: 'Privacy', href: '#' },
];

export const Footer = () => {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: '-50px' });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-background border-t border-border/30"
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-32">
        {/* Top Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-20"
        >
          {/* Logo & Tagline */}
          <div>
            <h3 className="font-display text-5xl md:text-7xl text-foreground tracking-wider mb-6">
              LUMIÈRE
            </h3>
            <p className="text-editorial max-w-md">
              A digital video production studio crafting bold, modern visuals
              that move.
            </p>
          </div>

          {/* Back to Top */}
          <Button
            variant="outline"
            size="lg"
            onClick={scrollToTop}
            className="group border-foreground/20 hover:border-foreground hover:bg-transparent text-foreground px-8 py-6 text-sm tracking-widest uppercase transition-all duration-500"
          >
            Back to Top
            <ArrowUp className="ml-2 w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
          </Button>
        </motion.div>

        <Separator className="bg-border/30 mb-12" />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8"
        >
          {/* Links */}
          <nav className="flex flex-wrap gap-8">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-500"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="text-muted-foreground hover:text-foreground transition-colors duration-500 hover-lift"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 text-xs text-muted-foreground/60 tracking-wider"
        >
          © {new Date().getFullYear()} Lumière Studio. All rights reserved.
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;

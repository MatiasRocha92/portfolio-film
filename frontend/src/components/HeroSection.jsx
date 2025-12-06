import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export const HeroSection = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax effects - different speeds for different elements
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const scrollIndicatorY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
  // Opacity fades
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const scrollToWorks = () => {
    const worksSection = document.querySelector('#works');
    if (worksSection) {
      worksSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative h-[150vh]"
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Video Background - Fixed, no zoom */}
        <div className="absolute inset-0 w-full h-full">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="https://customer-assets.emergentagent.com/job_editlux/artifacts/zn2gz1ch_playa-miami.mp4"
            muted
            playsInline
            autoPlay
            loop
            preload="auto"
          />
          {/* Subtle overlay for text readability */}
          <div className="absolute inset-0 bg-background/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-12 lg:px-20">
          {/* Main Title - Giant with blend mode */}
          <motion.div
            style={{ y: titleY, opacity: titleOpacity }}
            className="overflow-visible"
          >
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="font-display text-[20vw] md:text-[18vw] lg:text-[15vw] leading-[0.85] tracking-[-0.02em] uppercase text-foreground mix-blend-difference"
            >
              LUMIÈRE
            </motion.h1>
          </motion.div>

          {/* Subtitle with parallax */}
          <motion.div 
            style={{ y: subtitleY, opacity: subtitleOpacity }}
            className="mt-8 md:mt-12 max-w-xl"
          >
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
              className="text-lg md:text-xl lg:text-2xl font-light tracking-wide text-foreground/90"
            >
              A DIGITAL VIDEO
              <br />
              PRODUCTION STUDIO.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1 }}
              className="mt-6 text-lg md:text-xl lg:text-2xl font-light tracking-wide text-foreground/90"
            >
              BOLD,
              <br />
              MODERN VISUALS.
            </motion.p>
          </motion.div>

          {/* Scroll Indicator with parallax */}
          <motion.button
            style={{ y: scrollIndicatorY, opacity: scrollIndicatorOpacity }}
            onClick={scrollToWorks}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-foreground/60 hover:text-foreground transition-colors duration-500 group"
          >
            <span className="text-xs tracking-[0.3em] uppercase">Scroll</span>
            <ChevronDown className="w-5 h-5 scroll-indicator" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

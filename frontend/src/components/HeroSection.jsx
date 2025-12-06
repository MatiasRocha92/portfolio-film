import React, { useRef, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export const HeroSection = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Scroll-driven video control
  const updateVideoTime = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    
    const scrollTop = window.scrollY;
    const docHeight = containerRef.current?.offsetHeight || window.innerHeight;
    const scrollPercent = Math.min(scrollTop / (docHeight - window.innerHeight), 1);
    
    // Map scroll to video time (use first 8 seconds of video)
    const targetTime = scrollPercent * Math.min(video.duration, 8);
    video.currentTime = targetTime;
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Pause video - only scroll controls it
    video.pause();
    
    // Initial position
    video.currentTime = 0;

    const handleScroll = () => {
      requestAnimationFrame(updateVideoTime);
    };

    const handleVideoLoad = () => {
      updateVideoTime();
    };

    video.addEventListener('loadedmetadata', handleVideoLoad);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      video.removeEventListener('loadedmetadata', handleVideoLoad);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [updateVideoTime]);

  // Parallax effects for different layers
  const titleY = useTransform(scrollYProgress, [0, 0.5], [0, -400]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 1, 0]);
  const titleScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  
  const subtitleY = useTransform(scrollYProgress, [0, 0.5], [0, -200]);
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.4], [1, 1, 0]);
  
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  
  // Second layer text - appears as you scroll
  const layer2Opacity = useTransform(scrollYProgress, [0.2, 0.35, 0.6, 0.75], [0, 1, 1, 0]);
  const layer2Y = useTransform(scrollYProgress, [0.2, 0.75], [100, -100]);
  const layer2Scale = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.75], [0.9, 1, 1, 0.9]);

  const scrollToWorks = () => {
    const worksSection = document.querySelector('#works');
    if (worksSection) {
      worksSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative h-[300vh]"
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Video Background - Scroll controlled */}
        <div className="absolute inset-0 w-full h-full">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            src="https://customer-assets.emergentagent.com/job_editlux/artifacts/zn2gz1ch_playa-miami.mp4"
            muted
            playsInline
            preload="auto"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/60" />
        </div>

        {/* LAYER 1: Main Title - Visible at start */}
        <motion.div
          style={{ 
            y: titleY, 
            opacity: titleOpacity,
            scale: titleScale
          }}
          className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 lg:px-20 z-10"
        >
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="font-display text-[18vw] md:text-[15vw] lg:text-[12vw] leading-[0.85] tracking-[-0.02em] uppercase text-foreground mix-blend-difference"
          >
            LUMIÈRE
          </motion.h1>
          
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
          </motion.div>
        </motion.div>

        {/* LAYER 2: Secondary text - Appears on scroll */}
        <motion.div
          style={{ 
            y: layer2Y, 
            opacity: layer2Opacity,
            scale: layer2Scale
          }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10"
        >
          <h2 className="font-display text-[10vw] md:text-[8vw] lg:text-[6vw] leading-[0.9] uppercase text-foreground mix-blend-difference">
            BOLD,
            <br />
            MODERN
            <br />
            VISUALS.
          </h2>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          style={{ opacity: scrollIndicatorOpacity }}
          onClick={scrollToWorks}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-foreground/60 hover:text-foreground transition-colors duration-500 group z-20"
        >
          <span className="text-xs tracking-[0.3em] uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5 scroll-indicator" />
        </motion.button>

        {/* Progress indicator */}
        <motion.div 
          className="absolute bottom-0 left-0 h-1 bg-foreground/30 z-20"
          style={{ 
            width: useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
          }}
        />
      </div>
    </section>
  );
};

export default HeroSection;

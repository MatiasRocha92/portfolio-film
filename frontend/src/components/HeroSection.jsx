import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export const HeroSection = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Zoom effect based on scroll
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  // Video time control based on scroll
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleScroll = () => {
      if (video.duration) {
        const scrollPercent = window.scrollY / (window.innerHeight * 0.8);
        const clampedPercent = Math.min(Math.max(scrollPercent, 0), 1);
        const targetTime = clampedPercent * Math.min(video.duration, 10);
        video.currentTime = targetTime;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVideoLoaded]);

  const scrollToWorks = () => {
    const worksSection = document.querySelector('#works');
    if (worksSection) {
      worksSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative h-[200vh]"
    >
      {/* Sticky Video Container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Video Background */}
        <motion.div
          style={{ scale }}
          className="absolute inset-0 w-full h-full"
        >
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            src="https://videos.pexels.com/video-files/3015488/3015488-uhd_2560_1440_24fps.mp4"
            muted
            playsInline
            preload="auto"
            onLoadedData={() => setIsVideoLoaded(true)}
          />
          {/* Video Overlay for contrast */}
          <div className="absolute inset-0 video-overlay" />
        </motion.div>

        {/* Hero Content */}
        <motion.div
          style={{ y: textY, opacity }}
          className="relative z-10 flex flex-col justify-center h-full px-6 md:px-12 lg:px-20 max-w-[1800px] mx-auto"
        >
          {/* Main Title */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="title-hero text-foreground"
            >
              LUMIÈRE
            </motion.h1>
          </div>

          {/* Subtitle */}
          <div className="mt-8 md:mt-12 max-w-xl">
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
          </div>

          {/* Scroll Indicator */}
          <motion.button
            onClick={scrollToWorks}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-foreground/60 hover:text-foreground transition-colors duration-500 group"
          >
            <span className="text-xs tracking-[0.3em] uppercase">Scroll</span>
            <ChevronDown className="w-5 h-5 scroll-indicator" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

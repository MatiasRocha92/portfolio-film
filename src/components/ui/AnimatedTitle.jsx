import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export const AnimatedTitle = ({ text, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  // Split text into words, then characters
  const words = text.split(" ");
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      rotateZ: 0,
      transition: {
        type: "spring",
        damping: 30, // Less bounce for a "premium" feel
        stiffness: 200,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] // Custom refined ease needed if not spring
      },
    },
    hidden: {
      opacity: 0,
      y: "110%", // Starting below
      rotateZ: 5, // Slight rotation for style
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 200,
      },
    },
  };

  return (
    <h2 
      ref={ref} 
      className={`${className} flex flex-wrap`} // Removed overflow-hidden from parent
      style={{ lineHeight: 1 }}
      aria-label={text}
    >
      <motion.span
        variants={container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="flex flex-wrap"
      >
        {words.map((word, wordIndex) => (
          // Added py-2 (vertical padding) and pr-2.5 (right padding) to expand clip area
          // Added -my-2 to compensate for vertical padding affecting layout flow
          <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.25em] overflow-hidden py-2 -my-2 pr-2.5">
             {word.split("").map((char, charIndex) => (
               <motion.span
                 key={charIndex}
                 variants={child}
                 className="inline-block origin-bottom-left"
               >
                 {char}
               </motion.span>
             ))}
          </span>
        ))}
      </motion.span>
    </h2>
  );
};

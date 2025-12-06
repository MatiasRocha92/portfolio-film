import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Separator } from './ui/separator';

export const MissionSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-background py-32 md:py-48 lg:py-64"
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32"
        >
          {/* Mission */}
          <motion.div variants={itemVariants}>
            <span className="text-label mb-6 block">Mission</span>
            <p className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed text-foreground">
              We craft digital experiences that balance precision and emotion —
              blending design, code, and movement into timeless, meaningful
              systems.
            </p>
          </motion.div>

          {/* Goal */}
          <motion.div variants={itemVariants}>
            <span className="text-label mb-6 block">Goal</span>
            <p className="text-editorial">
              Our goal is to craft digital experiences that stand at the
              intersection of design, technology, and emotion. We believe that
              every interface has the power to express identity — not just
              through visuals, but through rhythm, movement, and the way it makes
              people feel.
            </p>
            <p className="text-editorial mt-6">
              We approach each project with the same intention: to strip away
              what&apos;s unnecessary, to focus on what&apos;s essential, and to build with
              clarity and precision.
            </p>
          </motion.div>
        </motion.div>

        {/* Decorative Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="origin-left mt-32 md:mt-48"
        >
          <Separator className="bg-border/50" />
        </motion.div>
      </div>
    </section>
  );
};

export default MissionSection;

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Separator } from './ui/separator';
import { AnimatedTitle } from './ui/AnimatedTitle';

const founders = [
  {
    name: 'Valérian Kinyock',
    role: 'Creative Developer',
    quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
  },
  {
    name: 'Sophie Nguyen',
    role: 'Producer & Partner',
    quote: 'Sed do eiusmod tempor incididunt ut labore et dolore.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80',
  },
  {
    name: 'Nina Lens',
    role: 'Editorial Designer',
    quote: 'Ut enim ad minim veniam, quis nostrud exercitation.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80',
  },
];

const FounderCard = ({ founder, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.15,
      }}
      className="group"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden mb-6">
        <motion.img
          src={founder.image}
          alt={founder.name}
          className="w-full h-full object-cover img-cinematic"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Info */}
      <h4 className="font-display text-xl md:text-2xl text-foreground tracking-wide">
        {founder.name}
      </h4>
      <p className="text-label mt-2">{founder.role}</p>
      <p className="text-editorial mt-4 text-sm italic">
        &quot;{founder.quote}&quot;
      </p>
    </motion.div>
  );
};

export const AboutSection = () => {
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
      id="about"
      ref={sectionRef}
      className="relative bg-background py-32 md:py-48"
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-10 lg:px-22">
        {/* Section Title */}
        <div className="mb-24 md:mb-32">
          <AnimatedTitle 
            text="ESTUDIO" 
            className="title-section text-foreground text-[12vw] leading-[0.85] tracking-tighter uppercase"
          />
        </div>

        {/* Intro Text */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 mb-24 md:mb-32"
        >
          <motion.div variants={itemVariants}>
            <p className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed text-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <span className="text-label mb-6 block">Approach</span>
            <p className="text-editorial">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
              dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p className="text-editorial mt-6">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae.
            </p>
          </motion.div>
        </motion.div>

        {/* Separator */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="origin-left mb-24 md:mb-32"
        >
          <Separator className="bg-border/50" />
        </motion.div>

        {/* Founders Label */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-label mb-12 block"
        >
          The Crew
        </motion.span>

        {/* Founders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {founders.map((founder, index) => (
            <FounderCard key={founder.name} founder={founder} index={index} />
          ))}
        </div>

        {/* Collaboration Section */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-32 md:mt-48 max-w-3xl"
        >
          <span className="text-label mb-6 block">Collaboration</span>
          <p className="text-xl md:text-2xl font-light leading-relaxed text-foreground">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
            praesentium voluptatum deleniti atque corrupti quos dolores et quas
            molestias excepturi sint occaecati cupiditate non provident.
          </p>
          <p className="text-editorial mt-6">
            Similique sunt in culpa qui officia deserunt mollitia animi, id est
            laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
            distinctio. Nam libero tempore, cum soluta nobis est eligendi optio.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;

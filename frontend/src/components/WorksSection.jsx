import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Button } from './ui/button';

const works = [
  {
    id: 1,
    title: 'Overmono',
    category: 'Motion Design',
    subcategory: 'Art Direction',
    description:
      "Overmono is a visual experiment inspired by the duo's raw, electronic energy. The project explores rhythm, distortion, and motion through a minimal, industrial-driven aesthetic.",
    image: 'https://images.unsplash.com/photo-1709038391624-60f072505f5e?w=1200&q=80',
  },
  {
    id: 2,
    title: 'Likorn',
    category: 'Motion Design',
    subcategory: 'Art Direction',
    description:
      'Likorn is a digital study exploring organic motion and sculptural forms. The project blends fluid simulations, subtle lighting, and minimal typography.',
    image: 'https://images.unsplash.com/photo-1619344755866-f5c7ca79b2f6?w=1200&q=80',
  },
  {
    id: 3,
    title: 'Solo Model',
    category: 'Motion Design',
    subcategory: 'Art Direction',
    description:
      'Solo Model is a stripped-down visual study focused on presence, light, and form. The project reduces everything to its essentials — movement, contrast, and space.',
    image: 'https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=1200&q=80',
  },
  {
    id: 4,
    title: 'Ethereal Skiing',
    category: 'Motion Design',
    subcategory: 'Art Direction',
    description:
      'Ethereal Skiing is a visual experiment capturing the weightlessness and speed of movement on snow. The project blends soft gradients and atmospheric particles.',
    image: 'https://images.unsplash.com/photo-1615458509636-856366d3396e?w=1200&q=80',
  },
];

const WorkCard = ({ work, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-100px' });
  const isEven = index % 2 === 0;

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`group grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
        !isEven ? 'lg:direction-rtl' : ''
      }`}
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden aspect-[4/3] ${!isEven ? 'lg:order-2' : ''}`}
      >
        <motion.img
          src={work.image}
          alt={work.title}
          className="w-full h-full object-cover img-cinematic"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-background/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 rounded-full border border-foreground/50 flex items-center justify-center"
          >
            <ArrowUpRight className="w-6 h-6 text-foreground" />
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className={`${!isEven ? 'lg:order-1 lg:text-right' : ''}`}>
        <div className={`flex gap-4 mb-4 ${!isEven ? 'lg:justify-end' : ''}`}>
          <span className="text-label">{work.category}</span>
          <span className="text-label text-muted-foreground/50">•</span>
          <span className="text-label">{work.subcategory}</span>
        </div>
        <h3 className="title-work text-foreground mb-6 group-hover:text-muted-foreground transition-colors duration-500">
          {work.title}
        </h3>
        <p className="text-editorial max-w-lg">{work.description}</p>
      </div>
    </motion.article>
  );
};

export const WorksSection = () => {
  const sectionRef = useRef(null);
  const titleInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="works"
      ref={sectionRef}
      className="relative bg-background py-32 md:py-48"
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24 md:mb-32"
        >
          <h2 className="title-section text-foreground">Selected Works</h2>
        </motion.div>

        {/* Works Grid */}
        <div className="space-y-24 md:space-y-32 lg:space-y-48">
          {works.map((work, index) => (
            <WorkCard key={work.id} work={work} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-24 md:mt-32 text-center"
        >
          <Button
            variant="outline"
            size="lg"
            className="group border-foreground/20 hover:border-foreground hover:bg-transparent text-foreground px-12 py-6 text-sm tracking-widest uppercase transition-all duration-500"
          >
            View All Work
            <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default WorksSection;

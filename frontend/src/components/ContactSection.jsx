import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Mail, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'sonner';

export const ContactSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      toast.success('Thank you for your interest. We will be in touch soon.');
      setEmail('');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
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
      id="contact"
      ref={sectionRef}
      className="relative bg-background py-32 md:py-48"
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32"
        >
          {/* Left Column */}
          <div>
            <motion.h2
              variants={itemVariants}
              className="title-section text-foreground mb-12"
            >
              Let's Work Together
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl font-light leading-relaxed text-foreground max-w-lg"
            >
              Have a project in mind? We'd love to hear about it. Get in touch
              and let's create something extraordinary together.
            </motion.p>

            {/* Contact Info */}
            <motion.div variants={itemVariants} className="mt-16 space-y-6">
              <a
                href="mailto:hello@lumiere.studio"
                className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors duration-500 group"
              >
                <Mail className="w-5 h-5" />
                <span className="text-lg tracking-wide">hello@lumiere.studio</span>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>

              <div className="flex items-center gap-4 text-muted-foreground">
                <MapPin className="w-5 h-5" />
                <span className="text-lg tracking-wide">Paris, France</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Simple Form */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col justify-center"
          >
            <span className="text-label mb-8">Start a Project</span>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="text-sm text-muted-foreground mb-3 block">
                  Your Email
                </label>
                <Input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent border-0 border-b border-border/50 rounded-none px-0 py-4 text-lg text-foreground placeholder:text-muted-foreground/50 focus:border-foreground focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors duration-500"
                  required
                />
              </div>

              <Button
                type="submit"
                variant="outline"
                size="lg"
                className="group border-foreground/20 hover:border-foreground hover:bg-foreground hover:text-background text-foreground px-12 py-6 text-sm tracking-widest uppercase transition-all duration-500 w-full md:w-auto"
              >
                Get in Touch
                <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </Button>
            </form>

            {/* Availability */}
            <div className="mt-16 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-muted-foreground tracking-wide">
                Available for new projects — Q1 2025
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;

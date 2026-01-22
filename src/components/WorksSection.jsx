import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Volume2, VolumeX, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { AnimatedTitle } from './ui/AnimatedTitle';
import axios from 'axios';

gsap.registerPlugin(ScrollTrigger);

const defaultWorks = [
  {
    id: 1,
    title: 'Overmono',
    category: 'Motion Design',
    subcategory: 'Dirección de Arte',
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    videoUrl: 'https://player.vimeo.com/video/1068632533?h=65cbc639f4', 
  },
  {
    id: 2,
    title: 'Likorn',
    category: 'Motion Design',
    subcategory: 'Dirección de Arte',
    description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    videoUrl: 'https://player.vimeo.com/video/1039936378?h=b4c1a67576',
  },
  {
    id: 3,
    title: 'Solo Model',
    category: 'Motion Design',
    subcategory: 'Dirección de Arte',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    videoUrl: 'https://player.vimeo.com/video/1068632533?h=65cbc639f4',
  },
  {
    id: 4,
    title: 'Ethereal Skiing',
    category: 'Motion Design',
    subcategory: 'Dirección de Arte',
    description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.',
    videoUrl: 'https://player.vimeo.com/video/1068632533?h=65cbc639f4',
  },
];

const VideoPreview = ({ src, title, parallaxContainerRef }) => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useLayoutEffect(() => {
    // Only animate if element exists
    if (!videoRef.current || !parallaxContainerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(videoRef.current, 
         { yPercent: -15, scale: 1.1 },
         { 
           yPercent: 15, scale: 1, ease: "none",
           scrollTrigger: { trigger: parallaxContainerRef.current, start: "top bottom", end: "bottom top", scrub: 0 }
         }
       );
    });
    return () => ctx.revert();
  }, [parallaxContainerRef]);

  const toggleMute = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMuted(!isMuted);
    
    if (videoRef.current) {
      // Si vamos a activar el sonido, ponemos volumen bajo (35%)
      if (isMuted) videoRef.current.volume = 0.35;
      
      videoRef.current.muted = !isMuted;
    }
  };

  return (
    <div className="w-full h-[120%] -mt-[10%] relative">
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        autoPlay loop playsInline muted={isMuted}
      />
      <MuteButton isMuted={isMuted} toggleMute={toggleMute} />
    </div>
  );
};

// Componente para VIMEO
const VimeoPreview = ({ src, title, parallaxContainerRef }) => {
  const iframeRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  // Limpiamos la URL y añadimos params para control total
  const vimeoSrc = src.includes('?') 
    ? `${src}&api=1&background=1&autoplay=1&loop=1&muted=1` 
    : `${src}?api=1&background=1&autoplay=1&loop=1&muted=1`;

  useLayoutEffect(() => {
    if (!iframeRef.current || !parallaxContainerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(iframeRef.current, 
         { yPercent: -15, scale: 1.3 }, 
         { 
           yPercent: 15, scale: 1.1, ease: "none",
           scrollTrigger: { trigger: parallaxContainerRef.current, start: "top bottom", end: "bottom top", scrub: 0 }
         }
       );
    });
    return () => ctx.revert();
  }, [parallaxContainerRef]);

  const toggleMute = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (iframeRef.current) {
      // Vimeo API via postMessage
      const action = 'setVolume';
      const value = isMuted ? 0.35 : 0; 
      
      const message = { method: action, value: value };
      iframeRef.current.contentWindow.postMessage(JSON.stringify(message), '*');
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="w-full h-[120%] -mt-[10%] relative bg-black">
      <iframe
        ref={iframeRef}
        src={vimeoSrc}
        className="w-full h-full object-cover pointer-events-none" 
        title={title}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
      />
      <MuteButton isMuted={isMuted} toggleMute={toggleMute} />
    </div>
  );
};

const MuteButton = ({ isMuted, toggleMute }) => (
  <button 
    onClick={toggleMute}
    className="absolute bottom-8 right-8 z-30 p-3 rounded-full bg-black/20 backdrop-blur-md text-white/70 hover:text-white hover:bg-black/40 transition-all duration-300 group-hover:opacity-100 md:opacity-0"
    aria-label={isMuted ? "Unmute video" : "Mute video"}
  >
    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
  </button>
);


const WorkCard = ({ work, index }) => {
  const isEven = index % 2 === 0;
  const containerRef = useRef(null);
  const isVimeo = work.videoUrl.includes('vimeo');

  return (
    <article className={`group grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${!isEven ? 'lg:direction-rtl' : ''}`}>
      {/* Video Container */}
      <div 
        ref={containerRef}
        className={`relative overflow-hidden aspect-[4/3] cursor-pointer ${!isEven ? 'lg:order-2' : ''} rounded-sm`}
      >
        {isVimeo ? (
          <VimeoPreview 
            src={work.videoUrl} 
            title={work.title} 
            parallaxContainerRef={containerRef} 
          />
        ) : (
          <VideoPreview 
            src={work.videoUrl} 
            title={work.title} 
            parallaxContainerRef={containerRef} 
          />
        )}
      </div>

      {/* Content */}
      <div className={`${!isEven ? 'lg:order-1 lg:text-right' : ''}`}>
        <div className={`flex gap-4 mb-4 ${!isEven ? 'lg:justify-end' : ''}`}>
          <span className="text-label">{work.category}</span>
          <span className="text-label text-muted-foreground/50">•</span>
          <span className="text-label">{work.subcategory}</span>
        </div>
        
        <div className="overflow-hidden mb-6">
           <h3 className="title-work text-foreground text-[8vw] leading-[0.85] tracking-tighter uppercase group-hover:text-muted-foreground transition-colors duration-500 reveal-item">
             {work.title}
           </h3>
        </div>
        
        <div className="overflow-hidden">
           <p className="text-editorial max-w-lg reveal-item inline-block">
             {work.description}
           </p>
        </div>
      </div>
    </article>
  );
};

export const WorksSection = () => {
  const sectionRef = useRef(null);
  const [works, setWorks] = useState(defaultWorks);
  const [loading, setLoading] = useState(true);

  // Fetch works from API
  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        
        // Only fetch if API URL is configured
        if (!apiUrl) {
          setLoading(false);
          return;
        }
        
        const response = await axios.get(`${apiUrl}/api/projects`);
        if (response.data && response.data.length > 0) {
          setWorks(response.data);
        }
      } catch (error) {
        console.log('Backend not available, using default works.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchWorks();
  }, []);

  useLayoutEffect(() => {
    if (loading) return; // Wait for loading to finish

    const ctx = gsap.context(() => {
      // Reveal anims for texts inside works
      const items = gsap.utils.toArray('.reveal-item');
      items.forEach(item => {
         gsap.fromTo(item,
           { y: "100%", skewY: 5 },
           { 
             y: "0%", 
             skewY: 0,
             duration: 1.2,
             ease: "power3.out",
             scrollTrigger: {
               trigger: item,
               start: "top 95%"
             }
           }
         );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [loading, works]);

  if (loading) {
     return (
        <section className="h-[50vh] flex items-center justify-center bg-background">
           <Loader2 className="w-10 h-10 animate-spin text-foreground" />
        </section>
     );
  }

  return (
    <section
      id="works"
      ref={sectionRef}
      className="relative bg-background py-32 md:py-48"
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Title */}
        <div className="mb-24 md:mb-32">
          <AnimatedTitle 
            text="Selected Works" 
            className="title-section text-foreground text-[12vw] leading-[2] tracking-tighter uppercase"
          />
        </div>

        {/* Works Grid */}
        <div className="space-y-24 md:space-y-32 lg:space-y-48">
          {works.map((work, index) => (
            <WorkCard key={work.id} work={work} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-24 md:mt-32 text-center">
          <Button
            variant="outline"
            size="lg"
            className="group border-foreground/20 hover:border-foreground hover:bg-transparent text-foreground px-12 py-6 text-sm tracking-widest uppercase transition-all duration-500"
          >
            View All Work
            <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WorksSection;

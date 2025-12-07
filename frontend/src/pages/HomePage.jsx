import React from 'react';
import Navigation from '../components/Navigation';
import MainHero from '../components/MainHero';
import MissionSection from '../components/MissionSection';
import WorksSection from '../components/WorksSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <main className="bg-background min-h-screen">
      <Navigation />
      <MainHero />
      <MissionSection />
      <WorksSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  );
}

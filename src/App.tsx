import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TelemetryTicker } from './components/TelemetryTicker';
import { SystemIdentity } from './components/SystemIdentity';
import { TechnicalStack } from './components/TechnicalStack';
import { EngineeredSystems } from './components/EngineeredSystems';
import { TelemetryMetrics } from './components/TelemetryMetrics';
import { ContactSection } from './components/ContactSection';
import { Navigation } from './components/Navigation';

export default function App() {
  const [activeSection, setActiveSection] = useState('overview');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -70; // offset for fixed header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Observe scroll position to update active navigation tab
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['contact', 'metrics', 'projects', 'stack', 'overview'];
      const scrollPos = window.scrollY + 160;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionId);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0e1321] text-[#dee2f6] flex flex-col selection:bg-[#22d3ee] selection:text-[#00363e]">
      {/* Fixed Cybernetic Header */}
      <Header onNavigate={scrollToSection} activeSection={activeSection} />

      {/* Main Terminal Document Container */}
      <main className="flex-1 w-full max-w-3xl mx-auto pt-16 pb-24 border-x border-[#3c494c]/20 bg-[#0e1321] shadow-[0_0_60px_rgba(0,0,0,0.8)]">
        {/* Hero Section with Cybernetic Server Banner */}
        <HeroSection onNavigate={scrollToSection} />

        {/* Live Telemetry Ticker */}
        <TelemetryTicker />

        {/* System Identity & Academic Foundation Terminal Card */}
        <SystemIdentity />

        {/* Technical Stack 5-Layer Matrix */}
        <TechnicalStack />

        {/* Engineered Systems Project Cards with Interactive Modals */}
        <EngineeredSystems />

        {/* Telemetry & Performance Metrics Dashboard */}
        <TelemetryMetrics />

        {/* Contact & Recruiter Opportunity Transmission Gateway */}
        <ContactSection />
      </main>

      {/* Fixed Bottom Tactical Navigation Bar */}
      <Navigation activeSection={activeSection} onNavigate={scrollToSection} />
    </div>
  );
}

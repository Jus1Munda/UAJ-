/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Capabilities } from './components/Capabilities';
import { Approach } from './components/Approach';
import { SelectedWork } from './components/SelectedWork';
import { InteractiveTester } from './components/InteractiveTester';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { AdminDashboard } from './components/AdminDashboard';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Website Design & Development');

  const handleOpenModal = (serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
    }
    setModalOpen(true);
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#05040a] text-slate-100 flex flex-col selection:bg-[#00f2fe]/30 selection:text-white">
      {/* Sticky Navigation Bar */}
      <Navbar
        onContactClick={() => handleOpenModal()}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Main Studio Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onExploreServices={() => handleScrollTo('services')}
          onDiscoverApproach={() => handleScrollTo('approach')}
        />

        {/* 2. Capabilities & Services Preview */}
        <Capabilities onSelectService={(service) => handleOpenModal(service)} />

        {/* 3. Studio Approach (Discover, Design, Develop, Deliver) */}
        <Approach onOpenContact={() => handleOpenModal()} />

        {/* 4. Selected Work / Projects */}
        <SelectedWork
          onInquireProject={(projectTitle) =>
            handleOpenModal(`Custom Build for ${projectTitle}`)
          }
        />

        {/* 5. Interactive Showcase / Studio Playground */}
        <InteractiveTester />
      </main>

      {/* Footer */}
      <Footer
        onContactClick={() => handleOpenModal()}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Project Inquiry Modal */}
      <ProjectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialService={selectedService}
      />

      {/* Separate Admin Dashboard for managing project inquiries */}
      {adminOpen && <AdminDashboard onClose={() => setAdminOpen(false)} />}
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface VaultService {
  id: string;
  name: string;
  category: VaultCategoryKey;
  description: string;
  priceDisplay: string; // e.g. "Estimated range: ₹5,000–₹12,000" or empty for academic
  isAcademic?: boolean;
  unit?: string; // e.g. "per image", "each"
  badge?: string;
  isLandingPage?: boolean;
  scopeNotes?: string;
}

export interface PopularPackage {
  id: string;
  name: string;
  category: VaultCategoryKey;
  introPrice: string; // e.g. "₹7,999"
  description: string;
  deliverables: string[];
  popular?: boolean;
}

export type VaultCategoryKey =
  | 'all'
  | 'websites'
  | 'ui-ux'
  | 'presentation'
  | 'branding'
  | 'creator'
  | 'interactive'
  | 'academic'
  | 'packages';

export interface VaultCategoryMeta {
  key: VaultCategoryKey;
  label: string;
  shortLabel: string;
  description: string;
  countBadge?: string;
  isAcademic?: boolean;
}

export const VAULT_CATEGORIES: VaultCategoryMeta[] = [
  {
    key: 'websites',
    label: 'Website Design & Development',
    shortLabel: 'Websites',
    description: 'Custom, high-performance websites, launch pages, and digital stores built with modern React.'
  },
  {
    key: 'ui-ux',
    label: 'UI/UX Design',
    shortLabel: 'UI/UX',
    description: 'Dark-premium interface designs, component systems, and Figma prototypes for web & mobile.'
  },
  {
    key: 'presentation',
    label: 'Presentation & Document Design',
    shortLabel: 'Presentations',
    description: 'Executive pitch decks, company profiles, proposal decks, and data-driven visual presentations.'
  },
  {
    key: 'branding',
    label: 'Creative Design & Branding',
    shortLabel: 'Branding',
    description: 'Custom logos, brand identity systems, social media kits, and vector visual assets.'
  },
  {
    key: 'creator',
    label: 'YouTube & Creator Services',
    shortLabel: 'Creator',
    description: 'High-CTR YouTube thumbnails, channel graphics, stream overlays, and creator brand kits.'
  },
  {
    key: 'interactive',
    label: 'Practical Interactive Features & Integrations',
    shortLabel: 'Interactive',
    description: 'Smooth scroll animations, custom quote calculators, lead capture workflows, and API integrations.'
  },
  {
    key: 'academic',
    label: 'Academic & College Services',
    shortLabel: 'Academic',
    description: 'Student support for college presentations, project formatting, and printing with local delivery.',
    isAcademic: true
  },
  {
    key: 'packages',
    label: 'Popular Packages',
    shortLabel: 'Packages',
    description: 'Curated starter bundles with indicative introductory pricing for fast turnaround projects.'
  }
];

export const VAULT_SERVICES: VaultService[] = [
  // =========================================================================
  // A. Website Design & Development (17 curated services)
  // =========================================================================
  {
    id: 'web-personal-portfolio',
    name: 'Personal Portfolio Website',
    category: 'websites',
    description: 'Sleek personal showcase for professionals, creators, or leaders featuring bio, projects, and contact.',
    priceDisplay: 'Estimated range: ₹5,000–₹12,000'
  },
  {
    id: 'web-freelancer-portfolio',
    name: 'Freelancer Portfolio Website',
    category: 'websites',
    description: 'High-impact portfolio tailored to showcase case studies, client testimonials, and capture inquiries.',
    priceDisplay: 'Estimated range: ₹4,000–₹10,000'
  },
  {
    id: 'web-small-business',
    name: 'Small Business Website',
    category: 'websites',
    description: 'Fast, responsive 3–5 page website showcasing services, location, customer reviews, and inquiry channels.',
    priceDisplay: 'Estimated range: ₹6,000–₹15,000'
  },
  {
    id: 'web-company-business',
    name: 'Business / Company Website',
    category: 'websites',
    description: 'Multi-page corporate website with dedicated services, team overview, credibility markers, and contact forms.',
    priceDisplay: 'Estimated range: ₹8,000–₹15,000'
  },
  {
    id: 'web-startup',
    name: 'Startup Website',
    category: 'websites',
    description: 'High-velocity startup website designed to articulate value proposition, traction, and drive user signups.',
    priceDisplay: 'Estimated range: ₹8,000–₹18,000'
  },
  {
    id: 'web-agency',
    name: 'Agency Website',
    category: 'websites',
    description: 'Dynamic digital agency site highlighting case studies, service capabilities, process, and client lead generation.',
    priceDisplay: 'Estimated range: ₹10,000–₹22,000'
  },
  {
    id: 'web-local-service',
    name: 'Local Service Business Website',
    category: 'websites',
    description: 'Conversion-focused site for local service providers with click-to-call, service areas, and fast quote inquiries.',
    priceDisplay: 'Estimated range: ₹5,000–₹12,000'
  },
  {
    id: 'web-restaurant-cafe',
    name: 'Restaurant / Café Website',
    category: 'websites',
    description: 'Appetizing visual design with digital menu viewer, operating hours, location directions, and table reservations.',
    priceDisplay: 'Estimated range: ₹6,000–₹15,000'
  },
  {
    id: 'web-gym-fitness',
    name: 'Gym / Fitness Website',
    category: 'websites',
    description: 'Energetic fitness site with membership tiers, trainer spotlights, class schedules, and trial pass booking.',
    priceDisplay: 'Estimated range: ₹6,000–₹15,000'
  },
  {
    id: 'web-photography',
    name: 'Photography Website',
    category: 'websites',
    description: 'Minimalist, image-first portfolio with masonry galleries, full-screen image viewer, and booking inquiries.',
    priceDisplay: 'Estimated range: ₹5,000–₹12,000'
  },
  {
    id: 'web-gaming-esports',
    name: 'Gaming / Esports Website',
    category: 'websites',
    description: 'Dark-futuristic website with roster highlights, streaming schedules, match stats, and social links.',
    priceDisplay: 'Estimated range: ₹6,000–₹18,000'
  },
  {
    id: 'web-landing-page',
    name: 'Landing Page Design',
    category: 'websites',
    description: 'Single-page conversion funnel optimized for product launches, ad campaigns, and immediate lead capture.',
    priceDisplay: 'Estimated range: ₹3,000–₹8,000',
    isLandingPage: true
  },
  {
    id: 'web-coming-soon',
    name: 'Coming Soon Page',
    category: 'websites',
    description: 'Teaser page with countdown timer, brand teaser graphics, and email notification subscriber capture.',
    priceDisplay: 'Estimated range: ₹1,500–₹4,000',
    isLandingPage: true
  },
  {
    id: 'web-waitlist',
    name: 'Waitlist Website',
    category: 'websites',
    description: 'Viral pre-launch page with referral counters, social proof, and early-access email queue collection.',
    priceDisplay: 'Estimated range: ₹3,000–₹7,000',
    isLandingPage: true
  },
  {
    id: 'web-product-catalogue',
    name: 'Product Catalogue Website',
    category: 'websites',
    description: 'Showcase-driven product catalog with categories, specifications, high-res photos, and direct WhatsApp inquiry.',
    priceDisplay: 'Estimated range: ₹6,000–₹15,000'
  },
  {
    id: 'web-digital-store',
    name: 'Digital Products Store',
    category: 'websites',
    description: 'Lightweight digital store for ebooks, templates, presets, and design assets with instant checkout integration.',
    priceDisplay: 'Estimated range: ₹8,000–₹18,000'
  },
  {
    id: 'web-redesign-modernization',
    name: 'Website Redesign / Modernization',
    category: 'websites',
    description: 'Complete visual and technical overhaul of an outdated website into a fast, mobile-first, modern web experience.',
    priceDisplay: 'Estimated range: ₹5,000–₹20,000'
  },

  // =========================================================================
  // B. UI/UX Design (10 web + 3 mobile app UI/UX options)
  // =========================================================================
  {
    id: 'ui-landing-page',
    name: 'Landing Page UI Design',
    category: 'ui-ux',
    description: 'Pixel-perfect desktop and mobile layout design in Figma with conversion-centered hierarchy and visual hooks.',
    priceDisplay: 'Estimated range: ₹2,500–₹7,000'
  },
  {
    id: 'ui-portfolio',
    name: 'Portfolio UI Design',
    category: 'ui-ux',
    description: 'Bespoke portfolio interface layouts tailored to highlight creative work, case studies, and personal aesthetics.',
    priceDisplay: 'Estimated range: ₹3,000–₹8,000'
  },
  {
    id: 'ui-business-website',
    name: 'Business Website UI Design',
    category: 'ui-ux',
    description: 'Comprehensive UI design for multi-page corporate websites with consistent components and navigation systems.',
    priceDisplay: 'Estimated range: ₹5,000–₹15,000'
  },
  {
    id: 'ui-ecommerce',
    name: 'E-commerce UI Design',
    category: 'ui-ux',
    description: 'Modern storefront UI including product grid, PDP layout, cart drawer, and frictionless checkout mockups.',
    priceDisplay: 'Estimated range: ₹8,000–₹20,000'
  },
  {
    id: 'ui-dashboard',
    name: 'Dashboard UI Design',
    category: 'ui-ux',
    description: 'Data-dense web application interfaces with charts, metric cards, table views, and dark mode styling.',
    priceDisplay: 'Estimated range: ₹6,000–₹18,000'
  },
  {
    id: 'ui-mobile-first',
    name: 'Mobile-First Design',
    category: 'ui-ux',
    description: 'Strict smartphone-optimized UI architectures designed for thumb zones, compact viewports, and touch gestures.',
    priceDisplay: 'Estimated range: ₹3,000–₹10,000'
  },
  {
    id: 'ui-wireframing',
    name: 'Wireframing',
    category: 'ui-ux',
    description: 'Low-fidelity structural blueprints mapping information architecture, user journeys, and screen hierarchy.',
    priceDisplay: 'Estimated range: ₹3,000–₹10,000'
  },
  {
    id: 'ui-high-fidelity-mockups',
    name: 'High-Fidelity UI Mockups',
    category: 'ui-ux',
    description: 'Production-ready screen designs with rich typography, polished color palettes, shadows, and asset exports.',
    priceDisplay: 'Estimated range: ₹3,000–₹10,000'
  },
  {
    id: 'ui-interactive-figma',
    name: 'Interactive Figma Prototype',
    category: 'ui-ux',
    description: 'Clickable prototype with animated screen transitions, modal overlays, and realistic button states.',
    priceDisplay: 'Estimated range: ₹4,000–₹12,000'
  },
  {
    id: 'ui-website-redesign',
    name: 'Website UI/UX Redesign',
    category: 'ui-ux',
    description: 'UX audit, heuristic review, and modern interface redesign to reduce bounce rates and improve user delight.',
    priceDisplay: 'Estimated range: ₹5,000–₹20,000'
  },
  {
    id: 'ui-app-study-planner',
    name: 'Study Planner App UI/UX',
    category: 'ui-ux',
    description: 'Student-friendly mobile app interface design with timetable, assignment trackers, and revision progress views.',
    priceDisplay: 'Estimated range: ₹6,000–₹15,000',
    scopeNotes: 'UI/UX design only in Figma. Complete mobile app development is not included.'
  },
  {
    id: 'ui-app-expense-tracker',
    name: 'Expense Tracker App UI/UX',
    category: 'ui-ux',
    description: 'Clean personal finance UI screens with quick transaction entry, spending breakdown graphs, and monthly budgets.',
    priceDisplay: 'Estimated range: ₹6,000–₹15,000',
    scopeNotes: 'UI/UX design only in Figma. Complete mobile app development is not included.'
  },
  {
    id: 'ui-app-habit-tracker',
    name: 'Habit Tracker App UI/UX',
    category: 'ui-ux',
    description: 'Gamified streak tracking screens, check-in widgets, reminder popups, and weekly achievement dashboards.',
    priceDisplay: 'Estimated range: ₹5,000–₹12,000',
    scopeNotes: 'UI/UX design only in Figma. Complete mobile app development is not included.'
  },

  // =========================================================================
  // C. Presentation & Document Design (12 services)
  // =========================================================================
  {
    id: 'pres-college-practical',
    name: 'College Practical PPT',
    category: 'presentation',
    description: 'Structured slides detailing laboratory experiments, methodology, readings, diagrams, and conclusion.',
    priceDisplay: 'Estimated range: ₹500–₹1,500'
  },
  {
    id: 'pres-academic-project',
    name: 'Academic Project PPT',
    category: 'presentation',
    description: 'Comprehensive defense and review slides for final-year or semester engineering, science, and business projects.',
    priceDisplay: 'Estimated range: ₹800–₹2,500'
  },
  {
    id: 'pres-seminar',
    name: 'Seminar Presentation',
    category: 'presentation',
    description: 'Engaging, narrative-driven slide deck for technical conferences, departmental seminars, and guest lectures.',
    priceDisplay: 'Estimated range: ₹800–₹2,500'
  },
  {
    id: 'pres-business-proposal',
    name: 'Business Proposal Deck',
    category: 'presentation',
    description: 'Persuasive client presentation covering scope of work, value proposition, deliverables, and commercial terms.',
    priceDisplay: 'Estimated range: ₹1,500–₹4,000'
  },
  {
    id: 'pres-company-profile',
    name: 'Company Profile Presentation',
    category: 'presentation',
    description: 'Executive company overview highlighting founders, services, marquee clients, milestones, and strategic vision.',
    priceDisplay: 'Estimated range: ₹2,500–₹6,000'
  },
  {
    id: 'pres-startup-pitch',
    name: 'Startup Pitch Deck',
    category: 'presentation',
    description: 'Investor-ready 10–12 slide deck covering problem, market size, business model, traction, and funding ask.',
    priceDisplay: 'Estimated range: ₹3,000–₹8,000'
  },
  {
    id: 'pres-client-pitch',
    name: 'Client Pitch Deck',
    category: 'presentation',
    description: 'Custom pitch presentation crafted to win contracts, showcase competitive advantages, and close negotiations.',
    priceDisplay: 'Estimated range: ₹2,000–₹5,000'
  },
  {
    id: 'pres-product-demo',
    name: 'Product Demo Presentation',
    category: 'presentation',
    description: 'Step-by-step visual product tour showcasing key features, workflows, customer benefits, and use cases.',
    priceDisplay: 'Estimated range: ₹2,500–₹6,000'
  },
  {
    id: 'pres-portfolio-deck',
    name: 'Portfolio Presentation',
    category: 'presentation',
    description: 'Clean digital portfolio deck for agencies, consultants, and creators for offline or PDF sharing.',
    priceDisplay: 'Estimated range: ₹1,500–₹4,000'
  },
  {
    id: 'pres-infographic-slides',
    name: 'Infographic Slides',
    category: 'presentation',
    description: 'Bespoke vector graphics, timeline roadmaps, comparison matrices, and visual callouts that replace walls of text.',
    priceDisplay: 'Estimated range: ₹500–₹1,500'
  },
  {
    id: 'pres-data-visualization',
    name: 'Data Visualization Presentation',
    category: 'presentation',
    description: 'Complex financial, operational, or analytics data transformed into polished, easily readable charts and dashboards.',
    priceDisplay: 'Estimated range: ₹2,000–₹6,000'
  },
  {
    id: 'pres-proposal-quotation',
    name: 'Proposal and Quotation Deck',
    category: 'presentation',
    description: 'Standardized, re-usable client quotation deck format designed to accelerate deal turnaround.',
    priceDisplay: 'Estimated range: ₹1,000–₹3,000'
  },

  // =========================================================================
  // D. Creative Design & Branding (20 services)
  // =========================================================================
  {
    id: 'brand-logo-design',
    name: 'Logo Design',
    category: 'branding',
    description: 'Original brandmark and typography wordmark crafted for digital screens, favicons, and vector scalability.',
    priceDisplay: 'Estimated range: ₹1,000–₹3,500'
  },
  {
    id: 'brand-mini-kit',
    name: 'Mini Brand Kit / Digital Brand Kit',
    category: 'branding',
    description: 'Foundational digital identity including primary logo, secondary badge, typography pairing, and color codes.',
    priceDisplay: 'Estimated range: ₹2,000–₹5,000'
  },
  {
    id: 'brand-identity-system',
    name: 'Brand Identity System',
    category: 'branding',
    description: 'Complete visual identity architecture including logo lockups, color ramps, typography rules, and asset library.',
    priceDisplay: 'Estimated range: ₹4,000–₹12,000'
  },
  {
    id: 'brand-guidelines',
    name: 'Brand Guidelines',
    category: 'branding',
    description: 'Detailed brand manual specifying logo clearspace, color codes (HEX/RGB/CMYK), font rules, and misuse examples.',
    priceDisplay: 'Estimated range: ₹2,000–₹6,000'
  },
  {
    id: 'brand-business-card',
    name: 'Business Card Design',
    category: 'branding',
    description: 'Print-ready vector business cards with modern layout, clean QR code integration, and bleed margins.',
    priceDisplay: 'Estimated range: ₹500–₹1,200'
  },
  {
    id: 'brand-icon-set',
    name: 'Icon Set Design',
    category: 'branding',
    description: 'Custom suite of vector SVG icons crafted to match your brand style for websites, presentations, or apps.',
    priceDisplay: 'Estimated range: ₹1,000–₹4,000'
  },
  {
    id: 'brand-instagram-post',
    name: 'Instagram Post Design',
    category: 'branding',
    description: 'Eye-catching social feed visual designed with high visual contrast and brand typography.',
    priceDisplay: 'Estimated range: ₹300–₹700'
  },
  {
    id: 'brand-instagram-carousel',
    name: 'Instagram Carousel',
    category: 'branding',
    description: 'Multi-slide educational or storytelling carousel with seamless slide-to-slide visual flow.',
    priceDisplay: 'Estimated range: ₹600–₹1,500'
  },
  {
    id: 'brand-instagram-story',
    name: 'Instagram Story Design',
    category: 'branding',
    description: 'Vertical 9:16 story creative optimized for engagement, polls, launches, or link sticker placement.',
    priceDisplay: 'Estimated range: ₹250–₹600'
  },
  {
    id: 'brand-reels-cover',
    name: 'Reels Cover',
    category: 'branding',
    description: 'Clean thumbnail cover ensuring consistent aesthetics across both grid view and 9:16 Reels tab.',
    priceDisplay: 'Estimated range: ₹200–₹500'
  },
  {
    id: 'brand-linkedin-post',
    name: 'LinkedIn Post Design',
    category: 'branding',
    description: 'Professional graphic or multi-page PDF document format tailored for thought leadership and B2B reach.',
    priceDisplay: 'Estimated range: ₹300–₹700'
  },
  {
    id: 'brand-social-templates',
    name: 'Social Media Templates',
    category: 'branding',
    description: 'Editable Figma or Canva social graphic templates enabling your team to generate branded posts rapidly.',
    priceDisplay: 'Estimated range: ₹1,000–₹3,000'
  },
  {
    id: 'brand-fest-poster',
    name: 'Event / College Fest Poster',
    category: 'branding',
    description: 'High-energy promotional poster with bold typography, sponsor strip, schedule, and QR registration.',
    priceDisplay: 'Estimated range: ₹500–₹1,500'
  },
  {
    id: 'brand-product-poster',
    name: 'Product Promotion Poster',
    category: 'branding',
    description: 'Commercial product launch or offer poster designed for digital distribution and physical prints.',
    priceDisplay: 'Estimated range: ₹500–₹1,500'
  },
  {
    id: 'brand-restaurant-menu',
    name: 'Restaurant Menu Design',
    category: 'branding',
    description: 'Structured, easy-to-read menu with organized dish sections, pricing layout, and print-ready vector file.',
    priceDisplay: 'Estimated range: ₹800–₹2,500'
  },
  {
    id: 'brand-invitation-card',
    name: 'Digital Invitation Card',
    category: 'branding',
    description: 'Premium digital invite for corporate events, webinars, or personal celebrations with interactive links.',
    priceDisplay: 'Estimated range: ₹500–₹1,500'
  },
  {
    id: 'brand-hero-banner',
    name: 'Website Hero Banner',
    category: 'branding',
    description: 'Hero header artwork blending vector graphics, typography, and layered lighting tailored to your site theme.',
    priceDisplay: 'Estimated range: ₹500–₹1,500'
  },
  {
    id: 'brand-promotional-graphics',
    name: 'Promotional Campaign Graphics',
    category: 'branding',
    description: 'Cohesive multi-asset graphic pack for seasonal sales, announcements, and marketing drives.',
    priceDisplay: 'Estimated range: ₹1,500–₹5,000'
  },
  {
    id: 'brand-ecommerce-product-graphics',
    name: 'E-commerce Product Graphics',
    category: 'branding',
    description: 'Enhanced product hero images featuring feature callouts, dimension diagrams, and benefits badges.',
    priceDisplay: 'Estimated range: ₹300–₹800 per image',
    unit: 'per image'
  },
  {
    id: 'brand-basic-logo-animation',
    name: 'Basic Logo Animation',
    category: 'branding',
    description: 'Clean motion ident / animated SVG logo reveal suitable for website loaders and video intros.',
    priceDisplay: 'Estimated range: ₹1,000–₹3,500'
  },

  // =========================================================================
  // E. YouTube & Creator Services (12 services)
  // =========================================================================
  {
    id: 'creator-thumbnail',
    name: 'YouTube Thumbnail',
    category: 'creator',
    description: 'High-contrast, high-CTR thumbnail designed with expressive focal points and mobile-readable typography.',
    priceDisplay: 'Estimated range: ₹300–₹700'
  },
  {
    id: 'creator-channel-logo',
    name: 'YouTube Channel Logo',
    category: 'creator',
    description: 'Recognizable circular profile icon that stands out on small mobile screens and notification feeds.',
    priceDisplay: 'Estimated range: ₹800–₹2,500'
  },
  {
    id: 'creator-channel-banner',
    name: 'YouTube Channel Banner',
    category: 'creator',
    description: 'Panoramic channel art optimized across TV, desktop, tablet, and mobile safe zones with upload schedule.',
    priceDisplay: 'Estimated range: ₹500–₹1,200'
  },
  {
    id: 'creator-intro-graphics',
    name: 'YouTube Intro Graphics / Animation',
    category: 'creator',
    description: '3–5 second branded visual opening or sting animation to establish immediate channel recognition.',
    priceDisplay: 'Estimated range: ₹1,000–₹3,000'
  },
  {
    id: 'creator-outro-graphics',
    name: 'YouTube Outro Graphics / Animation',
    category: 'creator',
    description: 'Polished closing graphics with dedicated video placeholder slots and subscriber callouts.',
    priceDisplay: 'Estimated range: ₹800–₹2,000'
  },
  {
    id: 'creator-end-screen',
    name: 'YouTube End Screen',
    category: 'creator',
    description: 'Static or animated end slate formatted precisely to YouTube clickable element dimensions.',
    priceDisplay: 'Estimated range: ₹500–₹1,200'
  },
  {
    id: 'creator-gaming-graphics',
    name: 'Gaming Channel Graphics',
    category: 'creator',
    description: 'Futuristic gamer aesthetics with aggressive typography, neon glow accents, and stream assets.',
    priceDisplay: 'Estimated range: ₹1,500–₹4,000'
  },
  {
    id: 'creator-stream-overlay',
    name: 'Stream Overlay Package',
    category: 'creator',
    description: 'OBS-ready streaming package with webcam frame, chat box, starting soon screen, and BRB slide.',
    priceDisplay: 'Estimated range: ₹1,500–₹4,000'
  },
  {
    id: 'creator-podcast-cover',
    name: 'Podcast Cover Design',
    category: 'creator',
    description: '3000x3000px square cover art compliant with Spotify, Apple Podcasts, and YouTube Music requirements.',
    priceDisplay: 'Estimated range: ₹500–₹1,500'
  },
  {
    id: 'creator-video-title-graphics',
    name: 'Video Title Graphics',
    category: 'creator',
    description: 'Custom lower thirds, chapter cards, and topic title overlays for on-screen video segments.',
    priceDisplay: 'Estimated range: ₹500–₹1,500'
  },
  {
    id: 'creator-social-video-covers',
    name: 'Social Media Video Covers',
    category: 'creator',
    description: 'Cohesive vertical video cover art for YouTube Shorts, Instagram Reels, and TikTok feeds.',
    priceDisplay: 'Estimated range: ₹200–₹500 each',
    unit: 'each'
  },
  {
    id: 'creator-branding-package',
    name: 'Creator Branding Package',
    category: 'creator',
    description: 'Comprehensive branding for serious creators: Channel logo, banner, 3 thumbnails, and intro graphic.',
    priceDisplay: 'Estimated range: ₹3,000–₹8,000'
  },

  // =========================================================================
  // F. Practical Interactive Features & Integrations (14 services)
  // =========================================================================
  {
    id: 'interactive-scroll-animations',
    name: 'Scroll-Triggered Animations',
    category: 'interactive',
    description: 'Smooth fade-ins, stagger reveals, and entrance effects that bring web page sections to life as users scroll.',
    priceDisplay: 'Estimated range: ₹1,500–₹5,000'
  },
  {
    id: 'interactive-parallax-scrolling',
    name: 'Parallax Scrolling',
    category: 'interactive',
    description: 'Multi-plane depth effect creating a cinematic perspective shift between foreground and background.',
    priceDisplay: 'Estimated range: ₹1,500–₹5,000'
  },
  {
    id: 'interactive-custom-cursor',
    name: 'Custom Cursor Interactions',
    category: 'interactive',
    description: 'Custom brand-accented pointer with magnetic hover states, trailing effects, and click explosions.',
    priceDisplay: 'Estimated range: ₹800–₹2,500'
  },
  {
    id: 'interactive-before-after',
    name: 'Before-and-After Slider',
    category: 'interactive',
    description: 'Interactive comparison slider allowing users to swipe between two states or visual transformations.',
    priceDisplay: 'Estimated range: ₹800–₹2,000'
  },
  {
    id: 'interactive-price-calculator',
    name: 'Custom Price Calculator',
    category: 'interactive',
    description: 'Interactive web calculator estimating costs in real time based on user-selected sliders and checkboxes.',
    priceDisplay: 'Estimated range: ₹2,000–₹6,000'
  },
  {
    id: 'interactive-quote-generator',
    name: 'Quote Generator',
    category: 'interactive',
    description: 'Dynamic quotation tool generating instant itemized estimates with downloadable or email summary.',
    priceDisplay: 'Estimated range: ₹2,000–₹6,000'
  },
  {
    id: 'interactive-lead-capture',
    name: 'Lead Capture Tool',
    category: 'interactive',
    description: 'High-converting interactive lead magnets, multi-step intake flows, and discount unlock drawers.',
    priceDisplay: 'Estimated range: ₹1,500–₹4,000'
  },
  {
    id: 'interactive-forms-workflows',
    name: 'Custom Forms and Workflows',
    category: 'interactive',
    description: 'Tailored multi-field inquiry forms with validation, conditional logic, and auto-reply confirmations.',
    priceDisplay: 'Estimated range: ₹1,500–₹6,000'
  },
  {
    id: 'interactive-contact-email',
    name: 'Contact Form to Email Workflow',
    category: 'interactive',
    description: 'Reliable serverless backend function forwarding form submissions directly into your inbox with zero spam.',
    priceDisplay: 'Estimated range: ₹1,000–₹3,000'
  },
  {
    id: 'interactive-booking-notifications',
    name: 'Booking Notifications',
    category: 'interactive',
    description: 'Instant notification dispatch (e.g. Telegram or email alert) whenever a new appointment or inquiry is submitted.',
    priceDisplay: 'Estimated range: ₹1,000–₹3,000'
  },
  {
    id: 'interactive-analytics-dashboard',
    name: 'Website Analytics Dashboard',
    category: 'interactive',
    description: 'Privacy-first traffic tracking and client-facing metrics overview without complex tracking code.',
    priceDisplay: 'Estimated range: ₹2,000–₹6,000'
  },
  {
    id: 'interactive-payment-gateway',
    name: 'Payment Gateway Integration',
    category: 'interactive',
    description: 'Integration of standard checkout gateways (e.g. Razorpay, Stripe, UPI links) for quick payments.',
    priceDisplay: 'Estimated range: ₹2,000–₹6,000'
  },
  {
    id: 'interactive-faq-system',
    name: 'Smart FAQ System',
    category: 'interactive',
    description: 'Expandable accordion FAQ with real-time keyword search and categorical filtering.',
    priceDisplay: 'Estimated range: ₹2,000–₹6,000'
  },
  {
    id: 'interactive-ai-chatbot',
    name: 'Basic AI Chatbot Integration',
    category: 'interactive',
    description: 'Embeddable chat widget with scripted answers or basic AI API hook for customer query resolution.',
    priceDisplay: 'Estimated range: ₹3,000–₹10,000'
  },

  // =========================================================================
  // G. Academic & College Services (ZERO public pricing - Private confirmation only)
  // =========================================================================
  {
    id: 'acad-college-practical',
    name: 'College Practical PPT',
    category: 'academic',
    description: 'Lab experiment slides, readings tabulation, apparatus descriptions, and academic conclusion.',
    priceDisplay: '',
    isAcademic: true,
    badge: 'LIMITED AVAILABILITY',
    scopeNotes: 'Pricing, delivery, and availability are discussed privately upon inquiry.'
  },
  {
    id: 'acad-project-ppt',
    name: 'Academic Project PPT',
    category: 'academic',
    description: 'College project defense presentation structured to department guidelines and faculty expectations.',
    priceDisplay: '',
    isAcademic: true,
    badge: 'LIMITED AVAILABILITY',
    scopeNotes: 'Pricing, delivery, and availability are discussed privately upon inquiry.'
  },
  {
    id: 'acad-seminar-presentation',
    name: 'Seminar Presentation',
    category: 'academic',
    description: 'Departmental seminar slide deck formatted with academic citations, topic breakdown, and clean diagrams.',
    priceDisplay: '',
    isAcademic: true,
    badge: 'LIMITED AVAILABILITY',
    scopeNotes: 'Pricing, delivery, and availability are discussed privately upon inquiry.'
  },
  {
    id: 'acad-formatting-notes',
    name: 'Formatting of Client-Provided Project Documents & Notes',
    category: 'academic',
    description: 'Professional layout typesetting, typography alignment, margin setup, and index generation for your existing drafts.',
    priceDisplay: '',
    isAcademic: true,
    badge: 'LIMITED AVAILABILITY',
    scopeNotes: 'Subject to workload and schedule. Pricing is confirmed privately after review of draft.'
  },
  {
    id: 'acad-printing-binding',
    name: 'Printing and Binding (Subject to Availability)',
    category: 'academic',
    description: 'Finished spiral or hardcover binding and localized delivery, available strictly on manual schedule confirmation.',
    priceDisplay: '',
    isAcademic: true,
    badge: 'LIMITED AVAILABILITY',
    scopeNotes: 'Service feasibility and local delivery availability confirmed privately after inquiry.'
  }
];

export const POPULAR_PACKAGES: PopularPackage[] = [
  {
    id: 'pkg-basic-website',
    name: 'Basic Business Website',
    category: 'websites',
    introPrice: 'Introductory price: ₹7,999',
    description: 'Complete 3–4 page modern website built for businesses seeking a credible, mobile-optimized digital presence.',
    deliverables: [
      'Responsive React web architecture',
      'Home, Services, About, and Contact pages',
      'Mobile-first layout & fast loading',
      'Working contact form to Telegram/Email',
      'Basic SEO & social sharing metadata'
    ],
    popular: true
  },
  {
    id: 'pkg-premium-website',
    name: 'Premium Business Website',
    category: 'websites',
    introPrice: 'Introductory price: ₹14,999',
    description: 'Full-scope multi-page digital platform with dark-premium aesthetics, micro-animations, and lead capture.',
    deliverables: [
      'Custom bespoke UI/UX design',
      'Up to 8 curated pages with custom layouts',
      'Scroll-triggered animations & depth effects',
      'Interactive service inquiries & forms',
      'Performance audit & edge deployment'
    ]
  },
  {
    id: 'pkg-landing-page',
    name: 'Landing Page',
    category: 'websites',
    introPrice: 'Introductory price: ₹3,999',
    description: 'Single-page high-conversion launchpad engineered to convert visitors into booked calls or active inquiries.',
    deliverables: [
      'Clear value proposition & hero section',
      'Product benefits, social proof & FAQ',
      'Fast lead capture or WhatsApp CTA',
      'Mobile thumb-friendly layout'
    ]
  },
  {
    id: 'pkg-ui-landing-page',
    name: 'UI/UX Landing Page Design',
    category: 'ui-ux',
    introPrice: 'Introductory price: ₹2,999',
    description: 'Pure Figma design system for a high-converting landing page ready for developer implementation.',
    deliverables: [
      'Desktop (1440px) & Mobile (375px) frames',
      'Design tokens (colors, typography, grid)',
      'Organized Figma component library',
      'Developer handoff assets & SVG exports'
    ]
  },
  {
    id: 'pkg-startup-pitch',
    name: 'Startup Pitch Deck',
    category: 'presentation',
    introPrice: 'Introductory price: ₹2,999',
    description: 'Compelling 10-slide investor pitch deck crafted with dark-premium visual aesthetics and structured storytelling.',
    deliverables: [
      '10 customized slide templates',
      'Problem, Solution, Market & Business Model',
      'Custom data visualization slides',
      'Editable PPTX and vector PDF exports'
    ]
  },
  {
    id: 'pkg-social-media',
    name: 'Social Media Design — 5 Posts',
    category: 'branding',
    introPrice: 'Introductory price: ₹1,499',
    description: '5 cohesive, brand-aligned social media creatives designed to elevate your feed presence and audience reach.',
    deliverables: [
      '5 custom feed graphics (1080x1080 / 1080x1350)',
      'Cohesive brand colors and typography',
      'High-resolution JPG/PNG files',
      'Ready for Instagram, LinkedIn, or Twitter'
    ]
  },
  {
    id: 'pkg-logo-mini-kit',
    name: 'Logo + Mini Brand Kit',
    category: 'branding',
    introPrice: 'Introductory price: ₹2,499',
    description: 'Essential digital identity package for new ventures, independent creators, or fast-moving projects.',
    deliverables: [
      'Primary logo and icon badge',
      'Vector formats (SVG, transparent PNG)',
      'Brand color palette with HEX codes',
      'Font pairings and usage guidelines'
    ],
    popular: true
  },
  {
    id: 'pkg-youtube-thumbnails',
    name: 'YouTube Thumbnail — 3 Designs',
    category: 'creator',
    introPrice: 'Introductory price: ₹999',
    description: '3 custom-designed, high-CTR YouTube thumbnails built to maximize impressions and viewer clicks.',
    deliverables: [
      '3 distinct thumbnail concepts',
      'High contrast, expressive lighting & typography',
      '1280x720 HD format under 2MB',
      'Tailored to your content niche'
    ]
  },
  {
    id: 'pkg-creator-starter',
    name: 'Creator Branding Starter',
    category: 'creator',
    introPrice: 'Introductory price: ₹2,999',
    description: 'Everything an ambitious creator needs to launch or elevate their channel presence across platforms.',
    deliverables: [
      'YouTube channel logo / avatar',
      'Responsive channel banner (All devices)',
      '3 custom video thumbnails',
      'Branded video intro/title graphic'
    ]
  },
  {
    id: 'pkg-bundle-website-brand',
    name: 'Website + Brand Identity Bundle',
    category: 'websites',
    introPrice: 'Introductory price: ₹11,999',
    description: 'All-in-one powerhouse package combining full brand identity design with a modern custom React website.',
    deliverables: [
      'Complete brand identity (Logo, palette, fonts)',
      'Modern bespoke business website (Up to 5 pages)',
      'Cohesive visuals matching throughout',
      'Contact form & Telegram alert integration',
      '1 month of post-launch technical support'
    ],
    popular: true
  }
];

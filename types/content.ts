import { LucideIcon } from 'lucide-react';

// Step type for HowItWorks
export interface Step {
  step: string;
  icon: LucideIcon;
  title: string;
  description: string;
  details: string[];
}

// Plan type for Pricing
export interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  cta: string;
  ctaStyle: string;
  popular: boolean;
}

// Industry type for Industries
export interface Industry {
  icon: LucideIcon;
  title: string;
  description: string;
  examples: string[];
  stats: string;
  color: 'blue' | 'green' | 'yellow';
}

// Source type for Industries
export interface Source {
  icon: LucideIcon;
  title: string;
  description: string;
  count: string;
  examples: string[];
}

// Contact info type
export interface ContactInfo {
  icon: LucideIcon;
  title: string;
  details: string[];
  action: string;
}

// FAQ type
export interface FAQ {
  question: string;
  answer: string;
}

// Feature type
export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

// Hero data types
export interface TenderExample {
  title: string;
  value: string;
  type: string;
  deadline: string;
}

export interface HeroStats {
  daily: string;
  database: string;
  update: string;
}

// Footer types
export interface FooterLink {
  name: string;
  href: string;
}

export interface FooterLinks {
  company: FooterLink[];
  services: FooterLink[];
  support: FooterLink[];
  legal: FooterLink[];
}

// Blog types
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  featured: boolean;
}

export interface BlogCategory {
  name: string;
  slug: string;
  count: number;
}




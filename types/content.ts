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




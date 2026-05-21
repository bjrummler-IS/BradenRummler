/**
 * TypeScript definitions for Braden Rummler's Portfolio.
 */

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  period: string;
  location: string;
  bullets: string[];
  logo?: string;
}

export interface CaseCompetition {
  id: string;
  name: string;
  role: string;
  year: number;
  bullets: string[];
  icon: string;
  logo?: string;
}

export interface Scholarship {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface ExperienceItem {
  id: string;
  organization: string;
  role: string;
  period: string;
  bullets: string[];
  skills: string[];
  isCurrent: boolean;
  logo?: string;
}

export interface Methodology {
  id: string;
  title: string;
  description: string;
  icon: string;
}

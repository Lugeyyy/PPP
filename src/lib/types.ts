export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface Skill {
  name: string;
  level: SkillLevel;
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  keyAchievements: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  yearCompleted: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
  url?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  images: string[];
  links: { label: string; url: string }[];
}

export interface Availability {
  openToWork: boolean;
  type: 'full-time' | 'part-time' | 'contract';
  location: 'remote' | 'on-site' | 'hybrid';
}

export interface Profile {
  id: string;
  slug: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  location: string;
  profilePhoto: string;
  professionalSummary: string;
  shortBio: string;
  careerObjective: string;
  primaryField: string;
  skills: Skill[];
  tools: string[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  projects: Project[];
  availability: Availability;
  email: string;
  phone?: string;
  linkedin?: string;
  portfolio?: string;
  createdAt: string;
  featured?: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'seeker' | 'employer';
  profileId?: string;
}

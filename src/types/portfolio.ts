import type { Director } from '@/types/director';
import type { MediaAsset } from '@/types/media';
import type { Project } from '@/types/project';

export type Portfolio = {
  id: string;
  directorId: string;
  tagline?: string;
  isPublic: boolean;
};

export type PortfolioPreview = {
  director: Director;
  portfolio: Portfolio;
  featuredProjects: Project[];
  media: MediaAsset[];
} | null;

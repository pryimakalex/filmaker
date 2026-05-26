import type { Director } from '@/types/director';
import type { MediaAsset } from '@/types/media';
import type { Portfolio } from '@/types/portfolio';
import type { Project } from '@/types/project';

import { createId } from '@/services/mocks/createId';
import { slugify } from '@/shared/utils/slug';

export const DEMO_USER_ID = 'user_demo';

export const seedDirector: Director = {
  id: 'director_demo',
  userId: DEMO_USER_ID,
  name: 'Alex Rivera',
  slug: 'alex-rivera',
  headline: 'Narrative & documentary filmmaker',
  bio: 'Based in LA. Short films and branded work.',
  location: 'Los Angeles, CA',
};

export const seedPortfolio: Portfolio = {
  id: 'portfolio_demo',
  directorId: seedDirector.id,
  tagline: 'Selected work for producers and festivals.',
  isPublic: true,
};

export const seedProjects: Project[] = [
  {
    id: 'project_midnight_run',
    ownerId: seedDirector.id,
    title: 'Midnight Run',
    description: 'Short drama · 12 min',
    status: 'released',
    genre: 'Drama',
    year: 2025,
    isFeatured: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 14,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
  },
  {
    id: 'project_coastal_light',
    ownerId: seedDirector.id,
    title: 'Coastal Light',
    description: 'Documentary in post-production',
    status: 'post_production',
    genre: 'Documentary',
    year: 2026,
    isFeatured: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 7,
    updatedAt: Date.now() - 1000 * 60 * 60 * 24,
  },
];

export const seedMedia: MediaAsset[] = [
  {
    id: 'media_midnight_teaser',
    ownerId: seedDirector.id,
    projectId: 'project_midnight_run',
    title: 'Midnight Run — Teaser',
    uploadStatus: 'ready',
    duration: 62,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
  },
];

export function buildDirectorForUser(userId: string, name: string): Director {
  const baseSlug = slugify(name) || 'director';
  return {
    id: createId('director'),
    userId,
    name,
    slug: `${baseSlug}-${userId.slice(-4)}`,
    headline: 'Director',
  };
}

export function buildPortfolioForDirector(directorId: string, tagline?: string): Portfolio {
  return {
    id: createId('portfolio'),
    directorId,
    tagline,
    isPublic: true,
  };
}

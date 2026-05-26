import type { SocialLinks } from '@/types/common';

export type Director = {
  id: string;
  userId: string;
  name: string;
  slug: string;
  bio?: string;
  location?: string;
  website?: string;
  socialLinks?: SocialLinks;
  headline?: string;
};

export type SaveDirectorProfileInput = {
  name: string;
  bio?: string;
  location?: string;
  website?: string;
  headline?: string;
  socialLinks?: SocialLinks;
};

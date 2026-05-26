export type ProjectStatus = 'development' | 'post_production' | 'released';

export type Project = {
  id: string;
  ownerId: string;
  title: string;
  description?: string;
  status: ProjectStatus;
  genre?: string;
  year?: number;
  isFeatured: boolean;
  createdAt: number;
  updatedAt: number;
};

export type ProjectDetail = {
  project: Project;
  media: import('@/types/media').MediaAsset[];
} | null;

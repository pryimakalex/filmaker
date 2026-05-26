import type { Director, SaveDirectorProfileInput } from '@/types/director';
import type { MediaAsset } from '@/types/media';
import type { Portfolio } from '@/types/portfolio';
import type { Project } from '@/types/project';

import {
  buildDirectorForUser,
  buildPortfolioForDirector,
  seedDirector,
  seedMedia,
  seedPortfolio,
  seedProjects,
} from '@/services/mocks/mockData';
import { createId } from '@/services/mocks/createId';

type StoreState = {
  directors: Director[];
  portfolios: Portfolio[];
  projects: Project[];
  media: MediaAsset[];
  currentUserId: string | null;
};

const listeners = new Set<() => void>();
let state: StoreState = createInitialState();
let storeVersion = 0;

function clone<T>(value: T): T {
  return structuredClone(value);
}

function createInitialState(): StoreState {
  return {
    directors: [clone(seedDirector)],
    portfolios: [clone(seedPortfolio)],
    projects: clone(seedProjects),
    media: clone(seedMedia),
    currentUserId: null,
  };
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getStoreVersion(): number {
  return storeVersion;
}

function notifyStoreChanged(): void {
  storeVersion += 1;
  listeners.forEach((listener) => listener());
}

export function setCurrentUserId(userId: string | null): void {
  state.currentUserId = userId;
  notifyStoreChanged();
}

function getDirectorForCurrentUser(): Director | null {
  if (!state.currentUserId) return null;
  return state.directors.find((d) => d.userId === state.currentUserId) ?? null;
}

function requireDirectorForCurrentUser(): Director {
  const director = getDirectorForCurrentUser();
  if (!director) throw new Error('Director profile not found');
  return director;
}

export const inMemoryStore = {
  getDirectorProfile() {
    const director = getDirectorForCurrentUser();
    if (!director) return null;
    const portfolio = state.portfolios.find((p) => p.directorId === director.id) ?? null;
    if (!portfolio) return null;
    return { director: clone(director), portfolio: clone(portfolio) };
  },

  upsertDirectorProfile(input: SaveDirectorProfileInput) {
    if (!state.currentUserId) throw new Error('Unauthenticated');

    const existing = state.directors.find((d) => d.userId === state.currentUserId);

    if (existing) {
      Object.assign(existing, input);
      notifyStoreChanged();
      return existing.id;
    }

    const director = buildDirectorForUser(state.currentUserId, input.name);
    Object.assign(director, input);
    state.directors.push(director);
    state.portfolios.push(buildPortfolioForDirector(director.id, input.headline));
    notifyStoreChanged();
    return director.id;
  },

  listProjects() {
    const director = getDirectorForCurrentUser();
    if (!director) return [];
    return clone(
      state.projects
        .filter((p) => p.ownerId === director.id)
        .sort((a, b) => b.updatedAt - a.updatedAt),
    );
  },

  getProject(projectId: string) {
    const director = getDirectorForCurrentUser();
    if (!director) return null;

    const project = state.projects.find((p) => p.id === projectId && p.ownerId === director.id);
    if (!project) return null;

    const media = state.media
      .filter((m) => m.projectId === projectId)
      .sort((a, b) => b.createdAt - a.createdAt);

    return { project: clone(project), media: clone(media) };
  },

  listMedia() {
    const director = getDirectorForCurrentUser();
    if (!director) return [];
    return clone(
      state.media
        .filter((m) => m.ownerId === director.id && m.uploadStatus === 'ready')
        .sort((a, b) => b.createdAt - a.createdAt),
    );
  },

  createMediaAsset(input: Omit<MediaAsset, 'id' | 'ownerId' | 'createdAt'>) {
    const director = requireDirectorForCurrentUser();
    const media: MediaAsset = {
      id: createId('media'),
      ownerId: director.id,
      createdAt: Date.now(),
      ...input,
    };
    state.media.unshift(media);
    notifyStoreChanged();
    return media.id;
  },

  updateMediaAsset(
    mediaId: string,
    updates: Partial<
      Pick<
        MediaAsset,
        'uploadStatus' | 'muxAssetId' | 'muxPlaybackId' | 'thumbnailUrl' | 'duration'
      >
    >,
  ) {
    const director = requireDirectorForCurrentUser();
    const media = state.media.find((m) => m.id === mediaId && m.ownerId === director.id);
    if (!media) throw new Error('Media asset not found');
    Object.assign(media, updates);
    notifyStoreChanged();
  },

  getPortfolioPreview() {
    const profile = this.getDirectorProfile();
    if (!profile) return null;

    const projects = state.projects.filter((p) => p.ownerId === profile.director.id);
    const media = this.listMedia();

    return {
      director: clone(profile.director),
      portfolio: clone(profile.portfolio),
      featuredProjects: clone(projects.filter((p) => p.isFeatured)),
      media,
    };
  },
};

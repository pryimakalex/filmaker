import { inMemoryStore } from '@/services/mocks/inMemoryStore';
import { mockNetworkDelay } from '@/services/mocks/mockDelay';
import type { Project, ProjectDetail } from '@/types/project';

export const projectsService = {
  async listProjects(): Promise<Project[]> {
    await mockNetworkDelay();
    return inMemoryStore.listProjects();
  },

  async getProjectById(projectId: string): Promise<ProjectDetail> {
    await mockNetworkDelay();
    return inMemoryStore.getProject(projectId);
  },
};

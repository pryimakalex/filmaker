import { inMemoryStore } from '@/services/mocks/inMemoryStore';
import { mockNetworkDelay } from '@/services/mocks/mockDelay';
import type { PortfolioPreview } from '@/types/portfolio';

export const portfolioService = {
  async getPortfolio(): Promise<PortfolioPreview> {
    await mockNetworkDelay();
    return inMemoryStore.getPortfolioPreview();
  },
};

import { env } from '@/shared/config/env';

export function createPublicPortfolioUrl(slug: string): string {
  const base = env.portfolioBaseUrl.replace(/\/$/, '');
  return `${base}/director/${slug}`;
}

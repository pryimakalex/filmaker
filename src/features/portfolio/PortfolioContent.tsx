import { Share, Text, View } from 'react-native';

import { MediaCard } from '@/features/media/MediaCard';
import { ProjectCard } from '@/features/projects/ProjectCard';
import { createPublicPortfolioUrl } from '@/shared/utils/createPublicPortfolioUrl';
import { Card } from '@/shared/ui/Card';
import { EmptyState } from '@/shared/ui/EmptyState';
import { SectionHeader } from '@/shared/ui/SectionHeader';
import type { PortfolioPreview } from '@/types/portfolio';

type Props = {
  data: NonNullable<PortfolioPreview>;
};

export function PortfolioContent({ data }: Props) {
  const { director, portfolio, featuredProjects, media } = data;
  // Public portfolio URLs are placeholders until publishing exists on the backend.
  const portfolioUrl = createPublicPortfolioUrl(director.slug);

  async function share() {
    await Share.share({
      message: `${director.name} — Filmfolio\n${portfolioUrl}`,
      url: portfolioUrl,
    });
  }

  return (
    <>
      <Card className="mb-6 gap-2">
        <Text className="text-xs uppercase tracking-widest text-accent">Preview</Text>
        <Text className="text-2xl font-semibold text-white">{director.name}</Text>
        <Text className="text-base text-muted">
          {portfolio.tagline ?? director.headline ?? 'Director portfolio'}
        </Text>
        <Text className="text-sm text-accent" selectable onPress={share}>
          {portfolioUrl}
        </Text>
      </Card>

      <SectionHeader title="Featured projects" />
      {featuredProjects.length === 0 ? (
        <EmptyState title="No featured projects" description="Featured work shows up here." />
      ) : (
        <View className="mb-6 gap-4">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </View>
      )}

      <SectionHeader title="Reels" />
      {media.length === 0 ? (
        <EmptyState title="No reels" description="Upload a mock reel from the Upload tab." />
      ) : (
        <View className="flex-row flex-wrap gap-3">
          {media.map((reel) => (
            <MediaCard key={reel.id} title={reel.title} thumbnailUrl={reel.thumbnailUrl} />
          ))}
        </View>
      )}
    </>
  );
}

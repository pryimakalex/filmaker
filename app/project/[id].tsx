import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

import { MediaCard } from '@/features/media/MediaCard';
import { projectsService } from '@/services/api/projects.service';
import { useQuery } from '@/shared/hooks/useQuery';
import { Card } from '@/shared/ui/Card';
import { ErrorState } from '@/shared/ui/ErrorState';
import { LoadingState } from '@/shared/ui/LoadingState';
import { Screen } from '@/shared/ui/Screen';

const STATUS_LABELS = {
  development: 'In development',
  post_production: 'Post-production',
  released: 'Released',
} as const;

export default function ProjectDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const data = useQuery(() => projectsService.getProjectById(id ?? ''), [id]);

  if (data === undefined) {
    return <LoadingState message="Loading project…" />;
  }

  if (!data) {
    return (
      <Screen>
        <ErrorState message="Project not found." />
      </Screen>
    );
  }

  const { project, media } = data;

  return (
    <Screen title={project.title}>
      <Card className="mb-6 gap-2">
        <Text className="text-xs uppercase tracking-wider text-muted">
          {STATUS_LABELS[project.status]}
          {project.year ? ` · ${project.year}` : ''}
        </Text>
        {project.description ? (
          <Text className="text-base text-muted">{project.description}</Text>
        ) : null}
      </Card>

      <Text className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted">Media</Text>
      {media.length === 0 ? (
        <Text className="text-sm text-muted">No reels attached.</Text>
      ) : (
        <View className="flex-row flex-wrap gap-3">
          {media.map((reel) => (
            <MediaCard key={reel.id} title={reel.title} thumbnailUrl={reel.thumbnailUrl} />
          ))}
        </View>
      )}
    </Screen>
  );
}

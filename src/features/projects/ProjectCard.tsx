import { Pressable, Text } from 'react-native';

import { Card } from '@/shared/ui/Card';
import type { Project } from '@/types/project';

const STATUS_LABELS = {
  development: 'In development',
  post_production: 'Post-production',
  released: 'Released',
} as const;

type Props = {
  project: Project;
  onPress?: () => void;
};

export function ProjectCard({ project, onPress }: Props) {
  return (
    <Pressable onPress={onPress}>
      <Card className="gap-2">
        <Text className="text-lg font-medium text-white">{project.title}</Text>
        <Text className="text-xs uppercase tracking-wider text-muted">
          {STATUS_LABELS[project.status]}
          {project.year ? ` · ${project.year}` : ''}
        </Text>
        {project.description ? (
          <Text className="text-sm text-muted" numberOfLines={2}>
            {project.description}
          </Text>
        ) : null}
      </Card>
    </Pressable>
  );
}

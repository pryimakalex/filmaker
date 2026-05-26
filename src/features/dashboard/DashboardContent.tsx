import { View } from 'react-native';

import { ProjectCard } from '@/features/projects/ProjectCard';
import { EmptyState } from '@/shared/ui/EmptyState';
import { SectionHeader } from '@/shared/ui/SectionHeader';
import type { Project } from '@/types/project';

type Props = {
  projects: Project[];
  onProjectPress: (id: string) => void;
  onViewAll: () => void;
};

export function DashboardContent({ projects, onProjectPress, onViewAll }: Props) {
  return (
    <>
      <SectionHeader title="Recent projects" actionLabel="View all" onAction={onViewAll} />
      {projects.length === 0 ? (
        <EmptyState title="No projects yet" description="Seed data loads with the demo account." />
      ) : (
        <View className="gap-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onPress={() => onProjectPress(project.id)}
            />
          ))}
        </View>
      )}
    </>
  );
}

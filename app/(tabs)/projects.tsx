import { useRouter } from 'expo-router';
import { View } from 'react-native';

import { ProjectCard } from '@/features/projects/ProjectCard';
import { projectsService } from '@/services/api/projects.service';
import { routes } from '@/shared/constants/routes';
import { useQuery } from '@/shared/hooks/useQuery';
import { EmptyState } from '@/shared/ui/EmptyState';
import { LoadingState } from '@/shared/ui/LoadingState';
import { Screen } from '@/shared/ui/Screen';

export default function ProjectsScreen() {
  const router = useRouter();
  const projects = useQuery(() => projectsService.listProjects());

  if (projects === undefined) {
    return <LoadingState message="Loading projects…" />;
  }

  return (
    <Screen title="Projects" subtitle="Films and treatments in progress.">
      {projects.length === 0 ? (
        <EmptyState title="No projects" description="Demo account includes sample projects." />
      ) : (
        <View className="gap-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onPress={() => router.push(routes.project(project.id))}
            />
          ))}
        </View>
      )}
    </Screen>
  );
}

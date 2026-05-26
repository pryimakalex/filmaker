import { Link, useRouter } from 'expo-router';

import { DashboardContent } from '@/features/dashboard/DashboardContent';
import { useUser } from '@/features/auth/hooks/useAuth';
import { projectsService } from '@/services/api/projects.service';
import { routes } from '@/shared/constants/routes';
import { useQuery } from '@/shared/hooks/useQuery';
import { Button } from '@/shared/ui/Button';
import { LoadingState } from '@/shared/ui/LoadingState';
import { Screen } from '@/shared/ui/Screen';

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useUser();
  const projects = useQuery(() => projectsService.listProjects());

  if (projects === undefined) {
    return <LoadingState message="Loading…" />;
  }

  const recentProjects = projects.slice(0, 3);

  return (
    <Screen
      title={`Hi, ${user?.firstName ?? 'Director'}`}
      subtitle="Quick overview of your work."
      headerAction={
        <Link href={routes.upload} asChild>
          <Button label="Upload" size="sm" variant="secondary" />
        </Link>
      }
    >
      <DashboardContent
        projects={recentProjects}
        onProjectPress={(id) => router.push(routes.project(id))}
        onViewAll={() => router.push(routes.projects)}
      />
    </Screen>
  );
}

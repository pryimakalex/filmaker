import { Redirect } from 'expo-router';

import { useAuthGuard } from '@/features/auth/hooks/useAuthGuard';
import { routes } from '@/shared/constants/routes';
import { LoadingState } from '@/shared/ui/LoadingState';

export default function IndexScreen() {
  const { isLoaded, isSignedIn } = useAuthGuard();

  if (!isLoaded) {
    return <LoadingState message="Opening Filmfolio…" />;
  }

  if (isSignedIn) {
    return <Redirect href={routes.home} />;
  }

  return <Redirect href={routes.welcome} />;
}

import { useAuth } from '@/features/auth/hooks/useAuth';
import { useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';

import { routes } from '@/shared/constants/routes';

export function useAuthGuard() {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!isSignedIn && !inAuthGroup) {
      router.replace(routes.welcome);
      return;
    }

    if (isSignedIn && inAuthGroup) {
      router.replace(routes.home);
    }
  }, [isLoaded, isSignedIn, segments, router]);

  return { isLoaded, isSignedIn };
}

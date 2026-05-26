import { useRouter } from 'expo-router';
import { View } from 'react-native';

import { useAuth } from '@/features/auth/hooks/useAuth';
import { ProfileContent } from '@/features/profile/ProfileContent';
import { portfolioService } from '@/services/api/portfolio.service';
import { routes } from '@/shared/constants/routes';
import { useQuery } from '@/shared/hooks/useQuery';
import { Button } from '@/shared/ui/Button';
import { LoadingState } from '@/shared/ui/LoadingState';
import { Screen } from '@/shared/ui/Screen';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const portfolio = useQuery(() => portfolioService.getPortfolio());

  if (portfolio === undefined) {
    return <LoadingState message="Loading profile…" />;
  }

  async function handleLogout() {
    await signOut();
    router.replace(routes.welcome);
  }

  return (
    <Screen title="Profile" subtitle="Session and director info.">
      <ProfileContent email={user?.email} director={portfolio?.director} />

      <View className="mt-8">
        <Button label="Log out" variant="danger" onPress={handleLogout} />
      </View>
    </Screen>
  );
}

import { Text } from 'react-native';

import { createPublicPortfolioUrl } from '@/shared/utils/createPublicPortfolioUrl';
import { Card } from '@/shared/ui/Card';
import type { Director } from '@/types/director';

type Props = {
  email?: string;
  director?: Director | null;
};

export function ProfileContent({ email, director }: Props) {
  return (
    <Card className="gap-3">
      <Text className="text-sm text-muted">Signed in as</Text>
      <Text className="text-base text-white">{email}</Text>
      {director ? (
        <>
          <Text className="text-lg font-medium text-white">{director.name}</Text>
          {director.headline ? (
            <Text className="text-sm text-muted">{director.headline}</Text>
          ) : null}
          {director.slug ? (
            <Text className="text-sm text-accent">{createPublicPortfolioUrl(director.slug)}</Text>
          ) : null}
        </>
      ) : (
        <Text className="text-sm text-muted">Director profile loads with the demo account.</Text>
      )}
    </Card>
  );
}

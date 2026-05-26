import { View, Text } from 'react-native';

import { Button } from '@/shared/ui/Button';

type ErrorStateProps = {
  message: string;
  actionLabel?: string;
  onRetry?: () => void;
};

export function ErrorState({ message, actionLabel = 'Try again', onRetry }: ErrorStateProps) {
  return (
    <View className="items-center rounded-2xl border border-danger/30 bg-danger/10 px-6 py-8">
      <Text className="mb-4 text-center text-base text-white">{message}</Text>
      {onRetry ? <Button label={actionLabel} variant="secondary" onPress={onRetry} /> : null}
    </View>
  );
}

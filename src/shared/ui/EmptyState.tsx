import { View, Text } from 'react-native';

import { Button } from '@/shared/ui/Button';

type EmptyStateProps = {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function EmptyState({ title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <View className="items-center justify-center rounded-2xl border border-dashed border-border bg-surface/50 px-6 py-12">
      <Text className="mb-2 text-center text-lg font-medium text-white">{title}</Text>
      <Text className="mb-6 text-center text-sm leading-5 text-muted">{description}</Text>
      {actionLabel && onAction ? (
        <Button label={actionLabel} variant="secondary" onPress={onAction} />
      ) : null}
    </View>
  );
}

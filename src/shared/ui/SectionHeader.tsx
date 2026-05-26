import { Pressable, Text, View } from 'react-native';

type SectionHeaderProps = {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function SectionHeader({ title, actionLabel, onAction }: SectionHeaderProps) {
  return (
    <View className="mb-4 flex-row items-center justify-between">
      <Text className="text-sm font-semibold uppercase tracking-widest text-muted">{title}</Text>
      {actionLabel && onAction ? (
        <Pressable onPress={onAction}>
          <Text className="text-sm font-medium text-accent">{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

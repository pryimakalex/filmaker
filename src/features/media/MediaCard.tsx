import { Image, Pressable, Text, View } from 'react-native';

import { Card } from '@/shared/ui/Card';

type Props = {
  title: string;
  thumbnailUrl?: string;
};

export function MediaCard({ title, thumbnailUrl }: Props) {
  return (
    <Pressable className="w-40">
      <Card className="gap-2 p-3">
        <View className="h-20 overflow-hidden rounded-lg bg-surface-elevated">
          {thumbnailUrl ? (
            <Image source={{ uri: thumbnailUrl }} className="h-full w-full" resizeMode="cover" />
          ) : (
            <View className="h-full items-center justify-center">
              <Text className="text-xl text-accent/50">▶</Text>
            </View>
          )}
        </View>
        <Text className="text-sm text-white" numberOfLines={1}>
          {title}
        </Text>
      </Card>
    </Pressable>
  );
}

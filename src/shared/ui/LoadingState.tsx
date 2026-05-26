import { View, Text, ActivityIndicator } from 'react-native';

type LoadingStateProps = {
  message?: string;
};

export function LoadingState({ message = 'Loading…' }: LoadingStateProps) {
  return (
    <View className="flex-1 items-center justify-center bg-canvas px-6">
      <ActivityIndicator color="#C9A962" size="large" />
      <Text className="mt-4 text-base text-muted">{message}</Text>
    </View>
  );
}

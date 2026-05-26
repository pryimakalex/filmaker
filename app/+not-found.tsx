import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not found' }} />
      <View className="flex-1 items-center justify-center bg-canvas px-6">
        <Text className="mb-4 text-xl font-semibold text-white">This screen does not exist.</Text>
        <Link href="/">
          <Text className="text-base text-accent">Back to home</Text>
        </Link>
      </View>
    </>
  );
}

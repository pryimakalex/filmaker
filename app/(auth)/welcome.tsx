import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { routes } from '@/shared/constants/routes';
import { colors } from '@/shared/constants/colors';
import { Button } from '@/shared/ui/Button';

export default function WelcomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-canvas">
      <LinearGradient
        colors={[colors.canvas, colors.surface, colors.canvas]}
        className="flex-1 justify-between px-6 py-8"
      >
        <View className="gap-4 pt-8">
          <Text className="text-xs uppercase tracking-[0.3em] text-accent">Filmfolio</Text>
          <Text className="text-3xl font-semibold leading-tight text-white">
            Director portfolio prototype
          </Text>
          <Text className="text-base leading-6 text-muted">
            Mobile spike — auth, projects, portfolio preview, mock upload.
          </Text>
        </View>

        <View className="gap-3 pb-4">
          <Link href={routes.signUp} asChild>
            <Button label="Get started" />
          </Link>
          <Link href={routes.signIn} asChild>
            <Button label="Sign in" variant="secondary" />
          </Link>
          <Text className="pt-2 text-center text-xs text-muted">demo@filmfolio.app / demo123</Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

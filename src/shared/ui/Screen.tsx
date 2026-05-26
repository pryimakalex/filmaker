import { ScrollView, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { cn } from '@/shared/utils/cn';

type ScreenProps = {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  scroll?: boolean;
  className?: string;
  headerAction?: React.ReactNode;
};

export function Screen({
  title,
  subtitle,
  children,
  scroll = true,
  className,
  headerAction,
}: ScreenProps) {
  const content = (
    <View className={cn('flex-1 px-5 pb-8', className)}>
      {(title || subtitle || headerAction) && (
        <View className="mb-6 flex-row items-start justify-between gap-4 pt-2">
          <View className="flex-1 gap-1">
            {title ? <Text className="text-2xl font-semibold text-white">{title}</Text> : null}
            {subtitle ? <Text className="text-base text-muted">{subtitle}</Text> : null}
          </View>
          {headerAction}
        </View>
      )}
      {children}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-canvas" edges={['top']}>
      {scroll ? (
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {content}
        </ScrollView>
      ) : (
        content
      )}
    </SafeAreaView>
  );
}

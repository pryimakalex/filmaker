import { TextInput, TextInputProps, View, Text } from 'react-native';

import { cn } from '@/shared/utils/cn';

type TextFieldProps = TextInputProps & {
  label?: string;
  error?: string;
  containerClassName?: string;
};

export function TextField({
  label,
  error,
  containerClassName,
  className,
  ...props
}: TextFieldProps) {
  return (
    <View className={cn('gap-2', containerClassName)}>
      {label ? <Text className="text-sm font-medium text-muted">{label}</Text> : null}
      <TextInput
        placeholderTextColor="#5C5C66"
        className={cn(
          'rounded-xl border border-border bg-surface px-4 py-3.5 text-base text-white',
          error && 'border-danger',
          className,
        )}
        {...props}
      />
      {error ? <Text className="text-sm text-danger">{error}</Text> : null}
    </View>
  );
}

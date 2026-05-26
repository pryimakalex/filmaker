import { Pressable, PressableProps, Text, ActivityIndicator } from 'react-native';

import { cn } from '@/shared/utils/cn';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = PressableProps & {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  className?: string;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-accent active:bg-accent-muted',
  secondary: 'bg-surface-elevated border border-border active:opacity-80',
  ghost: 'bg-transparent active:bg-surface-elevated',
  danger: 'bg-danger/20 border border-danger/40 active:opacity-80',
};

const textStyles: Record<ButtonVariant, string> = {
  primary: 'text-canvas font-semibold',
  secondary: 'text-white font-medium',
  ghost: 'text-muted font-medium',
  danger: 'text-danger font-medium',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-2 rounded-lg',
  md: 'px-4 py-3 rounded-xl',
  lg: 'px-5 py-4 rounded-xl',
};

const textSizeStyles: Record<ButtonSize, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-base',
};

export function Button({
  label,
  variant = 'primary',
  size = 'md',
  loading,
  disabled,
  className,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      className={cn(
        'items-center justify-center',
        variantStyles[variant],
        sizeStyles[size],
        isDisabled && 'opacity-50',
        className,
      )}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#0A0A0B' : '#C9A962'} />
      ) : (
        <Text className={cn(textStyles[variant], textSizeStyles[size])}>{label}</Text>
      )}
    </Pressable>
  );
}

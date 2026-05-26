import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';

import { useAuth } from '@/features/auth/hooks/useAuth';
import { routes } from '@/shared/constants/routes';
import { Button } from '@/shared/ui/Button';
import { TextField } from '@/shared/ui/TextField';

export function SignInForm() {
  const { signIn } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('demo@filmfolio.app');
  const [password, setPassword] = useState('demo123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    setLoading(true);
    setError('');

    try {
      await signIn(email.trim(), password);
      router.replace(routes.home);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to sign in');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className="gap-5">
      <TextField
        label="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        autoComplete="email"
        value={email}
        onChangeText={setEmail}
        placeholder="demo@filmfolio.app"
      />
      <TextField
        label="Password"
        secureTextEntry
        autoComplete="password"
        value={password}
        onChangeText={setPassword}
        placeholder="At least 6 characters"
      />

      <Text className="text-xs leading-5 text-muted">
        Demo account: demo@filmfolio.app / demo123 — loads a pre-filled director portfolio.
      </Text>

      {error ? <Text className="text-sm text-danger">{error}</Text> : null}

      <Button
        label="Sign in"
        loading={loading}
        disabled={!email || !password}
        onPress={handleSignIn}
      />

      <Text className="text-center text-sm text-muted">
        New here?{' '}
        <Link href={routes.signUp} className="font-medium text-accent">
          Create an account
        </Link>
      </Text>
    </View>
  );
}

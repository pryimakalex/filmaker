import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';

import { useAuth } from '@/features/auth/hooks/useAuth';
import { routes } from '@/shared/constants/routes';
import { Button } from '@/shared/ui/Button';
import { TextField } from '@/shared/ui/TextField';

export function SignUpForm() {
  const { signUp } = useAuth();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignUp() {
    setLoading(true);
    setError('');

    try {
      await signUp(name, email, password);
      router.replace(routes.home);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to create account');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className="gap-5">
      <TextField
        label="Full name"
        value={name}
        onChangeText={setName}
        autoComplete="name"
        placeholder="Alex Rivera"
      />
      <TextField
        label="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        autoComplete="email"
        value={email}
        onChangeText={setEmail}
        placeholder="you@studio.com"
      />
      <TextField
        label="Password"
        secureTextEntry
        autoComplete="new-password"
        value={password}
        onChangeText={setPassword}
        placeholder="At least 6 characters"
      />

      {error ? <Text className="text-sm text-danger">{error}</Text> : null}

      <Button
        label="Create account"
        loading={loading}
        disabled={!name || !email || !password}
        onPress={handleSignUp}
      />

      <Text className="text-center text-sm text-muted">
        Already have an account?{' '}
        <Link href={routes.signIn} className="font-medium text-accent">
          Sign in
        </Link>
      </Text>
    </View>
  );
}

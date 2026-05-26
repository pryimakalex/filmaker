import { SignInForm } from '@/features/auth/components/SignInForm';
import { Screen } from '@/shared/ui/Screen';

export default function SignInScreen() {
  return (
    <Screen title="Sign in" subtitle="Mock auth for the prototype.">
      <SignInForm />
    </Screen>
  );
}

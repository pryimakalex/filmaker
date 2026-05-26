import { SignUpForm } from '@/features/auth/components/SignUpForm';
import { Screen } from '@/shared/ui/Screen';

export default function SignUpScreen() {
  return (
    <Screen title="Sign up" subtitle="Creates a mock session — no real backend.">
      <SignUpForm />
    </Screen>
  );
}

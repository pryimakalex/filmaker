import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { authService } from '@/services/api/auth.service';
import type { AuthUser } from '@/types/common';

type AuthContextValue = {
  user: AuthUser | null;
  isLoaded: boolean;
  isSignedIn: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    void authService.bootstrapSessionDelay().then(() => setIsLoaded(true));
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const authUser = await authService.signIn(email, password);
    setUser(authUser);
  }, []);

  const signUp = useCallback(async (name: string, email: string, password: string) => {
    const authUser = await authService.signUp(name, email, password);
    setUser(authUser);
  }, []);

  const signOut = useCallback(async () => {
    await authService.signOut();
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoaded,
      isSignedIn: Boolean(user),
      signIn,
      signUp,
      signOut,
    }),
    [user, isLoaded, signIn, signUp, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

export function useUser() {
  const { user, isLoaded } = useAuth();
  return { user, isLoaded };
}

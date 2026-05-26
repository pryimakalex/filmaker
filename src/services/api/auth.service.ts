import { DEMO_USER_ID } from '@/services/mocks/mockData';
import { inMemoryStore, setCurrentUserId } from '@/services/mocks/inMemoryStore';
import { delay, mockNetworkDelay } from '@/services/mocks/mockDelay';
import type { AuthUser } from '@/types/common';

let currentUser: AuthUser | null = null;

function buildUser(id: string, email: string, name: string): AuthUser {
  const firstName = name.split(' ')[0] || 'Director';
  return { id, email, firstName, fullName: name };
}

// Mocked for the prototype; replace with Clerk session state later.
export const authService = {
  async bootstrapSessionDelay() {
    await delay(300);
  },

  getCurrentUser() {
    return currentUser;
  },

  async signIn(email: string, password: string): Promise<AuthUser> {
    await mockNetworkDelay(400, 600);

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters.');
    }

    const normalizedEmail = email.trim().toLowerCase();
    const isDemoAccount = normalizedEmail === 'demo@filmfolio.app';
    const user = isDemoAccount
      ? buildUser(DEMO_USER_ID, normalizedEmail, 'Alex Rivera')
      : buildUser(`user_${normalizedEmail}`, normalizedEmail, normalizedEmail.split('@')[0]);

    setCurrentUserId(user.id);
    currentUser = user;

    if (!isDemoAccount && !inMemoryStore.getDirectorProfile()) {
      inMemoryStore.upsertDirectorProfile({ name: user.fullName });
    }

    return user;
  },

  async signUp(name: string, email: string, password: string): Promise<AuthUser> {
    await mockNetworkDelay(500, 700);

    const trimmedName = name.trim();
    if (!trimmedName) throw new Error('Name is required.');
    if (password.length < 6) throw new Error('Password must be at least 6 characters.');

    const user = buildUser(`user_${Date.now()}`, email.trim().toLowerCase(), trimmedName);
    setCurrentUserId(user.id);
    currentUser = user;
    inMemoryStore.upsertDirectorProfile({ name: trimmedName });
    return user;
  },

  async signOut() {
    await delay(200);
    setCurrentUserId(null);
    currentUser = null;
  },
};

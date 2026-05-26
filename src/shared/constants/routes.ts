export const routes = {
  welcome: '/(auth)/welcome',
  signIn: '/(auth)/sign-in',
  signUp: '/(auth)/sign-up',
  home: '/(tabs)',
  portfolio: '/(tabs)/portfolio',
  projects: '/(tabs)/projects',
  upload: '/(tabs)/upload',
  profile: '/(tabs)/profile',
  project: (id: string) => `/project/${id}` as const,
} as const;

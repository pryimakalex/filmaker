import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Filmfolio',
  slug: 'filmaker',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'filmaker',
  userInterfaceStyle: 'dark',
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'app.filmfolio.mobile',
  },
  android: {
    adaptiveIcon: {
      backgroundColor: '#0A0A0B',
      foregroundImage: './assets/images/android-icon-foreground.png',
      backgroundImage: './assets/images/android-icon-background.png',
      monochromeImage: './assets/images/android-icon-monochrome.png',
    },
    package: 'app.filmfolio.mobile',
    predictiveBackGestureEnabled: false,
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    'expo-router',
    [
      'expo-splash-screen',
      {
        image: './assets/images/splash-icon.png',
        resizeMode: 'contain',
        backgroundColor: '#0A0A0B',
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    portfolioBaseUrl: process.env.EXPO_PUBLIC_PORTFOLIO_BASE_URL ?? 'https://filmfolio.app',
  },
});

import Constants from 'expo-constants';

type AppExtra = {
  portfolioBaseUrl?: string;
};

const extra = (Constants.expoConfig?.extra ?? {}) as AppExtra;

export const env = {
  portfolioBaseUrl:
    extra.portfolioBaseUrl ?? process.env.EXPO_PUBLIC_PORTFOLIO_BASE_URL ?? 'https://filmfolio.app',
};

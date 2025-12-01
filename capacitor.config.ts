import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.travelia.app',
  appName: 'TravelIA',
  webDir: './dist',
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '360414482088-rtp2h0ao33g08ovo4fa2q6rk0c2n1aos.apps.googleusercontent.com', 
      forceCodeForRefreshToken: true,
    },
  },
};

export default config;
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.aquaharvest.app',
  appName: 'Aqua Harvest Hub',
  webDir: 'dist/client',   // can be any folder, but it won't be used because server.url overrides
  server: {
    url: 'https://aqua-harvest-hub-main.vercel.app', // for development, we will proxy to this URL where the client is hosted
    androidScheme: 'https',
  },
};

export default config;
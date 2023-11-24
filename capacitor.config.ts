import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'nombre-del-proyecto',
  webDir: 'src',
  server: {
    androidScheme: 'https'
  }
};

export default config;

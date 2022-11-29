import { initializeApp } from 'firebase/app';
import { CapacitorConfig } from '@capacitor/cli';

export const environment = {
  firebase: {
    apiKey: "AIzaSyCBhFZe-AgTC7e_CsFU3Yzha9tGwmBJIVA",
    authDomain: "juegok-db2c8.firebaseapp.com",
    projectId: "juegok-db2c8",
    storageBucket: "juegok-db2c8.appspot.com",
    messagingSenderId: "263134273947",
    appId: "1:263134273947:web:0cf63295ffff6547afc13e"
  },
  production: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: '#ffffffff',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: true,
      androidSpinnerStyle: 'large',
      iosSpinnerStyle: 'small',
      spinnerColor: '#999999',
      splashFullScreen: true,
      splashImmersive: true,
      layoutName: 'launch_screen',
      useDialog: true,
    },
  },
};

// Initialize Firebase
const app = initializeApp(environment.firebase);

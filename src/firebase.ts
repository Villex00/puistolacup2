import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAYV4CvwvaUx_d7Yb7yOzetgGeJaKhNtEs",
  authDomain: "puistolacup-24d85.firebaseapp.com",
  databaseURL: "https://puistolacup-24d85-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "puistolacup-24d85",
  appId: "1:617070161703:web:593b633b4bea4b75da8302"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
export const rtdb = getDatabase(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiOOQMUmGPH4ip-1Xey-01QP30cmAphio",
  authDomain: "lung-health-tracker.firebaseapp.com",
  projectId: "lung-health-tracker",
  storageBucket: "lung-health-tracker.appspot.com",
  messagingSenderId: "1096543617786",
  appId: "1:1096543617786:web:b666a5e07ff5884b2dff43",
  measurementId: "G-94B2DJHY2X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };


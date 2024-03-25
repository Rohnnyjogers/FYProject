
import { initializeApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from "firebase/auth";
import { getDatabase } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Firebase product library
// https://firebase.google.com/docs/web/setup#available-libraries

// App's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZSjspGldg6xTJPuuA2c0D4qOpGUA-2OA",
  authDomain: "fyproject-54d28.firebaseapp.com",
  projectId: "fyproject-54d28",
  storageBucket: "fyproject-54d28.appspot.com",
  messagingSenderId: "865359060011",
  appId: "1:865359060011:web:0f035dfdbc4de2d58a1e6e",
  measurementId: "G-EWX2YV9ZL7"
};

export const app = initializeApp(firebaseConfig);
export const initAuth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
export const auth = getAuth(app);
export const database = getDatabase(app); 
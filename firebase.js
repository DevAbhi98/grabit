// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDq3KPh86eRWocSTtAPw1BqUrU7hyF1cII",
  authDomain: "grabit-34a23.firebaseapp.com",
  databaseURL: "https://grabit-34a23-default-rtdb.firebaseio.com",
  projectId: "grabit-34a23",
  storageBucket: "grabit-34a23.appspot.com",
  messagingSenderId: "337761806329",
  appId: "1:337761806329:web:22b328645d321076daff28",
  measurementId: "G-WRCJG2JMW3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const database = getDatabase(
  app,
  "https://grabit-34a23-default-rtdb.firebaseio.com/"
);

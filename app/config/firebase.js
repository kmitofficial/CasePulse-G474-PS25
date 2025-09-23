// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAL8kzBVyVkDgnmpGYt4NMCQYGSkm5GEtg",
  authDomain: "casebridge-8d65e.firebaseapp.com",
  projectId: "casebridge-8d65e",
  storageBucket: "casebridge-8d65e.firebasestorage.app",
  messagingSenderId: "713304846545",
  appId: "1:713304846545:web:2cf52fdcd814dd0034d5f0",
  measurementId: "G-FB0M7KF5V3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const auth=getAuth(app);
export const googleProvider =new GoogleAuthProvider();
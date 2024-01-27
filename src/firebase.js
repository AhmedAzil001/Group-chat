import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD9A6KM5LUUv9e6Obbt6Y5pwdj15hVF-PI",
  authDomain: "azil-chat.firebaseapp.com",
  projectId: "azil-chat",
  storageBucket: "azil-chat.appspot.com",
  messagingSenderId: "852555111336",
  appId: "1:852555111336:web:0bf8586d6469e1f6285b9d"
};

export const app = initializeApp(firebaseConfig);
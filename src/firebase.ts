// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8g9wV8xEfdkLWNE0a3Yc96IaGv1XnGIo",
  authDomain: "vktest-4bbb6.firebaseapp.com",
  projectId: "vktest-4bbb6",
  storageBucket: "vktest-4bbb6.appspot.com",
  messagingSenderId: "743344934059",
  appId: "1:743344934059:web:28e09b8a9da196f43ebbee",
  measurementId: "G-ZP5TP900QT"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
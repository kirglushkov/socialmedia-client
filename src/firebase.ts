// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbxjcShsFlQn-Dp5TCI2F4DS86OYOAmqM",
  authDomain: "imagestore-14f4d.firebaseapp.com",
  projectId: "imagestore-14f4d",
  storageBucket: "imagestore-14f4d.appspot.com",
  messagingSenderId: "206520643436",
  appId: "1:206520643436:web:916789c1cf76ff3a0e0d49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
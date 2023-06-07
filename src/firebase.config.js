// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRxQNg96ZUFJCH19ht6eFmSw31DXWJBx4",
  authDomain: "summer-camp-bdccd.firebaseapp.com",
  projectId: "summer-camp-bdccd",
  storageBucket: "summer-camp-bdccd.appspot.com",
  messagingSenderId: "840385266835",
  appId: "1:840385266835:web:9fc58e088ff97102d03966"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
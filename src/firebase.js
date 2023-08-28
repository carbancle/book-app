// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6kTbT8VchtioTrZ8zyoiz-m5aMkm3FsM",
  authDomain: "book-app-cec72.firebaseapp.com",
  projectId: "book-app-cec72",
  storageBucket: "book-app-cec72.appspot.com",
  messagingSenderId: "85316365352",
  appId: "1:85316365352:web:73fa4bb8b4d92a4a5cd91d",
  measurementId: "G-SYZ0FHFCGB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// db 연동을 위해 기본 정보 이외에 추가하는 내용
const db = getFirestore(app);

const storage = getStorage(app);

const auth = getAuth(app);

export { db, storage, auth };

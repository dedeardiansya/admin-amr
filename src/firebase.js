import { initializeApp } from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC_0xjo54L3LvipgK-cuF6y2jUUQPKnkBg",
  authDomain: "admin-amr.firebaseapp.com",
  databaseURL:
    "https://admin-amr-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "admin-amr",
  storageBucket: "admin-amr.appspot.com",
  messagingSenderId: "561610805576",
  appId: "1:561610805576:web:88142389de6af6ec13637d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;

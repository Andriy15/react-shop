import { initializeApp } from "firebase/app";
import 'firebase/auth'
import { GoogleAuthProvider } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";



const firebaseConfig = {
  apiKey: "AIzaSyAPZr_PaAxylnmM-yMngcq3e-_SsJrtSEg",
  authDomain: "react-shop-auth.firebaseapp.com",
  projectId: "react-shop-auth",
  storageBucket: "react-shop-auth.appspot.com",
  messagingSenderId: "440691355036",
  appId: "1:440691355036:web:bc6a1136e245055dffac59",
  measurementId: "G-73KRHT19DQ"
};

export const app = initializeApp(firebaseConfig);
export const googleAuthProvider = new GoogleAuthProvider()
// const analytics = getAnalytics(app)

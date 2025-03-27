import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyD_qrtPCTDK0rqGu8YREUKdJ4jMk4PSS_8",
  authDomain: "controlefinanceiro-dev.firebaseapp.com",
  projectId: "controlefinanceiro-dev",
  storageBucket: "controlefinanceiro-dev.firebasestorage.app",
  messagingSenderId: "97736649485",
  appId: "1:97736649485:web:67b2595fc22ca730379e44"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }
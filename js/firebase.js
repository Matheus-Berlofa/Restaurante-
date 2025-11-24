import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAoNt8GLu-6kg8iezNW45UMxVKNUH1y3KM",
  authDomain: "restaurante-b7b3b.firebaseapp.com",
  projectId: "restaurante-b7b3b",
  storageBucket: "restaurante-b7b3b.firebasestorage.app",
  messagingSenderId: "736095610672",
  appId: "1:736095610672:web:bf1e7e27653a0b2cd24af5",
  measurementId: "G-E96TVPVD1C"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

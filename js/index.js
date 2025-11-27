import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAoNt8GLu-6kg8iezNW45UMxVKNUH1y3KM",
  authDomain: "restaurante-b7b3b.firebaseapp.com",
  projectId: "restaurante-b7b3b",
  storageBucket: "restaurante-b7b3b.firebasestorage.app",
  messagingSenderId: "736095610672",
  appId: "1:736095610672:web:bf1e7e27653a0b2cd24af5",
  measurementId: "G-E96TVPVD1C"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const btnLogin = document.getElementById("btnLogin");
const btnMeusAgendamentos = document.getElementById("btnMeusAgendamentos");

// detecta se ta logado
onAuthStateChanged(auth, (user) => {
  if (user) {
    // meus agendamentos e login
    btnLogin.style.display = "none";
    btnMeusAgendamentos.style.display = "inline-block";
  } else {
    // login e meus agendamentos
    btnLogin.style.display = "inline-block";
    btnMeusAgendamentos.style.display = "none";
  }
});

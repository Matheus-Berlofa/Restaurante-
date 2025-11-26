// Importando Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

// Config Firebase (MESMA que você já usa nos outros scripts)
const firebaseConfig = {
  apiKey: "AIzaSyAoNt8GLu-6kg8iezNW45UMxVKNUH1y3KM",
  authDomain: "restaurante-b7b3b.firebaseapp.com",
  projectId: "restaurante-b7b3b",
  storageBucket: "restaurante-b7b3b.firebasestorage.app",
  messagingSenderId: "736095610672",
  appId: "1:736095610672:web:bf1e7e27653a0b2cd24af5",
  measurementId: "G-E96TVPVD1C"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Elementos do HTML
const btnLogin = document.getElementById("btnLogin");
const btnMeusAgendamentos = document.getElementById("btnMeusAgendamentos");

// Detecta usuário logado
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Usuário logado → mostra "Meus agendamentos" e esconde "Login"
    btnLogin.style.display = "none";
    btnMeusAgendamentos.style.display = "inline-block";
  } else {
    // Não logado → mostra "Login" e esconde "Meus Agendamentos"
    btnLogin.style.display = "inline-block";
    btnMeusAgendamentos.style.display = "none";
  }
});

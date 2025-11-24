import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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

document.getElementById("btnCadastrar").addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    try {
        await createUserWithEmailAndPassword(auth, email, senha);
        alert("Cadastro realizado com sucesso!");
        window.location.href = "login.html";
    } catch (error) {
        console.error(error);
        alert("Erro: " + error.message);
    }
});

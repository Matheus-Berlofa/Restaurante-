import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  doc, setDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


// LOGIN
const loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
  loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      window.location.href = "agenda.html";
    } catch (error) {
      alert("Erro ao fazer login: " + error.message);
    }
  });
}


// CADASTRO
const cadBtn = document.getElementById("cadBtn");
if (cadBtn) {
  cadBtn.addEventListener("click", async () => {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, senha);

      await setDoc(doc(db, "usuarios", cred.user.uid), {
        nome,
        email
      });

      alert("Conta criada com sucesso!");
      window.location.href = "index.html";

    } catch (error) {
      alert("Erro: " + error.message);
    }
  });
}

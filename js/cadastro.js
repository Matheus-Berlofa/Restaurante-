// js/cadastro.js
import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword, updateProfile } 
  from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { doc, setDoc } 
  from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

window.onload = () => {
  const btnCadastrar = document.getElementById("btnCadastrar");

  btnCadastrar.addEventListener("click", async () => {
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const confirmarSenha = document.getElementById("confirmarSenha").value.trim();

    if (!nome || !email || !senha || !confirmarSenha) {
      alert("Preencha todos os campos!");
      return;
    }
    if (senha.length < 6) {
      alert("A senha deve ter no mínimo 6 caracteres.");
      return;
    }
    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      // Atualiza displayName no Auth (isso faz user.displayName aparecer)
      await updateProfile(user, { displayName: nome });

      // Também salva no Firestore (coleção 'usuarios')
      await setDoc(doc(db, "usuarios", user.uid), {
        nome,
        email,
        criadoEm: new Date()
      });

      alert("Cadastro realizado com sucesso!");
      window.location.href = "login.html";

    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar: " + error.message);
    }
  });
};

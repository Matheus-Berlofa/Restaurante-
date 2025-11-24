import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

window.onload = () => {

  const btnCadastrar = document.getElementById("btnCadastrar");

  btnCadastrar.addEventListener("click", async () => {
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const confirmarSenha = document.getElementById("confirmarSenha").value.trim();

    // validações básicas
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
      // cria usuário no Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      // salva o nome no Firestore
      await setDoc(doc(db, "usuarios", user.uid), {
        nome: nome,
        email: email
      });

      alert("Cadastro realizado com sucesso!");
      window.location.href = "login.html";

    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar: " + error.message);
    }
  });

};

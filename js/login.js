import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

window.onload = () => {

  const btnLogin = document.getElementById("btnLogin");

  btnLogin.addEventListener("click", async () => {
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    if (!email || !senha) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, senha);

      alert("Login realizado com sucesso!");
      window.location.href = "index.html";

    } catch (error) {
      console.error(error);

      if (error.code === "auth/invalid-credential") {
        alert("E-mail ou senha incorretos.");
      } else if (error.code === "auth/user-not-found") {
        alert("Usuário não encontrado.");
      } else if (error.code === "auth/wrong-password") {
        alert("Senha incorreta.");
      } else if (error.code === "auth/network-request-failed") {
        alert("Erro de conexão. Verifique sua internet ou rode o site via localhost.");
      } else {
        alert("Erro ao fazer login: " + error.message);
      }
    }
  });

};

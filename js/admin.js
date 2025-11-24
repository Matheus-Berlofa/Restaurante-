import { auth } from "./firebase.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

window.onload = () => {

  const bemVindo = document.getElementById("bemVindo");
  const btnLogout = document.getElementById("btnLogout");

  // Verifica se o usuário está logado
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      // não logado → volta pro login
      window.location.href = "login.html";
      return;
    }

    bemVindo.textContent = `Bem-vindo, ${user.email}!`;
  });

  // Logout
  btnLogout.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "login.html";
  });

};

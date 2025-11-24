import { app, db, auth } from "./firebase.js";
import { 
  createUserWithEmailAndPassword,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

document.getElementById("cadastroBtn").addEventListener("click", async () => {
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value;
  const confirmarSenha = document.getElementById("confirmarSenha").value;

  if (!nome || !email || !senha || !confirmarSenha) {
    alert("Preencha todos os campos!");
    return;
  }

  if (senha !== confirmarSenha) {
    alert("As senhas não coincidem!");
    return;
  }

  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, senha);

    // Atualiza nome do usuário
    await updateProfile(userCred.user, { displayName: nome });

    // Salva no Firestore
    await setDoc(doc(db, "usuarios", userCred.user.uid), {
      nome: nome,
      email: email,
      criadoEm: new Date()
    });

    alert("Cadastro realizado com sucesso!");
    window.location.href = "agenda.html";

  } catch (erro) {
    console.log(erro);
    alert("Erro ao cadastrar: " + erro.message);
  }
});


// js/agenda.js
import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { doc, getDoc, collection, addDoc, query, where, getDocs } 
  from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

let horarioSelecionado = "";
let mesaSelecionada = "";

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  // tenta pegar displayName do Auth primeiro
  let nomeParaExibir = user.displayName;

  // se não existir, busca no Firestore (coleção 'usuarios')
  if (!nomeParaExibir) {
    try {
      const userDocRef = doc(db, "usuarios", user.uid);
      const userSnap = await getDoc(userDocRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        nomeParaExibir = data.nome || "";
      }
    } catch (err) {
      console.error("Erro ao buscar nome no Firestore:", err);
    }
  }

  document.getElementById("nomeUsuario").innerText = nomeParaExibir || "Usuário";
  document.getElementById("emailUsuario").innerText = user.email;
});

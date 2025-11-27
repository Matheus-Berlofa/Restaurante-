import { auth, db } from "./firebase.js";
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

// Verifica login
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  document.getElementById("userEmail").innerText = "Bem-vindo, " + user.email + "!";

  carregarReservas();
});

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  signOut(auth);
});

// Função principal
async function carregarReservas() {
  const hojeLista = document.getElementById("listaHoje");
  const amanhaLista = document.getElementById("listaAmanha");
  const proximosLista = document.getElementById("listaProximos");

  hojeLista.innerHTML = "";
  amanhaLista.innerHTML = "";
  proximosLista.innerHTML = "";

  const snap = await getDocs(collection(db, "reservas"));

  const hoje = new Date();
  const amanha = new Date();
  amanha.setDate(hoje.getDate() + 1);

  function formatar(d) {
    return d.toISOString().split("T")[0];
  }

  const hojeStr = formatar(hoje);
  const amanhaStr = formatar(amanha);

  snap.forEach((docSnap) => {
    const r = docSnap.data();

    const caixa = document.createElement("div");
    caixa.classList.add("reserva-box");

    caixa.innerHTML = `
      <strong>Nome:</strong> ${r.nome}
      <strong>Email:</strong> ${r.email}
      <strong>Data:</strong> ${r.data}
      <strong>Hora:</strong> ${r.horario}
      <strong>Mesa:</strong> ${r.mesa}
      <strong>Pessoas:</strong> ${r.quantidade}
      <button class="delete-btn" data-id="${docSnap.id}">Excluir</button>
    `;

    if (r.data === hojeStr) {
      hojeLista.appendChild(caixa);
    } else if (r.data === amanhaStr) {
      amanhaLista.appendChild(caixa);
    } else {
      proximosLista.appendChild(caixa);
    }
  });

  // Botões de exclusão
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.getAttribute("data-id");

      if (confirm("Tem certeza que deseja excluir esta reserva?")) {
        await deleteDoc(doc(db, "reservas", id));
        carregarReservas();
      }
    });
  });
}

// admin.js
import { auth, db } from "./firebase.js";
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

import {
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

// ===============================
// 1. Verifica login
// ===============================
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  document.getElementById("emailAdmin").innerText = user.email;

  carregarReservas();
});

// ===============================
// 2. Carregar reservas
// ===============================
async function carregarReservas() {
  const lista = document.getElementById("listaReservas");
  lista.innerHTML = "Carregando...";

  try {
    const reservasRef = collection(db, "reservas");

    const q = query(reservasRef, orderBy("criadoEm", "desc"));

    const snap = await getDocs(q);

    if (snap.empty) {
      lista.innerHTML = "<p>Nenhuma reserva encontrada.</p>";
      return;
    }

    lista.innerHTML = "";

    snap.forEach(doc => {
      const r = doc.data();

      const item = document.createElement("div");
      item.classList.add("reserva-item");
      item.innerHTML = `
        <p><strong>Nome:</strong> ${r.nome}</p>
        <p><strong>Email:</strong> ${r.email}</p>
        <p><strong>Data:</strong> ${r.data}</p>
        <p><strong>Hora:</strong> ${r.horario}</p>
        <p><strong>Mesa:</strong> ${r.mesa}</p>
        <p><strong>Pessoas:</strong> ${r.quantidade}</p>
        <hr>
      `;
      lista.appendChild(item);
    });

  } catch (err) {
    console.error("Erro:", err);
    lista.innerHTML = "<p>Erro ao carregar reservas.</p>";
  }
}

// ===============================
// 3. Botão sair
// ===============================
document.getElementById("btnLogout").addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "login.html";
});

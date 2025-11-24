import { auth, db } from "./firebase.js";
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

import {
  collection, query, where, getDocs, doc, deleteDoc
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

const listaReservas = document.getElementById("listaReservas");
const mensagem = document.getElementById("mensagem");

// Verifica login
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  carregarReservas(user.uid);
});

// Carrega reservas do usuário
async function carregarReservas(uid) {
  listaReservas.innerHTML = "<p>Carregando...</p>";

  const q = query(
    collection(db, "reservas"),
    where("uid", "==", uid)
  );

  const snap = await getDocs(q);

  listaReservas.innerHTML = "";

  if (snap.empty) {
    listaReservas.innerHTML = "<p>Você não possui reservas.</p>";
    return;
  }

  snap.forEach((docItem) => {
    const dados = docItem.data();

    const card = document.createElement("div");
    card.className = "reserva-card";

    card.innerHTML = `
      <p><strong>Data:</strong> ${dados.data}</p>
      <p><strong>Horário:</strong> ${dados.horario}</p>
      <p><strong>Mesa:</strong> ${dados.mesa}</p>
      <p><strong>Pessoas:</strong> ${dados.quantidade}</p>
      <button class="btn-cancelar" data-id="${docItem.id}">
        Cancelar Reserva
      </button>
    `;

    listaReservas.appendChild(card);
  });

  // Botões de cancelar
  document.querySelectorAll(".btn-cancelar").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.getAttribute("data-id");

      try {
        await deleteDoc(doc(db, "reservas", id));
        mensagem.textContent = "Reserva cancelada!";
        mensagem.style.color = "green";

        // Atualiza a lista
        carregarReservas(auth.currentUser.uid);

      } catch (error) {
        console.error(error);
        mensagem.textContent = "Erro ao cancelar!";
        mensagem.style.color = "red";
      }
    });
  });

}

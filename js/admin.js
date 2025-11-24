import { db, auth } from "./firebase.js";
import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const lista = document.getElementById("listaReservas");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  carregarReservas();
});

async function carregarReservas() {
  lista.innerHTML = "Carregando reservas...";

  const snap = await getDocs(collection(db, "reservas"));

  if (snap.empty) {
    lista.innerHTML = "<p>Nenhuma reserva encontrada.</p>";
    return;
  }

  lista.innerHTML = "";

  snap.forEach((reserva) => {
    const r = reserva.data();

    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <strong>Nome:</strong> ${r.nome}<br>
      <strong>Email:</strong> ${r.email}<br>
      <strong>Data:</strong> ${r.data}<br>
      <strong>Horário:</strong> ${r.horario}<br>
      <strong>Mesa:</strong> ${r.mesa}<br>
      <strong>Quantidade:</strong> ${r.quantidade}<br>
      <button class="btnExcluir" data-id="${reserva.id}">Excluir</button>
    `;

    lista.appendChild(card);
  });

  document.querySelectorAll(".btnExcluir").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.getAttribute("data-id");
      await deleteDoc(doc(db, "reservas", id));
      alert("Reserva excluída!");
      carregarReservas();
    });
  });
}

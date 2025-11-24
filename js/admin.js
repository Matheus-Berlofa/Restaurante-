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

const listaDiv = document.getElementById("listaReservas");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  carregarReservas();
});

async function carregarReservas() {
  listaDiv.innerHTML = "<p>Carregando reservas...</p>";

  const querySnapshot = await getDocs(collection(db, "reservas"));

  if (querySnapshot.empty) {
    listaDiv.innerHTML = "<p>Nenhuma reserva encontrada.</p>";
    return;
  }

  listaDiv.innerHTML = "";

  querySnapshot.forEach((docSnap) => {
    const dados = docSnap.data();

    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <strong>Nome:</strong> ${dados.nome} <br>
      <strong>Email:</strong> ${dados.email} <br>
      <strong>Data:</strong> ${dados.data} <br>
      <strong>Horário:</strong> ${dados.horario} <br>
      <strong>Mesa:</strong> ${dados.mesa} <br>
      <strong>Quantidade:</strong> ${dados.quantidade} <br>
      <button class="btnExcluir" data-id="${docSnap.id}">Excluir</button>
    `;

    listaDiv.appendChild(card);
  });

  document.querySelectorAll(".btnExcluir").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.getAttribute("data-id");
      await deleteDoc(doc(db, "reservas", id));
      alert("Reserva excluída!");
      carregarReservas(); // recarrega
    });
  });
}

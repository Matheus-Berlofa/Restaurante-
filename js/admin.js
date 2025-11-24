import { db } from "./firebase.js";
import {
  collection, getDocs, deleteDoc, doc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

async function carregar() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  const snap = await getDocs(collection(db, "agendamentos"));

  snap.forEach((d) => {
    const ag = d.data();

    lista.innerHTML += `
      <div class="card">
        <p><b>Data:</b> ${ag.data}</p>
        <p><b>Hora:</b> ${ag.hora}</p>
        <p><b>Pessoas:</b> ${ag.pessoas}</p>

        <button onclick="excluir('${d.id}')">Excluir</button>
      </div>
    `;
  });
}

window.excluir = async (id) => {
  await deleteDoc(doc(db, "agendamentos", id));
  carregar();
};

carregar();

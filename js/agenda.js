import { auth, db } from "./firebase.js";
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  addDoc, collection
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const btn = document.getElementById("agendarBtn");

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html";
  }
});

btn.addEventListener("click", async () => {
  const data = document.getElementById("data").value;
  const hora = document.getElementById("hora").value;
  const pessoas = document.getElementById("pessoas").value;

  await addDoc(collection(db, "agendamentos"), {
    clienteId: auth.currentUser.uid,
    data,
    hora,
    pessoas,
    criadoEm: new Date()
  });

  alert("Mesa agendada com sucesso!");
});

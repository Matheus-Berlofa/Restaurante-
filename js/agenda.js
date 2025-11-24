// js/agenda.js
import { auth, db } from "./firebase.js";
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import {
  doc, getDoc, collection, addDoc
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

let horarioSelecionado = "";
let mesaSelecionada = "";

// Carrega nome e email do usuário
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  let nomeParaExibir = user.displayName;

  if (!nomeParaExibir) {
    try {
      const userDocRef = doc(db, "usuarios", user.uid);
      const snap = await getDoc(userDocRef);

      if (snap.exists()) {
        nomeParaExibir = snap.data().nome || "";
      }
    } catch (err) {
      console.log(err);
    }
  }

  document.getElementById("nomeUsuario").innerText = nomeParaExibir || "Usuário";
  document.getElementById("emailUsuario").innerText = user.email;
});

// Seleção de horário
document.querySelectorAll("#horarios .option-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("#horarios .option-btn")
      .forEach(b => b.classList.remove("option-selected"));

    btn.classList.add("option-selected");
    horarioSelecionado = btn.textContent;
  });
});

// Seleção de mesa
document.querySelectorAll("#mesas .option-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("#mesas .option-btn")
      .forEach(b => b.classList.remove("option-selected"));

    btn.classList.add("option-selected");
    mesaSelecionada = btn.textContent;
  });
});

// Enviar reserva
document.getElementById("agendaForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = document.getElementById("data").value;
  const qtd = document.getElementById("quantidade").value;
  const mensagem = document.getElementById("mensagem");

  if (!data || !horarioSelecionado || !mesaSelecionada || !qtd) {
    mensagem.innerText = "Preencha todos os campos!";
    mensagem.style.color = "red";
    return;
  }

  try {
    await addDoc(collection(db, "reservas"), {
      data,
      horario: horarioSelecionado,
      mesa: mesaSelecionada,
      quantidade: qtd,
      criadoEm: new Date(),
      nome: user.displayName,
      email: user.email
    });

    mensagem.innerText = "Reserva realizada com sucesso!";
    mensagem.style.color = "green";

    document.getElementById("agendaForm").reset();
    horarioSelecionado = "";
    mesaSelecionada = "";
    document.querySelectorAll(".option-btn").forEach(b => b.classList.remove("option-selected"));
  } catch (error) {
    console.error(error);
    mensagem.innerText = "Erro ao reservar!";
    mensagem.style.color = "red";
  }
});


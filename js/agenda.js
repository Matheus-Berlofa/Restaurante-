import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

import { db } from "./firebase.js";
import { collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

let horarioSelecionado = "";
let mesaSelecionada = "";

// 🔥 PUXAR NOME E EMAIL DO USUÁRIO LOGADO
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById("nomeUsuario").innerText = user.displayName;
        document.getElementById("emailUsuario").innerText = user.email;
    } else {
        window.location.href = "login.html";
    }
});

// 🔘 Selecionar horário
document.querySelectorAll("#horarios .option-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll("#horarios .option-btn").forEach(b => b.classList.remove("option-selected"));
        btn.classList.add("option-selected");
        horarioSelecionado = btn.innerText;
    });
});

// 🔘 Selecionar mesa
document.querySelectorAll("#mesas .option-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll("#mesas .option-btn").forEach(b => b.classList.remove("option-selected"));
        btn.classList.add("option-selected");
        mesaSelecionada = btn.innerText;
    });
});


// 📌 Salvar agendamento
document.getElementById("agendaForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = document.getElementById("data").value;
    const quantidade = document.getElementById("quantidade").value;

    const mensagem = document.getElementById("mensagem");

    if (!horarioSelecionado || !mesaSelecionada) {
        mensagem.innerText = "Selecione horário e mesa!";
        mensagem.style.color = "red";
        return;
    }

    const reservasRef = collection(db, "reservas");

    // ❌ BLOQUEIO DE MESA / HORÁRIO
    const q = query(
        reservasRef,
        where("data", "==", data),
        where("horario", "==", horarioSelecionado),
        where("mesa", "==", mesaSelecionada)
    );

    const result = await getDocs(q);

    if (!result.empty) {
        mensagem.innerText = "❌ Essa mesa já está reservada nesse horário!";
        mensagem.style.color = "red";
        return;
    }

    try {
        await addDoc(collection(db, "reservas"), {
            nome: document.getElementById("nomeUsuario").innerText,
            email: document.getElementById("emailUsuario").innerText,
            data,
            horario: horarioSelecionado,
            mesa: mesaSelecionada,
            quantidade,
            criadoEm: new Date(),
        });

        mensagem.innerText = "✔ Reserva realizada com sucesso!";
        mensagem.style.color = "green";
        document.getElementById("agendaForm").reset();

    } catch (error) {
        mensagem.innerText = "Erro ao fazer reserva!";
        mensagem.style.color = "red";
    }
});


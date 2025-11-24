import { db } from "./firebase.js";
import { collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

const form = document.getElementById("agendaForm");
const mensagem = document.getElementById("mensagem");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const data = document.getElementById("data").value;
    const horario = document.getElementById("horario").value;
    const mesa = document.getElementById("mesa").value;
    const quantidade = document.getElementById("quantidade").value;

    // 🔒 Verificar se já existe reserva para a mesma DATA + HORÁRIO + MESA
    const reservasRef = collection(db, "reservas");

    const q = query(
        reservasRef,
        where("data", "==", data),
        where("horario", "==", horario),
        where("mesa", "==", mesa)
    );

    const resultado = await getDocs(q);

    if (!resultado.empty) {
        mensagem.innerText = "❌ Essa mesa já está reservada nesse horário!";
        mensagem.style.color = "red";
        return;
    }

    try {
        await addDoc(collection(db, "reservas"), {
            nome,
            email,
            data,
            horario,
            mesa,
            quantidade,
            criadoEm: new Date()
        });

        mensagem.innerText = "✔ Reserva realizada com sucesso!";
        mensagem.style.color = "green";
        form.reset();

    } catch (error) {
        console.log(error);
        mensagem.innerText = "❌ Erro ao salvar reserva!";
        mensagem.style.color = "red";
    }
});

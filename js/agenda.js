// Enviar reserva
document.getElementById("agendaForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = document.getElementById("data").value;
  const qtd = document.getElementById("quantidade").value;
  const mensagem = document.getElementById("mensagem");

  const user = auth.currentUser;
  if (!user) {
    mensagem.innerText = "Usuário não autenticado!";
    mensagem.style.color = "red";
    return;
  }

  // nome e email já carregados no HTML — vamos pegar novamente para salvar no banco
  const nome = document.getElementById("nomeUsuario").innerText;
  const email = document.getElementById("emailUsuario").innerText;

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
      nome,
      email,
      uid: user.uid,
      criadoEm: new Date() // salva data e hora
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

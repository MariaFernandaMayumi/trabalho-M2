import { useEffect, useState } from "react";
import "./App.css";

const API = "http://127.0.0.1:8000/api/alunos/";

function App() {
  const [alunos, setAlunos] = useState([]);
  const [nome, setNome] = useState("");
  const [turma, setTurma] = useState("");
  const [nota, setNota] = useState("");

  function carregarAlunos() {
    fetch(API)
      .then((res) => res.json())
      .then((dados) => setAlunos(dados));
  }

  useEffect(() => {
    carregarAlunos();
  }, []);

  function cadastrar(evento) {
    evento.preventDefault();

    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, turma, nota: Number(nota) }),
    }).then(() => {
      setNome("");
      setTurma("");
      setNota("");
      carregarAlunos();
    });
  }

  return (
    <div className="pagina">
      <h1>Cadastro de alunos</h1>

      <form onSubmit={cadastrar}>
        <input
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          placeholder="Turma (A, B...)"
          maxLength={1}
          value={turma}
          onChange={(e) => setTurma(e.target.value)}
          required
        />
        <input
          placeholder="Nota"
          type="number"
          step="0.1"
          min="0"
          max="10"
          value={nota}
          onChange={(e) => setNota(e.target.value)}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>

      <h2>Alunos cadastrados</h2>
      <ul>
        {alunos.map((aluno) => (
          <li key={aluno.id}>
            {aluno.nome} · turma {aluno.turma} · nota {aluno.nota}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;


import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink
} from "react-router-dom";

import Inicio from "./paginas/inicio";
import Cadastro from "./paginas/Cadastro";
import MinhaColecao from "./paginas/minhacolecao";

import "./App.css";

const API = "http://127.0.0.1:8000/api/series/";

function App() {
  const [series, setSeries] = useState([]);
  const [resumo, setResumo] = useState(null);
  const [busca, setBusca] = useState("");
  const [erro, setErro] = useState("");

  async function carregarDados() {
    try {
      const [resSeries, resResumo] = await Promise.all([
        fetch(API),
        fetch(API + "resumo/")
      ]);

      if (!resSeries.ok || !resResumo.ok) {
        throw new Error("Erro ao carregar dados");
      }

      setSeries(await resSeries.json());
      setResumo(await resResumo.json());
      setErro("");
    } catch {
      setErro("Não foi possível conectar ao Django.");
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  const seriesFiltradas = series.filter((serie) =>
    serie.titulo.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <BrowserRouter>
      <header className="navbar">
        <NavLink to="/" className="logo">
          Nex<span>Vision</span>
        </NavLink>

        <nav>
          <NavLink to="/" end>Início</NavLink>
          <NavLink to="/cadastrar">Cadastrar</NavLink>
          <NavLink to="/series">Minha coleção</NavLink>
        </nav>
      </header>

      <main className="pagina">
        {erro && <p className="erro">{erro}</p>}

        <Routes>
          <Route
            path="/"
            element={
              <Inicio resumo={resumo} series={series} />
            }
          />

          <Route
            path="/cadastrar"
            element={
              <Cadastro
                api={API}
                aoCadastrar={carregarDados}
              />
            }
          />

          <Route
            path="/series"
            element={
              <MinhaColecao
                series={seriesFiltradas}
                busca={busca}
                setBusca={setBusca}
              />
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;

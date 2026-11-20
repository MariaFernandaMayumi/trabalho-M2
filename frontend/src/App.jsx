import { useEffect, useState } from "react"
import "./App.css";

function App() {
  const [series, setSeries] = useState([]);
  const [busca, setBusca] =useState("");

  useEffect(() =>{
    fetch("http://127.0.0.1:8000/api/series/lista/")
    .then((res) => res.json())
    .then((data) => setSeries(data));

  },[]);

  const seriesFiltradas = series.filter((item)=>
  item.titulo.toLowerCase().includes(busca.toLowerCase())
);

return (
  <div className="pagina">
    <h1>Series</h1>

    <input
    type="text"
    placeholder="Buscar por titulo"
    value={busca}
    onChange={(e) => setBusca(e.target.value)}
    />

    <h2>Series cadastradas</h2>
    {seriesFiltradas.length === 0 ? (
      <p>Nenhum item encontrado</p>
    ) : (
      <ul>
        {seriesFiltradas.map((item) => (
          <li key={item.id}>
          {item.titulo} - {item.plataforma} - {item.ano}  -  {item.avaliacao}
          </li>

        ))}
      </ul>

    )}
   </div>
  
 );
}
export default App;
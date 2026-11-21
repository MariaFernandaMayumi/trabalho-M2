
import { Link } from "react-router-dom";
import Resumo from "../colecaoseries/resumoseries";

function Inicio({ resumo, series }) {
  return (
    <section className="inicio">
      <h1>Bem-vindo ao NexVision</h1>

      <p>
        Suas séries favoritas, suas avaliações
        e toda a sua coleção em um só lugar.
      </p>

      <h2>Resumo da coleção</h2>

      <Resumo dados={resumo} series={series} />

      <div className="acoes-inicio">
        <Link to="/cadastrar" className="link-botao">
          Cadastrar série
        </Link>

        <Link to="/series" className="link-botao secundario">
          Explorar coleção
        </Link>
      </div>
    </section>
  );
}

export default Inicio;

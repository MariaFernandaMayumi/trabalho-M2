
import Lista from "../colecaoseries/listas";

function MinhaColecao({ series, busca, setBusca }) {
  return (
    <section className="colecao">
      <h1>Minha coleção</h1>

      <p>
        Explore as séries cadastradas e encontre
        suas favoritas.
      </p>

      <Lista
        series={series}
        busca={busca}
        setBusca={setBusca}
      />
    </section>
  );
}

export default MinhaColecao;

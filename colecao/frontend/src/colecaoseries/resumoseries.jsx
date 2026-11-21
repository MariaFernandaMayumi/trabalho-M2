
function Resumo({ dados, series = [] }) {
  if (!dados) {
    return <p>Carregando resumo...</p>;
  }

  const melhorSerie = series.find(
    (serie) => serie.titulo === dados.melhor
  );

  return (
    <section className="resumo">

      <div className="resumo-card">
        <h3>Total de séries</h3>
        <strong>{dados.total}</strong>
      </div>

      <div className="resumo-card">
        <h3>Média das avaliações</h3>
        <strong>
          {Number(dados.media_avaliacao).toFixed(2)}
        </strong>
      </div>

      <div className="resumo-card melhor-serie">
        <div className="melhor-topo">
          <span className="destaque-label">
            ★ DESTAQUE
          </span>

          <span className="top-badge">
            TOP 1
          </span>
        </div>

        {melhorSerie ? (
          <div className="melhor-conteudo">
            <div className="melhor-icone">
              ▶
            </div>

            <div className="melhor-informacoes">
              <h3>{melhorSerie.titulo}</h3>

              <p>
                Streaming: {melhorSerie.plataforma}
              </p>

              <p>
                Ano: {melhorSerie.ano}
              </p>

              <div className="melhor-nota">
                 {melhorSerie.avaliacao}/10
              </div>
            </div>
          </div>
        ) : (
          <p>
            {dados.melhor || "Nenhuma série cadastrada"}
          </p>
        )}
      </div>

    </section>
  );
}

export default Resumo;

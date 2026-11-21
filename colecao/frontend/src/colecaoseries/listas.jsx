
function Lista({ series, busca, setBusca }) {
    return (
        <section>
            <h2>Séries Favoritas</h2>

            <input
                type="text"
                placeholder="Buscar série pelo título..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
            />

            {series.length === 0 ? (
                <p>Nenhum item encontrado</p>
            ) : (
                <ul>
                    {series.map((serie) => (
                        <li key={serie.id}>
                            <strong>{serie.titulo}</strong>
                            <span>
                                {serie.plataforma} | {serie.ano}
                                {" | "}Nota: {serie.avaliacao}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

export default Lista;

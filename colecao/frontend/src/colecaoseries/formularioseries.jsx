import { useState } from "react";

function Formulario({ api, aoCadastrar }) {
    const [titulo, setTitulo] = useState("");
    const [plataforma, setPlataforma] = useState("");
    const [ano, setAno] = useState("");
    const [avaliacao, setAvaliacao] = useState("");
    const [erro, setErro] = useState("");

    async function cadastrar(evento) {
        evento.preventDefault();

        try {
            const resposta = await fetch(api, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    titulo,
                    plataforma,
                    ano: Number(ano),
                    avaliacao: Number(avaliacao),
                }),
            });

            const dados = await resposta.json();

            if (!resposta.ok) {
                setErro(dados.erro || "Erro ao cadastrar série.");
                return;
            }

            setErro("");
            setTitulo("");
            setPlataforma("");
            setAno("");
            setAvaliacao("");

            await aoCadastrar();
        } catch {
            setErro("Não foi possível conectar ao servidor.");
        }
    }

    return (
        <section>
            <h2>Cadastre sua próxima série</h2>

            <form onSubmit={cadastrar}>
                <input
                    placeholder="Título da série"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                />

                <input
                    placeholder="Plataforma de streaming"
                    value={plataforma}
                    onChange={(e) => setPlataforma(e.target.value)}
                    required
                />

                <input
                    type="number"
                    placeholder="Ano de lançamento"
                    value={ano}
                    onChange={(e) => setAno(e.target.value)}
                    required
                />

                <input
                    type="number"
                    step="any"
                    placeholder="Nota (0 a 10)"
                    value={avaliacao}
                    onChange={(e) => setAvaliacao(e.target.value)}
                    required
                />

                {erro && <p className="erro">{erro}</p>}


                <button type="submit" className="cssbuttons-io">
                    <span>
                        <svg
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M0 0h24v24H0z"
                                fill="none"
                            />
                            <path
                                d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-1 14.5-4-4 1.41-1.41L11 13.67l4.59-4.58L17 10.5z"
                                fill="currentColor"
                            />
                        </svg>
                        Cadastrar série
                    </span>
                </button>

            </form>
        </section>
    );
}

export default Formulario;

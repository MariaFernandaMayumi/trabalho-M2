
import Formulario from "../colecaoseries/formularioseries";

function Cadastro({ api, aoCadastrar }) {
  return (
    <section className="cadastro">
      <h1>Cadastrar série</h1>

      <p>
        Adicione suas séries favoritas à coleção.
      </p>

      <Formulario
        api={api}
        aoCadastrar={aoCadastrar}
      />
    </section>
  );
}

export default Cadastro;

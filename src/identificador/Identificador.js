import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
//import { FormControl } from 'react-bootstrap';
//import { FormControl } from "@material-ui/core/FormControl";

class DadoIdentificador {
    constructor(identificador) {

    }
}

class Identificador extends Component {
    constructor(props) {
        super(props);
        this.newOne = {
            tipoDocumento: '',
            areaGeografica: '',
            emissor: "GO",
            dataEmissao: "10-10-2018",
            designacao: "132456"
        };
        this.state = {
            data: []
        };
        this.key = "identificadores";
        this.onAtualizaIdentificacao = this.onAtualizaIdentificacao.bind(this)
        this.onRemoverIdentificacao = this.onRemoverIdentificacao.bind(this)
        this.onAdicionarIdentificacao = this.onAdicionarIdentificacao.bind(this)
    }

    onAtualizaIdentificacao(indice, novoObj) {
        var lista = this.state.data;
        lista[indice] = novoObj;
        this.setState({ data: lista })
        sessionStorage.setItem(this.key, JSON.stringify(this.state.data));

    }

    onRemoverIdentificacao(indice) {
        var lista = this.state.data;
        lista.splice(indice, 1)
        this.setState({ data: lista })
        sessionStorage.setItem(this.key, JSON.stringify(this.state.data));
    }

    onAdicionarIdentificacao(e) {
        e.preventDefault()

        var d = new Date()
        var dataString = d.getFullYear() +
        "-" + (d.getMonth() + 1) +
        "-" + d.getDate();

        var identificador = {
            designacao: ""
            , areaGeografica: 1
            , emissor: ""
            , dataEmissao: dataString
            , tipoDocumento: "0"
            , nomeCartorio: ""
            , tipoCertidao: 0
            , livro: 0
            , folha: 0
            , termo: 0
            , serie: 0
            , estado: ""
            , secao: 0
            , zona: 0
        }

        var lista = this.state.data;
        lista.push(identificador);
        this.setState({ data: lista })
        sessionStorage.setItem(this.key, JSON.stringify(this.state.data));
    }

    componentDidMount() {
        console.log(this.props.data);
        if (sessionStorage.hasOwnProperty(this.key)) {
          this.setState({
            data: JSON.parse(sessionStorage.getItem(this.key))
              ? JSON.parse(sessionStorage.getItem(this.key))
              : this.props.data
          }, () => {
            sessionStorage.setItem(this.key, JSON.stringify(this.state.data));
          });
        }
        else {
          sessionStorage.setItem(this.key, JSON.stringify(this.props.data));
        }
      }

    render() {
        return (
            <div>
                <h2 >Identificadores</h2>
                <form>
                    {
                        this.state.data.map((identificacao, indice) => {
                            return <LinhaIdentificacao identificacao={identificacao}
                                indice={indice}
                                atualizarIdentificacao={this.onAtualizaIdentificacao}
                                removerIdentificacao={this.onRemoverIdentificacao}
                                adicionarIdentificacao={this.onAdicionarIdentificacao} />
                        })
                    }

                    <p />
                    <hr />
                    <button onClick={this.onAdicionarIdentificacao}>
                        NOVO IDENTIFICADOR [ + ]
                    </button> &nbsp;
                </form>
            </div>
        );
    }
}

class LinhaIdentificacao extends Component {

    constructor(props) {
        super(props);
        this.onAreaGeograficaChange = this.onAreaGeograficaChange.bind(this)
        this.onEmissorChange = this.onEmissorChange.bind(this)
        this.onDataEmissaoChange = this.onDataEmissaoChange.bind(this)
        this.onDesignacaoChange = this.onDesignacaoChange.bind(this)
        this.onRemoverClick = this.onRemoverClick.bind(this)
        this.onAtualizarDadosTipoEspecificoDocumento =
            this.onAtualizarDadosTipoEspecificoDocumento.bind(this)
        this.onTipoDocumentoChange = this.onTipoDocumentoChange.bind(this)
    }

    onAtualizarDadosTipoEspecificoDocumento(novoObjeto) {
        this.props.atualizarIdentificacao(this.props.indice, novoObjeto)
    }
 
    onTipoDocumentoChange(e){
        var value = e.target.value
        var obj = this.props.identificacao
        obj.tipoDocumento = value
        this.props.atualizarIdentificacao(this.props.indice, obj)
    }

    onAreaGeograficaChange(e) {
        var value = e.target.value
        var obj = this.props.identificacao
        obj.areaGeografica = value
        this.props.atualizarIdentificacao(this.props.indice, obj)
    }

    onEmissorChange(e) {
        var value = e.target.value
        var obj = this.props.identificacao
        obj.emissor = value
        this.props.atualizarIdentificacao(this.props.indice, obj)
    }

    onDataEmissaoChange(e) {
        console.log(e.target.value)

        var value = e.target.value
        var obj = this.props.identificacao
        obj.dataEmissao = value
        this.props.atualizarIdentificacao(this.props.indice, obj)
    }

    onDesignacaoChange(e) {
        var value = e.target.value
        var obj = this.props.identificacao
        obj.designacao = value
        this.props.atualizarIdentificacao(this.props.indice, obj)
    }

    onRemoverClick(e) {
        e.preventDefault();
        this.props.removerIdentificacao(this.props.indice)
    }

    render() {
        // var identificacao = this.state.identificacao;
        // var indice = this.state.indice;

        var identificacao = this.props.identificacao;
        var indice = this.props.indice;

        return (
            <div>
                <hr /> 
                <h2>{identificacao.designacao}</h2>
                <div>
                    <TextField
                        id="tipoDocumento"
                        select
                        label="Tipo de documento"
                        value={identificacao.tipoDocumento}
                        helperText="Selecione o tipo de documento"
                        margin="normal"
                        onChange={this.onTipoDocumentoChange}
                    >
                        <option value="0" >Identificador local</option>
                        <option value="1" >Certidão</option>
                        <option value="2" >Carteira de trabalho</option>
                        <option value="3" >Titulo de eleitor</option>
                    </TextField>
                </div>

                <div>
                    <TextField
                        id="areaGeografica"
                        select
                        label="Área geográfica"
                        value={identificacao.areaGeografica}
                        helperText="Selecione a área geográfica"
                        margin="normal"
                        onChange={this.onAreaGeograficaChange}
                    >
                        <option value={0} key={0}>Identificador local</option>
                        <option value={1} key={1}>Identificador de área, região ou distrito</option>
                        <option value={2} key={2}>Identificador de estado, privíncia ou território</option>
                        <option value={3} key={3}>Identificador nacional</option>
                    </TextField>
                </div>
                <div>
                    <TextField
                        required
                        id="emissor"
                        label="Emissor"
                        value={identificacao.emissor}
                        margin="normal"
                        onChange={this.onEmissorChange}
                    />
                </div>
                <div>
                    <TextField
                        id="dataEmissao"
                        label="Data de emissão"
                        type="date"
                        value={identificacao.dataEmissao}
                        onChange={this.onDataEmissaoChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <div>
                    <TextField
                        required
                        id="designacao"
                        label="Designação"
                        value={identificacao.designacao}
                        margin="normal"
                        onChange={this.onDesignacaoChange}
                    />
                </div>
                <Certidao data={identificacao}
                    indice={indice}
                    atualizar={this.onAtualizarDadosTipoEspecificoDocumento} />
                <CarteiraTrabalho data={identificacao}
                    indice={indice}
                    atualizar={this.onAtualizarDadosTipoEspecificoDocumento} />
                <TituloEleitor data={identificacao}
                    indice={indice}
                    atualizar={this.onAtualizarDadosTipoEspecificoDocumento} />
                <div>
                    <button onClick={this.onRemoverClick}>
                        Remover [ X ]
                    </button>
                </div>
            </div>
        )
    }

}

class Certidao extends Component {
    constructor(props) {
        super(props);
        this.onTipoCertificadoChange = this.onTipoCertificadoChange.bind(this)
        this.onNomeCartorioChange = this.onNomeCartorioChange.bind(this)
        this.onLivroChange = this.onLivroChange.bind(this)
        this.onFolhaChange = this.onFolhaChange.bind(this)
        this.onTermoChange = this.onTermoChange.bind(this)
    }

    onTipoCertificadoChange(e) {
        var value = e.target.value
        this.props.data.tipoCertidao = value;
        this.props.atualizar(this.props.data)
    }

    onNomeCartorioChange(e) {
        var value = e.target.value
        this.props.data.nomeCartorio = value;
        this.props.atualizar(this.props.data)
    }

    onLivroChange(e) {
        var value = e.target.value
        this.props.data.livro = value;
        this.props.atualizar(this.props.data)
    }

    onFolhaChange(e) {
        var value = e.target.value
        this.props.data.folha = value;
        this.props.atualizar(this.props.data)
    }

    onTermoChange(e) {
        var value = e.target.value
        this.props.data.termo = value;
        this.props.atualizar(this.props.data)
    }

    render() {

        var identificao = this.props.data;
        var indice = this.props.indice;
        var tipoDocumento = identificao.tipoDocumento;
        if (tipoDocumento === '1')
            return (
                <div id="divCertidao">
                    <h3>Certidão </h3>
                    <div>
                        <label for="tipoCertidao">Tipo de Certidão</label>
                        <select id="tipoCertidao"
                            value={identificao.tipoCertidao}
                            name="tipoCertidao"
                            onChange={this.onTipoCertificadoChange}>
                            <option value="0">Nascimento</option>
                            <option value="1">Casamento</option>
                            <option value="2">Divórcio</option>
                        </select>
                    </div>
                    <div>
                        <label for="nomeCartorio">Nome do cartório</label>
                        <input type="text" id="nomeCartorio" name="nomeCartorio"
                            value={identificao.nomeCartorio}
                            onChange={this.onNomeCartorioChange} />
                    </div>
                    <div>
                        <label for="livro">Livro</label>
                        <input type="number" id="livro" name="livro" min="0" value={identificao.livro}
                            onChange={this.onLivroChange}></input>/>
                    </div>
                    <div>
                        <label for="folha">Folha</label>
                        <input type="number" id="folha" name="folha" min="0" value={identificao.folha}
                            onChange={this.onFolhaChange}></input>/>
                    </div>
                    <div>
                        <label for="termo">Termo</label>
                        <input type="number" id="termo" name="termo" min="0" value={identificao.termo}
                            onChange={this.onTermoChange} />
                    </div>
                </div>
            )
        return <div></div>
    }
}

class CarteiraTrabalho extends Component {
    constructor(props) {
        super(props)
        this.onSerieChange = this.onSerieChange.bind(this)
        this.onEstadoChange = this.onEstadoChange.bind(this)
    }

    onSerieChange(e) {
        this.props.data.serie = e.target.value;
        this.props.atualizar(this.props.data)
    }

    onEstadoChange(e) {
        this.props.data.estado = e.target.value;
        this.props.atualizar(this.props.data)
    }

    render() {
        var identificao = this.props.data;
        var tipoDocumento = identificao.tipoDocumento;
        if (tipoDocumento === '2')
            return (
                <div id="carteiraTrabalho">
                    <h3>Carteira de Trabalho e Previdência Social (CTPS)</h3>
                    <div>
                        <label for="serie">Série</label>
                        <input type="number" id="serie" name="serie" min="0"
                            value={this.props.data.serie}
                            onChange={this.onSerieChange} />
                    </div>
                    <div>
                        <label for="estado">Estado</label>
                        <select name="estado" value={this.props.data.estado}
                            onChange={this.onEstadoChange}>
                            <option value="AC">Acre</option>
                            <option value="AL">Alagoas</option>
                            <option value="AP">Amapá</option>
                            <option value="AM">Amazonas</option>
                            <option value="BA">Bahia</option>
                            <option value="CE">Ceará</option>
                            <option value="DF">Distrito Federal</option>
                            <option value="ES">Espírito Santo</option>
                            <option value="GO">Goiás</option>
                            <option value="MA">Maranhão</option>
                            <option value="MT">Mato Grosso</option>
                            <option value="MS">Mato Grosso do Sul</option>
                            <option value="MG">Minas Gerais</option>
                            <option value="PA">Pará</option>
                            <option value="PB">Paraíba</option>
                            <option value="PR">Paraná</option>
                            <option value="PE">Pernambuco</option>
                            <option value="PI">Piauí</option>
                            <option value="RJ">Rio de Janeiro</option>
                            <option value="RN">Rio Grande do Norte</option>
                            <option value="RS">Rio Grande do Sul</option>
                            <option value="RO">Rondônia</option>
                            <option value="RR">Roraima</option>
                            <option value="SC">Santa Catarina</option>
                            <option value="SP">São Paulo</option>
                            <option value="SE">Sergipe</option>
                            <option value="TO">Tocantins</option>
                        </select>
                    </div>
                </div>
            )
        return <div></div>
    }
}


class TituloEleitor extends Component {

    constructor(props) {
        super(props)
        this.onSecaoChange = this.onSecaoChange.bind(this)
        this.onZonaChange = this.onZonaChange.bind(this)
    }

    onSecaoChange(e) {
        this.props.data.secao = e.target.value;
        this.props.atualizar(this.props.data)
    }

    onZonaChange(e) {
        this.props.data.zona = e.target.value;
        this.props.atualizar(this.props.data)
    }

    render() {
        var identificao = this.props.data;
        var tipoDocumento = identificao.tipoDocumento;
        if (tipoDocumento === '3')
            return (
                <div id="tituloEleitor">
                    <h3>Título de eleitor</h3>
                    <div>
                        <label for="secao">Seção</label>
                        <input type="number" id="secao" name="secao" min="0"
                            value={this.props.data.secao}
                            onChange={this.onSecaoChange} />
                    </div>
                    <div>
                        <label for="zona">Zona</label>
                        <input type="number" id="zona" name="zona" min="0"
                            value={this.props.data.zona}
                            onChange={this.onZonaChange} />
                    </div>
                </div>
            )
        return <div></div>
    }
}

export default Identificador;
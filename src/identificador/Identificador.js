import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
//import { FormControl } from 'react-bootstrap';
//import { FormControl } from "@material-ui/core/FormControl";

class Identificador extends Component {
    constructor(props) {
        super(props);
        this.newOne = {
            tipoDocumento: '2',
            areaGeografica: "2",
            emissor: "GO",
            dataEmissao: "10-10-2018",
            designacao: "132456"
        };
        this.state = {
            data: [
                this.newOne
            ]
        };
    }

    componentDidUpdate() {
    }

    componentDidMount() {
        this.setState(
            { data: JSON.parse(sessionStorage.getItem('identificadores')) ? JSON.parse(sessionStorage.getItem('identificadores')) : [{ am: 'am' }] },
            function () {
                console.log('DATA_IDENTIFICADORES: ' + JSON.stringify(this.state.data, null, 2));
                console.log('DATA_IDENTIFICADORES: ' + JSON.stringify(JSON.parse(sessionStorage.getItem('identificadores')), null, 2));
            }
        );
    }

    render() {
        return (
            <div>
                <h2>Identificadores</h2>
                <form>
                    {
                        this.state.data.map((identificacao, indice) => {
                            return <LinhaIdentificacao identificacao={identificacao}
                                indice={indice} />
                        })
                    }

                </form>
            </div>
        );
    }
}

class LinhaIdentificacao extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        var identificacao = this.props.identificacao;
        var indice = this.props.indice;
        return (
            <div>
                <hr />
                <h2>{identificacao.designacao} : {indice}</h2>
                <div>
                    <TextField
                        id="tipoIdentificador"
                        select
                        label="Tipo de identificador"
                        value={identificacao.tipoDocumento}
                        helperText="Selecione tipo de identificador"
                        margin="normal"
                    >
                        <option value={0} key={0}>Identificador local</option>
                        <option value={1} key={1}>Certidão</option>
                        <option value={2} key={2}>Carteira de Trabalho e Previdência Social (CTPS)</option>
                        <option value={3} key={3}>Título de eleitor</option>
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
                    />
                </div>
                <div>
                    <TextField
                        id="dataEmissao"
                        label="Data de emissão"
                        type="date"
                        value={identificacao.dataEmissao}
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
                    />
                </div>
                <Certidao data={identificacao} />
                <CarteiraTrabalho data={identificacao} />
                <TituloEleitor data={identificacao} />
            </div>
        )
    }

}

class Certidao extends Component {
    render() {

        var identificao = this.props.data;
        var tipoDocumento = identificao.tipoDocumento;
        if (tipoDocumento === '1')
            return (
                <div id="divCertidao">
                    <h3>Certidão</h3>
                    <div>
                        <label for="tipoCertidao">Tipo de Certidão</label>
                        <select id="tipoCertidao" name="tipoCertidao">
                            <option value="1">Nascimento</option>
                            <option value="2">Casamento</option>
                            <option value="3">Divórcio</option>
                        </select>
                    </div>
                    <div>
                        <label for="nomeCartorio">Nome do cartório</label>
                        <input type="text" id="nomeCartorio" name="nomeCartorio" />
                    </div>
                    <div>
                        <label for="livro">Livro</label>
                        <input type="number" id="livro" name="livro" min="0" />
                    </div>
                    <div>
                        <label for="folha">Folha</label>
                        <input type="number" id="folha" name="folha" min="0" />
                    </div>
                    <div>
                        <label for="termo">Termo</label>
                        <input type="number" id="termo" name="termo" min="0" />
                    </div>
                </div>
            )
        return <div></div>
    }
}

class CarteiraTrabalho extends Component {
    render() {
        var identificao = this.props.data;
        var tipoDocumento = identificao.tipoDocumento;
        if (tipoDocumento === '2')
            return (
                <div id="carteiraTrabalho">
                    <h3>Carteira de Trabalho e Previdência Social (CTPS)</h3>
                    <div>
                        <label for="serie">Série</label>
                        <input type="number" id="serie" name="serie" min="0" />
                    </div>
                    <div>
                        <label for="estado">Estado</label>
                        <select name="estado">
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
    render() {
        var identificao = this.props.data;
        var tipoDocumento = identificao.tipoDocumento;
        if (tipoDocumento === '3')
            return (
                <div id="tituloEleitor">
                    <h3>Título de eleitor</h3>
                    <div>
                        <label for="secao">Seção</label>
                        <input type="number" id="secao" name="secao" min="0" />
                    </div>
                    <div>
                        <label for="zona">Zona</label>
                        <input type="number" id="zona" name="zona" min="0" />
                    </div>
                </div>
            )
        return <div></div>
    }
}

export default Identificador;
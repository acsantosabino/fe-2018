import React, { Component } from 'react'
//import { FormControl } from 'react-bootstrap';
//import { FormControl } from "@material-ui/core/FormControl";
import TextField from '@material-ui/core/TextField';

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
                    <div>
                        {/*<select id="tipoIdentificador" value={this.state.data[0].tipoDocumento} name="tipoIdentificador">*/}
                        <label for="tipoIdentificador">Tipo do identificador</label>
                        <TextField
                            id="tipoIdentificador"
                            select
                            label="Tipo de identificador"
                            value={this.state.data[0].tipoDocumento}
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
                        {/*<select id="tipoIdentificador" value={this.state.data[0].tipoDocumento} name="tipoIdentificador">*/}
                        <label for="areaGeografica">Área geográfica</label>
                        <TextField
                            id="areaGeografica"
                            select
                            label="Área geográfica"
                            value={this.state.data[0].areaGeografica}
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
                        <label for="emissor">Emissor</label>
                        <input type="text" id="emissor" name="emissor" value={this.state.data[0].emissor} />
                    </div>
                    <div>
                        <label for="dataEmissao">Data de emissão</label>
                        <input id="dataEmissao" name="dataEmissao" value={this.state.data[0].dataEmissao} />
                    </div>
                    <div>
                        <label for="designacao">Designação</label>
                        <input type="text" id="designacao" name="designacao" value={this.state.data[0].designacao} />
                    </div>
                    <Certidao />
                    <CarteiraTrabalho />
                    <TituloEleitor />

                </form>
            </div>
        );
    }
}

class Certidao extends Component {
    render() {
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
    }
}

class CarteiraTrabalho extends Component {
    render() {
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
    }
}


class TituloEleitor extends Component {
    render() {
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
    }
}

export default Identificador;
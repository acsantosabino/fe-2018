import React from "react";
import ReactDOM from "react-dom";
import Endereco from './endereco/endereco.jsx'
import ComunicacoesEletronica from "./comunicacoes/ComunicacoesEletronica";
import Vinculos from './vinculos/Vinculos';
import DadosDemograficos from './dadosDemograficos/dadosDemograficos';
const css = require('./app.css')



class Main extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            identificadores: [],
            nomes: [],
            dadosDemograficos: [],
            enderecos: [],
            comunicacoesEletronica: [],
            vinculos: []
        };
        this.loadCommentsFromServer();
    }
    loadCommentsFromServer() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                sessionStorage.setItem('identificadores', JSON.stringify(data.identificadores));
                sessionStorage.setItem('nomes', JSON.stringify(data.nomes));
                sessionStorage.setItem('dadosDemograficos', JSON.stringify(data.dadosDemograficos));
                sessionStorage.setItem('enderecos', JSON.stringify(data.enderecos));
                sessionStorage.setItem('comunicacoesEletronica', JSON.stringify(data.comunicacoesEletronica));
                sessionStorage.setItem('vinculos', JSON.stringify(data.vinculos));
                this.setState(data);
            }.bind(this),
            error: function (xhr, status, err) {
                this.getInitialState()
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }
    // componentWillMount() {
    //this.loadCommentsFromServer();
    // }
    render(){
        return (
            <div>Hello React! Main class.
                <p>identificadores
                    <pre>{JSON.stringify(this.state.identificadores, null, 2)}</pre>
                </p>
                <p>nomes
                    <pre>{JSON.stringify(this.state.nomes, null, 2)}</pre>
                </p>

                <DadosDemograficos />
                <ComunicacoesEletronica />
                <Vinculos/>
                <Endereco/>

            </div>

        );
    }
}

ReactDOM.render(<Main url="../data/modeloDeDados.json" />, document.getElementById("index"));
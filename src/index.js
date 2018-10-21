import React from "react";
import ReactDOM from "react-dom";
import ComunicacoesEletronica from "./ComunicacoesEletronica";

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
    }
    loadCommentsFromServer() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({ identificadores: data.identificadores });
                this.setState({ nomes: data.nomes });
                this.setState({ dadosDemograficos: data.dadosDemograficos });
                this.setState({ enderecos: data.enderecos });
                this.setState({ comunicacoesEletronica: data.comunicacoesEletronica });
                this.setState({ vinculos: data.vinculos });
            }.bind(this),
            error: function (xhr, status, err) {
                this.getInitialState()
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }
    componentDidMount() {
        this.loadCommentsFromServer();
    }
    render() {
        return (
            <div>Hello React! Main class.
                <p>identificadores
                    <pre>{JSON.stringify(this.state.identificadores, null, 2)}</pre>
                </p>
                <p>nomes
                    <pre>{JSON.stringify(this.state.nomes, null, 2)}</pre>
                </p>
                <p>dadosDemograficos
                    <pre>{JSON.stringify(this.state.dadosDemograficos, null, 2)}</pre>
                </p>
                <p>enderecos
                    <pre>{JSON.stringify(this.state.enderecos, null, 2)}</pre>
                </p>
                <ComunicacoesEletronica data={this.state.comunicacoesEletronica}/>
                <p>vinculos
                    <pre>{JSON.stringify(this.state.vinculos, null, 2)}</pre>
                </p>
            </div>
        );
    }
}

ReactDOM.render(<Main url="../data/modeloDeDados.json" />, document.getElementById("index"));
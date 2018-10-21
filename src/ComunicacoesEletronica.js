import React from "react";
import ReactDOM from "react-dom";
import { FormGroup } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

class ComunicacoesEletronica extends React.Component {
    constructor(props) {
        super(props);
        this.skull = {
            meioDeComunicacao: '',
            preferenciaContato: '',
            detalhes: '',
            codigoUtilizacao: ''
        };
        console.log(props);
        this.state = {
            data: [this.skull]
        };
    }
    componentWillReceiveProps(newProps) {
        this.setState({data: newProps.data});
    }
    addFields() {
        this.setState({data: this.state.data.concat([this.skull])});
    }
    
    render() {
        return (
            <div>
                <h2>Comunicações Eletronica</h2>
                <form>
                    {
                        this.state.data.map((comunicacoesEletronica, count) => (
                            <FormGroup>
                                <label for={"un" + count + 1}>Username</label>
                                <br />
                                <input type="text" id={"un" + count + 1} name="n" value={comunicacoesEletronica.codigoUtilizacao} />
                                <br />
                                <label for={"psw" + count + 1}>Senha</label>
                                <br />
                                <input type="password" id={"psw" + count + 1} name="s" />
                                <br />
                            </FormGroup>))
                    }
                    <Button onClick={() => { this.addFields() }}>add</Button>
                </form>
            </div>
        );
    }
}
module.exports = ComunicacoesEletronica;
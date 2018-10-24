import React from "react";
import ReactDOM from "react-dom";
import { Col } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';


class WriteField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            meioDeComunicacao: '',
            preferenciaContato: '',
            detalhes: '',
            codigoUtilizacao: ''
        };
        this.handleMeioChange = this.handleMeioChange.bind(this);
        this.handleDetalheChange = this.handleDetalheChange.bind(this);
        this.handlePreferenciaChange = this.handlePreferenciaChange.bind(this);
        this.handleUtilizacaoChange = this.handleUtilizacaoChange.bind(this);
    };
    componentWillReceiveProps(newProps) {
        this.setState(newProps.data);
    };
    handleMeioChange(e) {
        console.log(e.target.value);
        this.setState({ meioDeComunicacao: e.target.value });
    };
    handleDetalheChange(e) {
        console.log(e.target.value);
        this.setState({ detalhes: e.target.value });
    };
    handlePreferenciaChange(e) {
        console.log(e.target.value);
        this.setState({ preferenciaContato: e.target.value });
    };
    handleUtilizacaoChange(e) {
        console.log(e.target.value);
        this.setState({ codigoUtilizacao: e.target.value });
    };
    render() {
        const meios = ['Telefone', 'Celular', 'Fax', 'Pager', 'Email', 'URL', 'Outro'];
        return (
            <FormGroup controlId={this.props.id + this.props.count}>
                <ControlLabel>Meio</ControlLabel><br />
                <FormControl componentClass="select" onChange={this.handleMeioChange} value={this.state.meioDeComunicacao}>
                    <option value={1}>Telefone</option>
                    <option value={2}>Celular</option>
                    <option value={3}>Fax</option>
                    <option value={3}>Pager</option>
                    <option value={4}>Email</option>
                    <option value={5}>URL</option>
                    <option value={6}>Outro</option>
                </FormControl>

                <ControlLabel>{ meios[this.state.meioDeComunicacao - 1] }</ControlLabel><br />
                <FormControl
                    type="text"
                    placeholder="(xx) xxxx-xxxx"
                    onChange={this.handleDetalheChange}
                    value={this.state.detalhes}
                />

                <ControlLabel>Preferência</ControlLabel><br />
                <FormControl componentClass="select" 
                    onChange={this.handlePreferenciaChange} value={this.state.preferenciaContato}>
                    <option value="A">Horário comercial</option>
                    <option value="B">Durante o dia</option>
                    <option value="C">Finais de semana</option>
                    <option value="D">Qualquer hora</option>
                    <option value="E">Peíodo noturno</option>
                </FormControl>

                <ControlLabel>Utilização</ControlLabel><br />
                <FormControl componentClass="select" 
                    onChange={this.handleUtilizacaoChange} value={this.state.codigoUtilizacao}>
                    <option value="Comercial">Comercial</option>
                    <option value="Pessoal">Pessoal</option>
                    <option value="Comercial e Pessoal">Comercial e Pessoal</option>
                </FormControl>
            </FormGroup>
        );
    };
}
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
        this.setState({ data: newProps.data });
    }
    addFields() {
        this.setState({ data: this.state.data.concat([this.skull]) });
    }

    render() {
        return (
            <div>
                <h2>Comunicações Eletronica</h2>
                <Form >
                    {
                        this.state.data.map((comunicacoesEletronica, count) => (
                            <WriteField
                                id="comunicacoesEletronica"
                                count={count}
                                data={comunicacoesEletronica}
                            />
                        ))
                    }
                    <Button onClick={() => { this.addFields() }}>add</Button>
                </Form>
            </div>
        );
    }
}
module.exports = ComunicacoesEletronica;
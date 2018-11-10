import React from "react";
import { Form } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import './comunicacoes.css';


class WriteField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            meioDeComunicacao: 1,
            preferenciaContato: "A",
            detalhes: '',
            codigoUtilizacao: "Comercial"
        };
        this.handleMeioChange = this.handleMeioChange.bind(this);
        this.handleDetalheChange = this.handleDetalheChange.bind(this);
        this.handlePreferenciaChange = this.handlePreferenciaChange.bind(this);
        this.handleUtilizacaoChange = this.handleUtilizacaoChange.bind(this);
        this.remove = this.remove.bind(this);
    };
    componentWillReceiveProps(newProps) {
        this.setState(newProps.data);
    };
    handleMeioChange(e) {
        this.state['meioDeComunicacao'] = e.target.value;
        this.setState(this.state);
        this.props.onDataChange(this.props.count, this.state);
    };
    handleDetalheChange(e) {
        this.state['detalhes'] = e.target.value;
        this.setState(this.state);
        this.props.onDataChange(this.props.count, this.state);
    };
    handlePreferenciaChange(e) {
        this.state['preferenciaContato'] = e.target.value;
        this.setState(this.state);
        this.props.onDataChange(this.props.count, this.state);
    };
    handleUtilizacaoChange(e) {
        this.state['codigoUtilizacao'] = e.target.value;
        this.setState(this.state);
        this.props.onDataChange(this.props.count, this.state);
    };
    remove() {
        this.props.onRemove(this.props.count);
    }
    render() {
        const meios = ['Telefone', 'Celular', 'Fax', 'Pager', 'Email', 'URL', 'Outro'];
        return (
            <FormGroup controlId={this.props.id + this.props.count}>
                <div className="form item">
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
                </div>

                <div className="form item">
                    <ControlLabel>{meios[this.state.meioDeComunicacao - 1]}</ControlLabel><br />
                    <FormControl
                        className="input text"
                        type="text"
                        placeholder="(xx) xxxx-xxxx"
                        onChange={this.handleDetalheChange}
                        value={this.state.detalhes}
                    />
                </div>

                <div className="form item">
                <ControlLabel>Preferência</ControlLabel><br />
                <FormControl componentClass="select"
                    onChange={this.handlePreferenciaChange} value={this.state.preferenciaContato}>
                    <option value="A">Horário comercial</option>
                    <option value="B">Durante o dia</option>
                    <option value="C">Finais de semana</option>
                    <option value="D">Qualquer hora</option>
                    <option value="E">Peíodo noturno</option>
                </FormControl>
                </div>

                <div className="form item">
                <ControlLabel>Utilização</ControlLabel><br />
                <FormControl componentClass="select"
                    onChange={this.handleUtilizacaoChange} value={this.state.codigoUtilizacao}>
                    <option value="Comercial">Comercial</option>
                    <option value="Pessoal">Pessoal</option>
                    <option value="Comercial e Pessoal">Comercial e Pessoal</option>
                </FormControl>
                </div>
                <Button className="btn cicle delete" onClick={this.remove}>&#10008;</Button>
            </FormGroup>
        );
    };
}
class ComunicacoesEletronica extends React.Component {
    constructor(props) {
        super(props);
        this.key = 'comunicacoesEletronica';
        this.skull = {
            meioDeComunicacao: 1,
            preferenciaContato: '',
            detalhes: '',
            codigoUtilizacao: ''
        };
        this.state = {
            data: []
        };
        this.addFields = this.addFields.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.updateList = this.updateList.bind(this);
    }
    componentWillReceiveProps(newProps) {
        console.log(JSON.parse(sessionStorage.getItem(this.key)));
        if(sessionStorage.hasOwnProperty(this.key)) {
            // get the key's value from sessionStorage
            let value = sessionStorage.getItem(this.key);
            // parse the sessionStorage string and setState
            try {
                value = JSON.parse(value);
                this.setState({ data: value });
            } catch (e) {
                // handle empty string
                this.setState({ data: newProps.data });
            }
        }
    }
    addFields() {
        this.setState({ data: this.state.data.concat([this.skull]) });
        sessionStorage.setItem('comunicacoesEletronica', JSON.stringify(this.state.data));
    }
    onSubmit() {
        sessionStorage.setItem('comunicacoesEletronica', JSON.stringify(this.state.data));
    }
    onRemove(index) {
        this.state.data.splice(index, 1);
        this.setState(this.state);
    }
    updateList(count, data) {
        this.state.data[count] = data;
        this.setState(this.state);
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
                                data={comunicacoesEletronica}
                                count={count}
                                onRemove={this.onRemove}
                                onDataChange={this.updateList}
                            />
                        ))
                    }
                    <div className="center">
                    <Button className='btn cicle save' onClick={this.onSubmit}>&#10004;</Button>
                    <Button className='btn cicle add' onClick={() => { this.addFields() }}>&#43;</Button>
                    </div>
                </Form>
                <div className="clear"/>
            </div>
        );
    }
}

export default ComunicacoesEletronica;
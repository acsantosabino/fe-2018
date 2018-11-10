import React from "react";
import { Form } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import DatePicker from 'react-date-picker';


class WriteField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            identificadorVinculo: '',
            relacionamentoVinculo: 254,
            dataInicialVinculo: new Date(),
            dataFinalVinculo: new Date()
        };
        this.handleIdentificadorVinculoChange = this.handleIdentificadorVinculoChange.bind(this);
        this.handleRelacionamentoVinculoChange = this.handleRelacionamentoVinculoChange.bind(this);
        this.handleDataInicialVinculoChange = this.handleDataInicialVinculoChange.bind(this);
        this.handleDataFinalVinculoChange = this.handleDataFinalVinculoChange.bind(this);
        this.remove = this.remove.bind(this);
    };
    componentWillReceiveProps(newProps) {
        this.setState(JSON.parse(sessionStorage.getItem('vinculos'))[newProps.count]);
    };
    handleIdentificadorVinculoChange(e) {
        console.log(e.target.value);
        this.state['identificadorVinculo'] = e.target.value;
        this.setState(this.state);
        this.props.onDataChange(this.props.count, this.state);
    };
    handleRelacionamentoVinculoChange(e) {
        console.log(e.target.value);
        this.state['relacionamentoVinculo'] = e.target.value;
        this.setState(this.state);
        this.props.onDataChange(this.props.count, this.state);
    };
    handleDataInicialVinculoChange(date) {
        console.log(date);
        this.state['dataInicialVinculo'] = new Date(date);
        this.setState(this.state);
        this.props.onDataChange(this.props.count, this.state);
    };
    handleDataFinalVinculoChange(date) {
        console.log(date);
        this.state['dataFinalVinculo'] = new Date(date);
        this.setState(this.state);
        this.props.onDataChange(this.props.count, this.state);
    };
    remove() {
        this.props.onRemove(this.props.count);
    }
    render() {
        return (
            <FormGroup controlId={this.props.id + this.props.count}>

            <div className="form item">
                <ControlLabel>Identificador do Vinculo</ControlLabel><br />
                <FormControl
                    type="text"
                    className="input text"
                    onChange={this.handleIdentificadorVinculoChange}
                    value={this.state.identificadorVinculo}
                />
                </div>

                <div className="form item">
                <ControlLabel>Relacionamento</ControlLabel><br />
                <FormControl componentClass="select" onChange={this.handleRelacionamentoVinculoChange} value={this.state.relacionamentoVinculo}>
                    <option value={7}>Avó materna</option>
                    <option value={8}>Avô materno</option>
                    <option value={22}>Cônjugue</option>
                    <option value={23}>Irmão</option>
                    <option value={24}>Irmã</option>
                    <option value={25}>Meio-irmão</option>
                    <option value={26}>Meio-irmã</option>
                    <option value={27}>Irmãos</option>
                    <option value={28}>Criança</option>
                    <option value={29}>Filha</option>
                    <option value={36}>Avó paterna</option>
                    <option value={37}>Avô paterno</option>
                    <option value={38}>Tio materno</option>
                    <option value={40}>Tio paterno</option>
                    <option value={41}>Tia paterna</option>
                    <option value={939}>Tia materna</option>
                    <option value={189}>Recém-nascido</option>
                    <option value={254}>Pais</option>
                    <option value={262}>Mãe Adotiva</option>
                    <option value={263}>Pai Adotivo</option>
                    <option value={264}>Responsável</option>
                    <option value={265}>Coabitante</option>
                </FormControl>
                </div>

                <div className="form item">
                <ControlLabel>Data de Início</ControlLabel><br />
                <DatePicker
                    id="dataInicialVinculo"
                    onChange={this.handleDataInicialVinculoChange}
                    value={this.state.dataInicialVinculo}
                />
                </div>

                <div className="form item">
                <ControlLabel>Data de Fim</ControlLabel><br />
                <DatePicker
                    id="dataFinalVinculo"
                    onChange={this.handleDataFinalVinculoChange}
                    value={this.state.dataFinalVinculo}
                />
                </div>
                <Button className="btn cicle delete" onClick={this.remove}>&#10008;</Button>
            </FormGroup>
        );
    };
}
class Vinculos extends React.Component {
    constructor(props) {
        super(props);
        this.skull = {
            identificadorVinculo: '',
            relacionamentoVinculo: 254,
            dataInicialVinculo: '',
            dataFinalVinculo: ''
        };
        this.state = {
            data: []
        };
        this.setState({ data: JSON.parse(sessionStorage.getItem('vinculos')) ? JSON.parse(sessionStorage.getItem('vinculos')) : [] });
        this.addFields = this.addFields.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.updateList = this.updateList.bind(this);
    }
    componentDidMount() {
        this.setState({ data: JSON.parse(sessionStorage.getItem('vinculos')) ? JSON.parse(sessionStorage.getItem('vinculos')) : [] });
        window.addEventListener('storage', this.onSubmit);
    }
    addFields() {
        this.setState({ data: this.state.data.concat([this.skull]) });
        sessionStorage.setItem('vinculos', JSON.stringify(this.state.data));
    }
    onSubmit() {
        sessionStorage.setItem('vinculos', JSON.stringify(this.state.data));
    }
    onRemove(index) {
        this.state.data.splice(index, 1);
        this.setState(this.state);
    }
    updateList(count, data) {
        this.state.data[count] = data;
        console.log(this.state.data[count]);
        this.setState(this.state);
    }

    render() {
        console.log(this.state);
        return (
            <div>
                <h2>Vínculos</h2>
                <Form >
                    {
                        this.state.data.map((vinculos, count) => (
                            <WriteField
                                id="vinculos"
                                count={count}
                                onRemove={this.onRemove}
                                onDataChange={this.updateList}
                            />
                            ))
                        }
                        <div className="clear"/>
                        <div className="center">
                    <Button className='btn cicle save' onClick={this.onSubmit}>&#10004;</Button>
                    <Button className='btn cicle add' onClick={() => { this.addFields() }}>&#43;</Button>
                    </div>
                </Form>
            </div>
        );
    }
}

export default Vinculos;
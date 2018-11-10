import React, {Component} from 'react'
import {Button, Table} from 'react-bootstrap'
import EnderecoForm from './enderecoForm.jsx'


export default class Endereco extends Component {

    constructor(props){
        super(props);
        this.state = {
            dados: [],
        };

        this.handleDados = this.handleDados.bind(this)
        this.remove = this.remove.bind(this)
    }

    handleDados(dados) {
        let temp = [...this.state.dados];
        temp.push(dados)
        this.setState({dados:temp});
    }

    remove(value) {
        let data = [...this.state.dados]
        let index = data.findIndex(v => v === value)
        data = data.slice(index, 1)
        this.setState({dados:data})
    }

    render() {
        const rows = this.state.dados.map((value, index) => {
            return(
                <tr>
                    <td>{value.tipoEndereco || ' - '}</td>
                    <td>{value.pais || ' - '}</td>
                    <td>{value.estado || ' - '}</td>
                    <td>{value.cidade || ' - '}</td>
                    <td>{value.bairro || ' - '}</td>
                    <td>{value.endereco || ' - '}</td>
                    <td><Button className="btn cicle delete" onClick={()=>this.remove(value)}>&#10008;</Button></td>
                </tr>
            )
        })
        return (
            <div>
                <EnderecoForm enderecoSalvo={this.handleDados} />

                <Table striped bordered condensed hover>
                    <thead>
                    <tr>
                        <th>Tipo Endereco</th>
                        <th>Pais</th>
                        <th>Estado</th>
                        <th>Cidade</th>
                        <th>Bairro</th>
                        <th>Endereco</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows}
                    </tbody>
                </Table>;
            </div>
        )
    }
}

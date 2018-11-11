import React, {Component} from 'react'
import {RadioGroup, Radio, Grid, FormControl, FormControlLabel, InputLabel, Select, MenuItem, TextField} from '@material-ui/core'
import DatePicker from "react-datepicker";
import moment from "moment";
import If from './if'
import {localidades, tiposEnderecoValue} from "./localidades";
import "react-datepicker/dist/react-datepicker.css";

export default class Endereco extends Component {



    constructor(props) {
        super(props);
        this.state = {
            dataInicial: moment(),
            indicadorDeAcuraciaInicial: '',
            dataFinal: moment(),
            indicadorDeAcuraciaFinal: '',
            tipoEndereco: 'Residencial',
            continente: 'America do Sul',
            pais: 'Brasil',
            paisRadio: 'Brasil',
            estado: 'Goiás',
            cidade: 'Goiânia',
            caixaPostal: '',
            cep: '',
            bairro: '',
            distrito: '',
            endereco: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeDataInicial = this.handleChangeDataInicial.bind(this);
        this.handleChangeDataFinal = this.handleChangeDataFinal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeTextField = this.handleChangeTextField.bind(this);
        this.updateSessionStorage = this.updateSessionStorage.bind(this);

    }

    updateSessionStorage(){
        sessionStorage.setItem('endereco',JSON.stringify(this.state))
    }

    handleChange = event => {
        let clone = Object.assign({},this.state)
        clone[event.target.name] = event.target.value
        this.setState({[event.target.name]: clone[event.target.name]},()=> this.updateSessionStorage())
    };

    handleChangeDataInicial = event => {
        let clone = Object.assign({},this.state)
        clone.dataInicial = event;
        this.setState({dataInicial: event},()=> this.updateSessionStorage())
    };

    handleChangeDataFinal = event => {
        let clone = Object.assign({},this.state)
        clone.dataFinal = event;
        this.setState({dataFinal: event},()=> this.updateSessionStorage())
    };

    handleChangeTextField = name => event => {
        let clone = Object.assign({},this.state)
        clone[name] = event.target.value
        this.setState({[name]: clone[name]},()=> this.updateSessionStorage())
    };

    render(){
        const tiposEndereco = tiposEnderecoValue.map(v => <MenuItem key={v} value={v} >{v}</MenuItem>)
        const continentes = <MenuItem value={'America do Sul'} >America do Sul</MenuItem>
        const paises = <MenuItem value={'Brasil'} >Brasil</MenuItem>
        const estados = localidades.map(v => <MenuItem key={v.nome} value={v.nome} >{v.nome}</MenuItem>)
        const cidades = localidades.filter(v => v.nome === this.state.estado).map(v => v.cidades.map(v => <MenuItem key={v} value={v} >{v}</MenuItem>))
        return (
            <React.Fragment>
                <form>
        <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>

                <h3>Data Inicial</h3>
                <DatePicker style={{minWidth: '100%'}}
                    selected={this.state.dataInicial}
                    onChange={this.handleChangeDataInicial}
                />

                <h3> Indicador de acurácia </h3>

                <RadioGroup name="indicadorDeAcuraciaInicial" value={this.state.indicadorDeAcuraciaInicial} onChange={this.handleChange} style={{minWidth: '100%'}}>

                    <h5>Dia:</h5>
                        <FormControlLabel value="acuradoDia" control={<Radio color="primary" />} label="Acurado" />
                        <FormControlLabel value="estimadoDia" control={<Radio color="primary" />} label="Estimado" />
                        <FormControlLabel value="desconhecidoDia" control={<Radio color="primary" />} label="Desconhecido" />


                    <h5>Mes:</h5>
                        <FormControlLabel value="acuradoMes" control={<Radio color="primary" />} label="Acurado" />
                        <FormControlLabel value="estimadoMes" control={<Radio color="primary" />} label="Estimado" />
                        <FormControlLabel value="desconhecidoMes" control={<Radio color="primary" />} label="Desconhecido" />


                   <h5>Ano:</h5>
                        <FormControlLabel value="acuradoAno" control={<Radio color="primary" />} label="Acurado" />
                        <FormControlLabel value="estimadoAno" control={<Radio color="primary" />} label="Estimado" />
                        <FormControlLabel value="desconhecidoAno" control={<Radio color="primary" />} label="Desconhecido" />

                </RadioGroup>

            </Grid>

            <Grid item xs={12} sm={6}>
                <h3>Data Final</h3>
                <DatePicker style={{minWidth: '100%'}}
                    selected={this.state.dataFinal}
                    onChange={this.handleChangeDataFinal}
                />

                <h3> Indicador de acurácia </h3>

                <RadioGroup name="indicadorDeAcuraciaFinal" value={this.state.indicadorDeAcuraciaFinal} onChange={this.handleChange} style={{minWidth: '100%'}}>
                    <h5>Dia:</h5>
                    <FormControlLabel value="acuradoDia" control={<Radio color="primary" />} label="Acurado" />
                    <FormControlLabel value="estimadoDia" control={<Radio color="primary" />} label="Estimado" />
                    <FormControlLabel value="desconhecidoDia" control={<Radio color="primary" />} label="Desconhecido" />


                    <h5>Mes:</h5>
                    <FormControlLabel value="acuradoMes" control={<Radio color="primary" />} label="Acurado" />
                    <FormControlLabel value="estimadoMes" control={<Radio color="primary" />} label="Estimado" />
                    <FormControlLabel value="desconhecidoMes" control={<Radio color="primary" />} label="Desconhecido" />


                    <h5>Ano:</h5>
                    <FormControlLabel value="acuradoAno" control={<Radio color="primary" />} label="Acurado" />
                    <FormControlLabel value="estimadoAno" control={<Radio color="primary" />} label="Estimado" />
                    <FormControlLabel value="desconhecidoAno" control={<Radio color="primary" />} label="Desconhecido" />
                </RadioGroup>
            </Grid>

        </Grid>

                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <FormControl style={{minWidth: '100%'}}>
                        <InputLabel htmlFor={'tipoEndereco'} > Tipo Endereco </InputLabel>
                        <Select value={this.state.tipoEndereco} onChange={this.handleChange} inputProps={{name: 'tipoEndereco', id:'tipoEndereco'}}>
                            {tiposEndereco}
                        </Select>
                    </FormControl>
                </Grid>

                    <RadioGroup name="paisRadio" value={this.state.paisRadio} onChange={this.handleChange} style={{minWidth: '100%'}}>
                        <h5>Pais:</h5>
                        <FormControlLabel value="Brasil" control={<Radio color="primary" />} label="Brasil" />
                        <FormControlLabel value="Outro" control={<Radio color="primary" />} label="Outro" />
                    </RadioGroup>

                </Grid>

                    <If test={this.state.paisRadio !== 'Brasil'} >
                        <Grid container spacing={24}>

                            <Grid item xs={12} sm={6}>
                                <FormControl style={{minWidth: '100%'}}>
                                    <InputLabel htmlFor={'continente'} > Continente</InputLabel>
                                    <Select value={this.state.continente} onChange={this.handleChange} inputProps={{name: 'continente', id:'continente'}}>
                                        {continentes}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl style={{minWidth: '100%'}}>
                                    <InputLabel htmlFor={'pais'} > Pais</InputLabel>
                                    <Select value={this.state.pais} onChange={this.handleChange} inputProps={{name: 'pais', id:'pais'}}>
                                        {paises}
                                    </Select>
                                </FormControl>
                            </Grid>

                        </Grid>
                    </If>

                    <Grid container spacing={24}>
                    <Grid item xs={12} sm={6}>
                        <FormControl style={{minWidth: '100%'}}>
                            <InputLabel htmlFor={'estado'}> Estado</InputLabel>
                            <Select value={this.state.estado} onChange={this.handleChange} inputProps={{name: 'estado', id:'estado'}}>
                                {estados}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormControl style={{minWidth: '100%'}}>
                            <InputLabel htmlFor={'cidade'}> Cidade</InputLabel>
                            <Select value={this.state.cidade} onChange={this.handleChange} inputProps={{name: 'cidade', id:'cidade'}}>
                                {cidades}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                    <TextField
                        id="caixaPostal"
                        label="Caixa Postal"
                        value={this.state.caixaPostal}
                        onChange={this.handleChangeTextField('caixaPostal')}
                        margin="normal"
                        style={{minWidth: '100%'}}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        id="Cep"
                        label="Cep"
                        value={this.state.Cep}
                        onChange={this.handleChangeTextField('Cep')}
                        margin="normal"
                        style={{minWidth: '100%'}}
                    />
                    </Grid>
                        <Grid item xs={12} sm={6}>
                    <TextField
                        id="Bairro"
                        label="Bairro"
                        value={this.state.Bairro}
                        onChange={this.handleChangeTextField('Bairro')}
                        margin="normal"
                        style={{minWidth: '100%'}}
                    />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                    <TextField
                        id="Distrito"
                        label="Distrito"
                        value={this.state.Distrito}
                        onChange={this.handleChangeTextField('Distrito')}
                        margin="normal"
                        style={{minWidth: '100%'}}
                    />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                    <TextField
                        id="Endereco"
                        label="Endereco"
                        value={this.state.Endereco}
                        onChange={this.handleChangeTextField('Endereco')}
                        margin="normal"
                        style={{minWidth: '100%'}}
                    />
                        </Grid>
                    </Grid>

                </form>
            </React.Fragment>
        )

}
        }

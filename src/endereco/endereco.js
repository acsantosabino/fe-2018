import React from 'react'
import { RadioGroup, Radio, Grid, FormControl, FormControlLabel, InputLabel, Select, MenuItem, TextField } from '@material-ui/core'
import If from './if'
import { localidades, tiposEnderecoValue } from "./localidades";
// import "react-datepicker/dist/react-datepicker.css";

const replaceStr = function (str, pos, value) {
    var arr = str.split('');
    console.log('b:' + arr)
    arr[pos] = value;
    console.log('a:' + arr)
    return arr.join('');
}

export default class Endereco extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataInicial: '',
            indicadorDeAcuraciaInicial: '',
            dataFinal: '',
            indicadorAcuraciaDataInicial: "AAA",
            indicadorAcuraciaDataFinal: "AAA",
            tipoEndereco: 'Residencial',
            continente: 'America do Sul',
            pais: 'Brasil',
            paisRadio: 'Brasil',
            estado: 'Goiás',
            municipio: 'Goiânia',
            caixaPostal: '',
            cep: '',
            bairro: '',
            distrito: '',
            endereco: '',
        };
        this.key = 'enderecos';
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeAccDia = this.handleChangeAccDia.bind(this);
        this.handleChangeAccMes = this.handleChangeAccMes.bind(this);
        this.handleChangeAccAno = this.handleChangeAccAno.bind(this);
        this.handleChangeDataInicial = this.handleChangeDataInicial.bind(this);
        this.handleChangeDataFinal = this.handleChangeDataFinal.bind(this);
        this.handleChangeTextField = this.handleChangeTextField.bind(this);
        this.updateSessionStorage = this.updateSessionStorage.bind(this);

    }
    componentDidMount() {
        console.log(JSON.parse(sessionStorage.getItem(this.key)));
        if (sessionStorage.hasOwnProperty(this.key)) {
            // get the key's value from sessionStorage
            let value = sessionStorage.getItem(this.key);
            // parse the sessionStorage string and setState
            try {
                value = JSON.parse(value);
                this.setState(value);
            } catch (e) {
                // handle empty string
                this.setState(this.props.data);
            }
        }
        else {
            this.setState({ data: this.props.data });
            sessionStorage.setItem(this.key, JSON.stringify(this.props.data));
        }
    }

    updateSessionStorage() {
        sessionStorage.setItem(this.key, JSON.stringify(this.state))
    }

    handleChange = event => {
        let clone = Object.assign({}, this.state)
        clone[event.target.name] = event.target.value
        this.setState({ [event.target.name]: clone[event.target.name] }, () => this.updateSessionStorage())
    };
    handleChangeAccDia = event => {
        let clone = Object.assign({}, this.state)
        clone[event.target.name] = replaceStr(clone[event.target.name], 0, event.target.value);
        this.setState({ [event.target.name]: clone[event.target.name] }, () => this.updateSessionStorage())
    };
    handleChangeAccMes = event => {
        let clone = Object.assign({}, this.state)
        clone[event.target.name] = replaceStr(clone[event.target.name], 1, event.target.value);
        this.setState({ [event.target.name]: clone[event.target.name] }, () => this.updateSessionStorage())
    };
    handleChangeAccAno = event => {
        let clone = Object.assign({}, this.state)
        clone[event.target.name] = replaceStr(clone[event.target.name], 2, event.target.value);
        this.setState({ [event.target.name]: clone[event.target.name] }, () => this.updateSessionStorage())
    };

    handleChangeDataInicial = event => {
        let clone = Object.assign({}, this.state)
        console.log(clone['dataInicial']);
        clone.dataInicial = event;
        console.log(clone['dataInicial']);
        this.setState({ dataInicial: event }, () => this.updateSessionStorage())
    };

    handleChangeDataFinal = event => {
        let clone = Object.assign({}, this.state)
        clone.dataFinal = event;
        this.setState({ dataFinal: event }, () => this.updateSessionStorage())
    };

    handleChangeTextField = name => event => {
        let clone = Object.assign({}, this.state)
        clone[name] = event.target.value
        this.setState({ [name]: clone[name] }, () => this.updateSessionStorage())
    };

    render() {
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

                            <TextField
                                style={{ minWidth: '100%' }}
                                name="dataInicial"
                                label="Data de Inicial"
                                type="date"
                                value={this.state.dataInicial}
                                onChange={this.handleChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />

                            <h3> Indicador de acurácia </h3>

                            <RadioGroup name="indicadorAcuraciaDataInicial" value={this.state.indicadorAcuraciaDataInicial[0]} onChange={this.handleChangeAccDia} style={{ minWidth: '100%' }}>
                                <h5>Dia:</h5>
                                <FormControlLabel value="A" control={<Radio color="primary" />} label="Acurado" />
                                <FormControlLabel value="E" control={<Radio color="primary" />} label="Estimado" />
                                <FormControlLabel value="D" control={<Radio color="primary" />} label="Desconhecido" />
                            </RadioGroup>

                            <RadioGroup name="indicadorAcuraciaDataInicial" value={this.state.indicadorAcuraciaDataInicial[1]} onChange={this.handleChangeAccMes} style={{ minWidth: '100%' }}>
                                <h5>Mes:</h5>
                                <FormControlLabel value="A" control={<Radio color="primary" />} label="Acurado" />
                                <FormControlLabel value="E" control={<Radio color="primary" />} label="Estimado" />
                                <FormControlLabel value="D" control={<Radio color="primary" />} label="Desconhecido" />
                            </RadioGroup>

                            <RadioGroup name="indicadorAcuraciaDataInicial" value={this.state.indicadorAcuraciaDataInicial[2]} onChange={this.handleChangeAccAno} style={{ minWidth: '100%' }}>
                                <h5>Ano:</h5>
                                <FormControlLabel value="A" control={<Radio color="primary" />} label="Acurado" />
                                <FormControlLabel value="E" control={<Radio color="primary" />} label="Estimado" />
                                <FormControlLabel value="D" control={<Radio color="primary" />} label="Desconhecido" />

                            </RadioGroup>

                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                style={{ minWidth: '100%' }}
                                name="dataFinal"
                                label="Data de Inicial"
                                type="date"
                                value={this.state.dataFinal}
                                onChange={this.handleChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />

                            <h3> Indicador de acurácia </h3>

                            <RadioGroup name="indicadorAcuraciaDataFinal" value={this.state.indicadorAcuraciaDataFinal[0]} onChange={this.handleChangeAccDia} style={{ minWidth: '100%' }}>
                                <h5>Dia:</h5>
                                <FormControlLabel value="A" control={<Radio color="primary" />} label="Acurado" />
                                <FormControlLabel value="E" control={<Radio color="primary" />} label="Estimado" />
                                <FormControlLabel value="D" control={<Radio color="primary" />} label="Desconhecido" />
                            </RadioGroup>

                            <RadioGroup name="indicadorAcuraciaDataFinal" value={this.state.indicadorAcuraciaDataFinal[1]} onChange={this.handleChangeAccMes} style={{ minWidth: '100%' }}>
                                <h5>Mes:</h5>
                                <FormControlLabel value="A" control={<Radio color="primary" />} label="Acurado" />
                                <FormControlLabel value="E" control={<Radio color="primary" />} label="Estimado" />
                                <FormControlLabel value="D" control={<Radio color="primary" />} label="Desconhecido" />
                            </RadioGroup>

                            <RadioGroup name="indicadorAcuraciaDataFinal" value={this.state.indicadorAcuraciaDataFinal[2]} onChange={this.handleChangeAccAno} style={{ minWidth: '100%' }}>
                                <h5>Ano:</h5>
                                <FormControlLabel value="A" control={<Radio color="primary" />} label="Acurado" />
                                <FormControlLabel value="E" control={<Radio color="primary" />} label="Estimado" />
                                <FormControlLabel value="D" control={<Radio color="primary" />} label="Desconhecido" />
                            </RadioGroup>
                        </Grid>

                    </Grid>

                    <Grid container>
                        <Grid item xs={12} sm={6}>
                            <FormControl style={{ minWidth: '100%' }}>
                                <InputLabel htmlFor={'tipoEndereco'} > Tipo Endereco </InputLabel>
                                <Select value={this.state.tipoEndereco} onChange={this.handleChange} inputProps={{ name: 'tipoEndereco', id: 'tipoEndereco' }}>
                                    {tiposEndereco}
                                </Select>
                            </FormControl>
                        </Grid>

                        <RadioGroup name="paisRadio" value={this.state.paisRadio} onChange={this.handleChange} style={{ minWidth: '100%' }}>
                            <h5>Pais:</h5>
                            <FormControlLabel value="Brasil" control={<Radio color="primary" />} label="Brasil" />
                            <FormControlLabel value="Outro" control={<Radio color="primary" />} label="Outro" />
                        </RadioGroup>

                    </Grid>

                    <If test={this.state.paisRadio !== 'Brasil'} >
                        <Grid container spacing={24}>

                            <Grid item xs={12} sm={6}>
                                <FormControl style={{ minWidth: '100%' }}>
                                    <InputLabel htmlFor={'continente'} > Continente</InputLabel>
                                    <Select value={this.state.continente} onChange={this.handleChange} inputProps={{ name: 'continente', id: 'continente' }}>
                                        {continentes}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl style={{ minWidth: '100%' }}>
                                    <InputLabel htmlFor={'pais'} > Pais</InputLabel>
                                    <Select value={this.state.pais} onChange={this.handleChange} inputProps={{ name: 'pais', id: 'pais' }}>
                                        {paises}
                                    </Select>
                                </FormControl>
                            </Grid>

                        </Grid>
                    </If>

                    <Grid container spacing={24}>
                        <Grid item xs={12} sm={6}>
                            <FormControl style={{ minWidth: '100%' }}>
                                <InputLabel htmlFor={'estado'}> Estado</InputLabel>
                                <Select value={this.state.estado} onChange={this.handleChange} inputProps={{ name: 'estado', id: 'estado' }}>
                                    {estados}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl style={{ minWidth: '100%' }}>
                                <InputLabel htmlFor={'municipio'}>Municipio</InputLabel>
                                <Select value={this.state.municipio} onChange={this.handleChange} inputProps={{ name: 'cidade', id: 'cidade' }}>
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
                                style={{ minWidth: '100%' }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="Cep"
                                label="Cep"
                                value={this.state.cep}
                                onChange={this.handleChangeTextField('cep')}
                                margin="normal"
                                style={{ minWidth: '100%' }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="Bairro"
                                label="Bairro"
                                value={this.state.bairro}
                                onChange={this.handleChangeTextField('bairro')}
                                margin="normal"
                                style={{ minWidth: '100%' }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="Distrito"
                                label="Distrito"
                                value={this.state.distrito}
                                onChange={this.handleChangeTextField('distrito')}
                                margin="normal"
                                style={{ minWidth: '100%' }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="Endereco"
                                label="Endereco"
                                value={this.state.endereco}
                                onChange={this.handleChangeTextField('endereco')}
                                margin="normal"
                                style={{ minWidth: '100%' }}
                            />
                        </Grid>
                    </Grid>

                </form>
            </React.Fragment>
        )

    }
}

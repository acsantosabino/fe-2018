import React, {Component} from 'react'
import {FormGroup, FormControl, ControlLabel, HelpBlock, Button, Radio, Col, Panel, Row, Form,} from 'react-bootstrap'
import axios from 'axios'
import If from './if.jsx'
import DatePicker from 'react-date-picker';



class EnderecoForm extends Component{

    constructor(props) {
        super(props);
        this.state = {
            continentes: [],
            paises: [],
            estados: [],
            cidades: [],
            paisRadioButtonSelecionado: 'Brasil',
            tipoEndereco: '',
            pais: 'Brasil',
            estado: '',
            cidade: '',
            dataInicial: new Date(),
            inicadorDeAcuraciaInicial: '',
            dataFinal: new Date(),
            inicadorDeAcuraciaFinal: '',
            caixaPostal: '',
            cep: '',
            bairro: '',
            distrito: '',
            endereco: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.onChangeDataInicial = this.onChangeDataInicial.bind(this);
        this.onChangeDataFinal = this.onChangeDataFinal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.selecionarTipoEndereco = this.selecionarTipoEndereco.bind(this);
        this.selecionarContinente = this.selecionarContinente.bind(this);
        this.selecionarPais = this.selecionarPais.bind(this);
        this.selecionarEstado = this.selecionarEstado.bind(this);
        this.selecionarCidade = this.selecionarCidade.bind(this);
        this.listarGeonames = this.listarGeonames.bind(this)
        this.listarGeonames('6295630', 'continentes');
        this.listarGeonames('3469034', 'estados');
        let selectContinenteRef;
        let radioPaisRef;
        let selectEstadoRef;
        let selectCidadeRef;
        let selectTipoEnderecoRef;
        let inputCaixaPostal;
        let inputCep;
        let inputBairro;
        let inputDistrito;
        let inputEndereco;


    }
    onChangeDataInicial(date){
        this.setState({ ...this.state, dataInicial:date })
    }
    onChangeDataFinal(date){
        this.setState({ ...this.state, dataFinal:date })
    }

    handleChange(e) {
        if(e.target.name === 'Pais'){ this.setState({...this.state, paisRadioButtonSelecionado: e.target.value, paises: [], estados: [], cidades: []})
            if(e.target.value === 'Brasil'){
                this.listarGeonames('3469034', 'estados')
            }
            return
        }

        this.setState({...this.state,[e.target.name]: e.target.value})
    }

    handleSubmit(e) {
        this.setState({...this.state, caixaPostal: this.inputCaixaPostal.value, cep: this.inputCep.value, bairro: this.inputBairro.value
            ,distrito: this.inputDistrito.value , endereco: this.inputEndereco.value}, ()=>{
            this.props.enderecoSalvo(this.state)
            this.setState({...this.state, continentes: [], paises: [], estados: [], cidades: [], paisRadioButtonSelecionado: 'Brasil', tipoEndereco: '',
                pais: 'Brasil', estado: '', cidade: '', dataInicial: new Date(), inicadorDeAcuraciaInicial: '', dataFinal: new Date(), inicadorDeAcuraciaFinal: '',
                caixaPostal: '', cep: '', bairro: '', distrito: '', endereco: '',})
            this.inputCaixaPostal.value = '';
            this.inputCep.value = '';
            this.inputBairro.value = '';
            this.inputDistrito.value = '';
            this.inputEndereco.value = '';
            this.selectTipoEnderecoRef.value = '';
            e.preventDefault();
        })

    }

    listarGeonames(geoname, indicador){
        let url = `http://www.geonames.org/childrenJSON?geonameId=${geoname}`
        axios.get(url).then(response =>{
            this.setState({[indicador]: response.data.geonames})
        }).catch(e => console.log(e))
    }

    selecionarTipoEndereco(){
        this.setState({...this.state, tipoEndereco: this.selectTipoEnderecoRef.value})
    }

    selecionarContinente(){
        this.listarGeonames(this.selectContinenteRef.value,'paises')
        this.setState({...this.state, paises: [], estados: [], cidades: []})
    }

    selecionarPais(){
        let pais = this.state.paises.find(v=> v.geonameId === +this.selectPaisRef.value)
        this.setState({...this.state, pais: pais.countryName, estados: [], cidades: []})
        this.listarGeonames(this.selectPaisRef.value,'estados')
    }

    selecionarEstado(){
        let estado = this.state.estados.find(v=> v.geonameId === +this.selectEstadoRef.value)
        this.setState({...this.state, estado: estado.toponymName})
        this.listarGeonames(this.selectEstadoRef.value, 'cidades')
    }

    selecionarCidade(){
        let cidade = this.state.cidades.find(v=> v.geonameId === +this.selectCidadeRef.value)
        this.setState({...this.state, cidade: cidade.toponymName})
    }

    render(){
        let tipoEndereco = tipoEnderecoValues.map(tipo => {
            return <option key={tipo} value={tipo} >{tipo}</option>
        });

        let continentes
        if(this.state.continentes !== undefined){
            continentes = this.state.continentes.map(continente => {
                return <option key={continente.geonameId} value={continente.geonameId} >{continente.toponymName}</option>
            });
        }

        let paises
        if(this.state.paises !== undefined){
            paises = this.state.paises.map(pais => {
                return <option key={pais.geonameId} value={pais.geonameId} >{pais.name}</option>
            });
        }
        let estados
        if(this.state.estados !== undefined){
            estados = this.state.estados.map(estado => {
                return <option key={estado.geonameId} value={estado.geonameId} >{estado.toponymName}</option>
            });
        }
        let cidades
        if(this.state.cidades !== undefined){
            cidades = this.state.cidades.map(cidade => {
                return <option key={cidade.geonameId} value={cidade.geonameId} >{cidade.toponymName}</option>
            });

        }


        return(
            <div>
                <h2>Endereco</h2>
                <form>
                    <Col xs={6} md={3}>
                        <ControlLabel className={'negrito margem-esquerda'}> Data Inicial </ControlLabel>
                        <Row/>
                        <DatePicker className={'margem-esquerda '}
                                    onChange={this.onChangeDataInicial}
                                    value={this.state.dataInicial}
                        />
                        <Row/>
                        <ControlLabel className={'negrito margem-esquerda '}> Inicador de acurácia </ControlLabel>

                        <FormGroup className={'border-bottom-none'}>
                            Dia: {' '}
                            <label> Acurado <input type={'radio'} name={'InicadorDeAcuraciaInicial'} value={'AcuradoDia'}  onChange={this.handleChange} checked={this.state.InicadorDeAcuraciaInicial === 'AcuradoDia'} /></label>{' '}
                            <label> Estimado <input type={'radio'} name={'InicadorDeAcuraciaInicial'} value={'EstimadoDia'}  onChange={this.handleChange} checked={this.state.InicadorDeAcuraciaInicial === 'EstimadoDia'} /></label>{' '}
                            <label> Desconhecido <input type={'radio'} name={'InicadorDeAcuraciaInicial'} value={'DesconhecidoDia'}  onChange={this.handleChange} checked={this.state.InicadorDeAcuraciaInicial === 'DesconhecidoDia'} /></label>{' '}
                        </FormGroup>

                        <FormGroup className={'border-bottom-none'}>
                            Mes: {' '}
                            <label> Acurado <input type={'radio'} name={'InicadorDeAcuraciaInicial'} value={'AcuradoMes'}  onChange={this.handleChange} checked={this.state.InicadorDeAcuraciaInicial === 'AcuradoMes'} /></label>{' '}
                            <label> Estimado <input type={'radio'} name={'InicadorDeAcuraciaInicial'} value={'EstimadoMes'}  onChange={this.handleChange} checked={this.state.InicadorDeAcuraciaInicial === 'EstimadoMes'} /></label>{' '}
                            <label> Desconhecido <input type={'radio'} name={'InicadorDeAcuraciaInicial'} value={'DesconhecidoMes'}  onChange={this.handleChange} checked={this.state.InicadorDeAcuraciaInicial === 'DesconhecidoMes'} /></label>{' '}
                        </FormGroup>

                        <FormGroup className={'border-bottom-none'}>
                            Ano: {' '}
                            <label> Acurado <input type={'radio'} name={'InicadorDeAcuraciaInicial'} value={'AcuradoAno'}  onChange={this.handleChange} checked={this.state.InicadorDeAcuraciaInicial === 'AcuradoAno'} /></label>{' '}
                            <label> Estimado <input type={'radio'} name={'InicadorDeAcuraciaInicial'} value={'EstimadoAno'}  onChange={this.handleChange} checked={this.state.InicadorDeAcuraciaInicial === 'EstimadoAno'} /></label>{' '}
                            <label> Desconhecido <input type={'radio'} name={'InicadorDeAcuraciaInicial'} value={'DesconhecidoAno'}  onChange={this.handleChange} checked={this.state.InicadorDeAcuraciaInicial === 'DesconhecidoAno'} /></label>{' '}
                        </FormGroup>
                    </Col>
                    <Col md={2}></Col>
                    <Col xs={6} md={3}  >

                        <ControlLabel className={'negrito margem-esquerda '}> Data Final </ControlLabel>
                        <Row/>
                        <DatePicker className={'margem-esquerda'}
                                    onChange={this.onChangeDataFinal}
                                    value={this.state.dataFinal}
                        />
                        <Row/>
                        <ControlLabel className={'negrito margem-esquerda '}> Inicador de acurácia </ControlLabel>
                        <FormGroup className={'border-bottom-none'}>
                            Dia: {' '}
                            <label> Acurado <input type={'radio'} name={'inicadorDeAcuraciaFinal'} value={'AcuradoDia'}  onChange={this.handleChange} checked={this.state.inicadorDeAcuraciaFinal === 'AcuradoDia'} /></label>{' '}
                            <label> Estimado <input type={'radio'} name={'inicadorDeAcuraciaFinal'} value={'EstimadoDia'}  onChange={this.handleChange} checked={this.state.inicadorDeAcuraciaFinal === 'EstimadoDia'} /></label>{' '}
                            <label> Desconhecido <input type={'radio'} name={'inicadorDeAcuraciaFinal'} value={'DesconhecidoDia'}  onChange={this.handleChange} checked={this.state.inicadorDeAcuraciaFinal === 'DesconhecidoDia'} /></label>{' '}
                        </FormGroup>

                        <FormGroup className={'border-bottom-none'}>
                            Mes: {' '}
                            <label> Acurado <input type={'radio'} name={'inicadorDeAcuraciaFinal'} value={'AcuradoMes'}  onChange={this.handleChange} checked={this.state.inicadorDeAcuraciaFinal === 'AcuradoMes'} /></label>{' '}
                            <label> Estimado <input type={'radio'} name={'inicadorDeAcuraciaFinal'} value={'EstimadoMes'}  onChange={this.handleChange} checked={this.state.inicadorDeAcuraciaFinal === 'EstimadoMes'} /></label>{' '}
                            <label> Desconhecido <input type={'radio'} name={'inicadorDeAcuraciaFinal'} value={'DesconhecidoMes'}  onChange={this.handleChange} checked={this.state.inicadorDeAcuraciaFinal === 'DesconhecidoMes'} /></label>{' '}
                        </FormGroup>

                        <FormGroup className={'border-bottom-none'}>
                            Ano: {' '}
                            <label> Acurado <input type={'radio'} name={'inicadorDeAcuraciaFinal'} value={'AcuradoAno'}  onChange={this.handleChange} checked={this.state.inicadorDeAcuraciaFinal === 'AcuradoAno'} /></label>{' '}
                            <label> Estimado <input type={'radio'} name={'inicadorDeAcuraciaFinal'} value={'EstimadoAno'}  onChange={this.handleChange} checked={this.state.inicadorDeAcuraciaFinal === 'EstimadoAno'} /></label>{' '}
                            <label> Desconhecido <input type={'radio'} name={'inicadorDeAcuraciaFinal'} value={'DesconhecidoAno'}  onChange={this.handleChange} checked={this.state.inicadorDeAcuraciaFinal === 'DesconhecidoAno'} /></label>{' '}

                        </FormGroup>
                    </Col>
                    <Row/>

                    <Col xs={6} md={3}>
                        <FormGroup controlId="formControlsSelect" className={'border-bottom-none'}>
                            <ControlLabel className={'negrito'}>Tipo de Endereco</ControlLabel>
                            <FormControl componentClass="select" inputRef={ref => { this.selectTipoEnderecoRef = ref; }} onChange={this.selecionarTipoEndereco} placeholder="select">
                                <option value="select">Selecione</option>
                                {tipoEndereco}
                            </FormControl>
                        </FormGroup>
                    </Col>
                    <Row/>

                    <Col xs={6} md={3}>
                        <ControlLabel className={'negrito'}> Paìs </ControlLabel> <br/>

                        <label> Brasil <input type={'radio'} name={'Pais'} value={'Brasil'}  onChange={this.handleChange} checked={this.state.paisRadioButtonSelecionado === 'Brasil'} /> </label>{'  '}
                        <label> Outro   <input type={'radio'} name={'Pais'} value={'Outro'}  onChange={this.handleChange} checked={this.state.paisRadioButtonSelecionado === 'Outro'} />  </label>
                    </Col>
                    <Row/>

                    <If test={this.state.paisRadioButtonSelecionado !== 'Brasil'} >
                        <Col xs={6} md={3}>
                            <FormGroup className={'border-bottom-none'} >
                                <ControlLabel className={'negrito'}>Continente</ControlLabel>
                                <FormControl inputRef={ref => { this.selectContinenteRef = ref; }} onChange={this.selecionarContinente} componentClass="select" placeholder="selecione">
                                    <option value="select">Selecione</option>
                                    {continentes}
                                </FormControl>
                            </FormGroup>
                        </Col>

                        <Col xs={6} md={3}>
                            <FormGroup className={'border-bottom-none'}>
                                <ControlLabel className={'negrito'}>Pais</ControlLabel>
                                <FormControl inputRef={ref => { this.selectPaisRef = ref; }} onChange={this.selecionarPais} componentClass="select" placeholder="selecione">
                                    <option value="select">Selecione</option>
                                    {paises}
                                </FormControl>
                            </FormGroup>
                        </Col>
                    </If>
                    <Col xs={6} md={3}>
                        <FormGroup className={'border-bottom-none'}>
                            <ControlLabel className={'negrito'}>Estado</ControlLabel>
                            <FormControl inputRef={ref => { this.selectEstadoRef = ref; }} onChange={this.selecionarEstado} componentClass="select" placeholder="selecione">
                                <option value="select">Selecione</option>
                                {estados}
                            </FormControl>
                        </FormGroup>
                    </Col>

                    <Col xs={6} md={3}>
                        <FormGroup className={'border-bottom-none'} >
                            <ControlLabel className={'negrito'}>Cidade</ControlLabel>
                            <FormControl inputRef={ref => { this.selectCidadeRef = ref; }} onChange={this.selecionarCidade} componentClass="select" placeholder="selecione">
                                <option value="select">Selecione</option>
                                {cidades}
                            </FormControl>
                        </FormGroup>
                    </Col>

                    <Row/>
                    <Col xs={6} md={3}>
                        <FieldGroup
                            id="formControlsText"
                            type="number"
                            label="Caixa Postal"
                            inputRef={ref => this.inputCaixaPostal = ref}
                        />
                    </Col>
                    <Col xs={6} md={3}>
                        <FieldGroup
                            id="formControlsText"
                            type="number"
                            label="Cep"
                            inputRef={ref => this.inputCep = ref}
                        />
                    </Col>
                    <Col xs={6} md={4}>
                        <div >
                            <FieldGroup
                                id="formControlsText"
                                type="text"
                                label="Bairro"
                                inputRef={ref => this.inputBairro = ref}
                            />
                        </div>
                    </Col>
                    <Col xs={6} md={5}>
                        <FieldGroup
                            id="formControlsText"
                            type="text"
                            label="Distrito"
                            inputRef={ref => this.inputDistrito = ref}
                        />
                    </Col>
                    <Col xs={6} md={5}>
                        <FieldGroup
                            id="formControlsText"
                            type="text"
                            label="Endereco"
                            inputRef={ref => this.inputEndereco = ref}
                        />
                    </Col>

                    <Row/>

                    <div className="center">
                        <Button className='btn cicle save' onClick={this.handleSubmit}>&#10004;</Button>
                    </div>

                </form>
            </div>
        )
    }
}
export default EnderecoForm




function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

export const tipoEnderecoValues = ['Comercial','Correio ou Postal','Acomodacão Temporaria','Residencial','Sem Endereco Fixo','Desconhecido/Nao Declarado']
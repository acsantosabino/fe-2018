import React from "react";
import FormGroup from '@material-ui/core/FormGroup';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import Grid from '@material-ui/core/Grid';

class VinculoField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: '',
            tipoidentificadorVinculo: '',
            identificadorVinculo: '',
            relacionamentoVinculo: 254,
            dataInicialVinculo: '',
            dataFinalVinculo: ''
        };
        this.handleNomeChange = this.handleNomeChange.bind(this);
        this.handleTipoIdentificadorVinculoChange = this.handleTipoIdentificadorVinculoChange.bind(this);
        this.handleIdentificadorVinculoChange = this.handleIdentificadorVinculoChange.bind(this);
        this.handleRelacionamentoVinculoChange = this.handleRelacionamentoVinculoChange.bind(this);
        this.handleDataInicialVinculoChange = this.handleDataInicialVinculoChange.bind(this);
        this.handleDataFinalVinculoChange = this.handleDataFinalVinculoChange.bind(this);
        this.remove = this.remove.bind(this);
    };
    componentDidMount() {
        this.setState(this.props.vinc);
    };
    handleNomeChange(e) {
        console.log(e.target.value);
        this.setState({ 'nome': e.target.value }, () => {
            this.props.onDataChange(this.props.count, this.state);
        });
    };
    handleIdentificadorVinculoChange(e) {
        console.log(e.target.value);
        this.setState({ 'identificadorVinculo': e.target.value }, () => {
            this.props.onDataChange(this.props.count, this.state);
        });
    };
    handleTipoIdentificadorVinculoChange(e) {
        console.log(e.target.value);
        this.setState({ 'tipoidentificadorVinculo': e.target.value }, () => {
            this.props.onDataChange(this.props.count, this.state);
        });
    };
    handleRelacionamentoVinculoChange(e) {
        console.log(e.target.value);
        this.setState({ 'relacionamentoVinculo': e.target.value }, () => {
            this.props.onDataChange(this.props.count, this.state);
        });
    };
    handleDataInicialVinculoChange(e) {
        console.log(e.target.value);
        this.setState({ 'dataInicialVinculo': e.target.value }, () => {
            this.props.onDataChange(this.props.count, this.state);
        });
    };
    handleDataFinalVinculoChange(e) {
        console.log(e.target.value);
        this.setState({ 'dataFinalVinculo': e.target.value }, () => {
            this.props.onDataChange(this.props.count, this.state);
        });
    };
    remove() {
        this.props.onRemove(this.props.count);
    }
    render() {
        return (
            <FormGroup id={this.props.vincId + this.props.count}
            style={{
                marginTop : "10px",
                marginBottom : "10px"
            }}>
                <Grid container
                    spacing={6}
                    direction="row"
                    justify="center"
                    alignItems="center"
                    style={{
                        marginTop : "10px",
                        marginBottom : "10px"
                    }}
                >
                    <Grid item xs={12} sm={11}>
                        <Grid container spacing={25}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    style={{
                                        width: "100%",
                                        marginTop : "10px",
                                        marginBottom : "10px"
                                    }}
                                    label='Nome do Vinculado'
                                    type="text"
                                    onChange={this.handleNomeChange}
                                    value={this.state.nome}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={25}>
                            <Grid item xs={12} sm={6} >
                                <FormControl
                                    style={{
                                        width:"90%",
                                        marginTop : "10px",
                                        marginBottom : "10px"
                                    }}>
                                    <InputLabel>Tipo de Identificador do Vinculo</InputLabel>
                                    <Select
                                        onChange={this.handleTipoIdentificadorVinculoChange}
                                        value={this.state.tipoidentificadorVinculo}>
                                        <MenuItem value={0} key={0}>Identificador local</MenuItem>
                                        <MenuItem value={1} key={1}>Certidão</MenuItem>
                                        <MenuItem value={2} key={2}>Carteira de Trabalho e Previdência Social (CTPS)</MenuItem>
                                        <MenuItem value={3} key={3}>Título de eleitor</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label='Identificador do Vinculo'
                                    type="text"
                                    onChange={this.handleIdentificadorVinculoChange}
                                    value={this.state.identificadorVinculo}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    style={{
                                        width: "100%",
                                        marginTop : "10px",
                                        marginBottom : "10px"
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={25}>
                            <Grid item xs={12} sm={6}>
                                <FormControl>
                                    <InputLabel>Relacionamento</InputLabel>
                                    <Select
                                        onChange={this.handleRelacionamentoVinculoChange}
                                        value={this.state.relacionamentoVinculo}>
                                        <MenuItem value={7}>Avó materna</MenuItem>
                                        <MenuItem value={8}>Avô materno</MenuItem>
                                        <MenuItem value={22}>Cônjugue</MenuItem>
                                        <MenuItem value={23}>Irmão</MenuItem>
                                        <MenuItem value={24}>Irmã</MenuItem>
                                        <MenuItem value={25}>Meio-irmão</MenuItem>
                                        <MenuItem value={26}>Meio-irmã</MenuItem>
                                        <MenuItem value={27}>Irmãos</MenuItem>
                                        <MenuItem value={28}>Criança</MenuItem>
                                        <MenuItem value={29}>Filha</MenuItem>
                                        <MenuItem value={36}>Avó paterna</MenuItem>
                                        <MenuItem value={37}>Avô paterno</MenuItem>
                                        <MenuItem value={38}>Tio materno</MenuItem>
                                        <MenuItem value={40}>Tio paterno</MenuItem>
                                        <MenuItem value={41}>Tia paterna</MenuItem>
                                        <MenuItem value={939}>Tia materna</MenuItem>
                                        <MenuItem value={189}>Recém-nascido</MenuItem>
                                        <MenuItem value={254}>Pais</MenuItem>
                                        <MenuItem value={262}>Mãe Adotiva</MenuItem>
                                        <MenuItem value={263}>Pai Adotivo</MenuItem>
                                        <MenuItem value={264}>Responsável</MenuItem>
                                        <MenuItem value={265}>Coabitante</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    id="dataInicialVinculo"
                                    label="Data de Início"
                                    type="date"
                                    onChange={this.handleDataInicialVinculoChange}
                                    value={this.state.dataInicialVinculo}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    id="dataFinalVinculo"
                                    label="Data de Fim"
                                    type="date"
                                    onChange={this.handleDataFinalVinculoChange}
                                    value={this.state.dataFinalVinculo}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={1}>
                        <IconButton variant="fab" color="secondary" aria-label="Delete" onClick={this.remove}>
                            <DeleteIcon fontSize="large" />
                        </IconButton>
                    </Grid>
                </Grid>
            </FormGroup>
        );
    };
}
class Vinculos extends React.Component {
    constructor(props) {
        super(props);
        this.key = 'vinculos';
        this.skull = {
            nome: '',
            tipoidentificadorVinculo: '',
            identificadorVinculo: '',
            relacionamentoVinculo: 254,
            dataInicialVinculo: '',
            dataFinalVinculo: ''
        };
        this.state = {
            data: []
        };
        this.addFields = this.addFields.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.updateList = this.updateList.bind(this);
    }
    componentDidMount() {
        console.log(this.props.data);
        if (sessionStorage.hasOwnProperty(this.key)) {
          this.setState({
            data: JSON.parse(sessionStorage.getItem(this.key))
              ? JSON.parse(sessionStorage.getItem(this.key))
              : this.props.data
          }, () => {
            sessionStorage.setItem(this.key, JSON.stringify(this.state.data));
          });
        }
        else {
          sessionStorage.setItem(this.key, JSON.stringify(this.props.data));
        }
      }

    addFields() {
        this.setState({ data: this.state.data.concat([this.skull]) });
        sessionStorage.setItem(this.key, JSON.stringify(this.state.data));
    }
    onSubmit() {
        sessionStorage.setItem(this.key, JSON.stringify(this.state.data));
    }
    onRemove(index) {
        this.state.data.splice(index, 1);
        this.setState(this.state);
    }
    updateList(count, data) {
        let datas = this.state.data;
        datas[count] = data;
        this.setState({ 'data': datas }, () => {
            console.log(this.state.data[count]);
        });
    }

    render() {
        return (
            <div>
                <h2>Vínculos</h2>
                <form >
                    <Grid container alignItems="colum">
                        <Grid item xs={12} spacing={24}>
                            {
                                this.state.data.map((vinculos, count) => (
                                    <VinculoField
                                        vincId={this.key}
                                        vinc={vinculos}
                                        count={count}
                                        onRemove={this.onRemove}
                                        onDataChange={this.updateList}
                                    />
                                ))
                            }
                        </Grid>
                        <Grid item xs={12} spacing={24}>
                            <Grid container direction="row" justify="center">
                                <Grid item xs={1} spacing={24}>
                                    <IconButton variant="fab" color="primary" aria-label="Add" onClick={this.onSubmit}>
                                        <DoneIcon fontSize="large" />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={1} spacing={24}>
                                    <IconButton variant="fab" color="primary" aria-label="Add" onClick={this.addFields}>
                                        <AddIcon fontSize="large" />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </div>
        );
    }
}

export default Vinculos;
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

class ComFields extends React.Component {
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
    componentDidMount() {
        this.setState(this.props.com);
    };
    handleMeioChange(e) {
        this.setState({ 'meioDeComunicacao': e.target.value }, () => {
            this.props.onDataChange(this.props.count, this.state);
        });
    };
    handleDetalheChange(e) {
        this.setState({ 'detalhes': e.target.value }, () => {
            this.props.onDataChange(this.props.count, this.state);
        });
    };
    handlePreferenciaChange(e) {
        this.setState({ 'preferenciaContato': e.target.value }, () => {
            this.props.onDataChange(this.props.count, this.state);
        });
    };
    handleUtilizacaoChange(e) {
        this.setState({ 'codigoUtilizacao': e.target.value }, () => {
            this.props.onDataChange(this.props.count, this.state);
        });
    };
    remove() {
        this.props.onRemove(this.props.count);
    }
    render() {
        const meios = ['Telefone', 'Celular', 'Fax', 'Pager', 'Email', 'URL', 'Outro'];
        return (
            <FormGroup id={this.props.comId + this.props.count}>
                <Grid container
                    spacing={6}
                    direction="row"
                    justify="center"
                    alignItems="center">
                    <Grid item xs={12} sm={11}>
                        <Grid container spacing={6}>
                            <Grid item xs={12} sm={2}>
                                <FormControl>
                                    <InputLabel> Meio</InputLabel>
                                    <Select
                                        onChange={this.handleMeioChange}
                                        value={this.state.meioDeComunicacao}>
                                        <MenuItem value={1}>Telefone</MenuItem>
                                        <MenuItem value={2}>Celular</MenuItem>
                                        <MenuItem value={3}>Fax</MenuItem>
                                        <MenuItem value={3}>Pager</MenuItem>
                                        <MenuItem value={4}>Email</MenuItem>
                                        <MenuItem value={5}>URL</MenuItem>
                                        <MenuItem value={6}>Outro</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    label={meios[this.state.meioDeComunicacao - 1]}
                                    className="input text"
                                    type="text"
                                    placeholder="(xx) xxxx-xxxx"
                                    onChange={this.handleDetalheChange}
                                    value={this.state.detalhes}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl>
                                    <InputLabel> Preferência</InputLabel>
                                    <Select
                                        onChange={this.handlePreferenciaChange}
                                        value={this.state.preferenciaContato}>
                                        <MenuItem value="A">Horário comercial</MenuItem>
                                        <MenuItem value="B">Durante o dia</MenuItem>
                                        <MenuItem value="C">Finais de semana</MenuItem>
                                        <MenuItem value="D">Qualquer hora</MenuItem>
                                        <MenuItem value="E">Peíodo noturno</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <FormControl>
                                    <InputLabel> Utilização</InputLabel>
                                    <Select
                                        onChange={this.handleUtilizacaoChange}
                                        value={this.state.codigoUtilizacao}>
                                        <MenuItem value="Comercial">Comercial</MenuItem>
                                        <MenuItem value="Pessoal">Pessoal</MenuItem>
                                        <MenuItem value="Comercial e Pessoal">Comercial e Pessoal</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={1}>
                        <IconButton variant="fab" color="secondary" aria-label="Delete" onClick={this.remove}>
                            <DeleteIcon fontSize="large" />
                        </IconButton>
                    </Grid>
                </Grid>
            </FormGroup >
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
    componentDidMount() {
        if (sessionStorage.hasOwnProperty(this.key)) {
            // get the key's value from sessionStorage
            let value = sessionStorage.getItem(this.key);
            // parse the sessionStorage string and setState
            try {
                value = JSON.parse(value);
                this.setState({ data: value });
            } catch (e) {
                // handle empty string
                this.setState({ data: [this.skull] });
            }
        }
        else {
            this.setState({ data: [this.skull] });
            sessionStorage.setItem(this.key, JSON.stringify([this.skull]));
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
                <h2>Comunicações Eletronica</h2>
                <form >
                    <Grid container alignItems="colum">
                        <Grid item xs={12} spacing={24}>
                            {
                                this.state.data.map((comunicacoesEletronica, count) => (
                                    <ComFields
                                        comId={this.key}
                                        com={comunicacoesEletronica}
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
                <div className="clear" />
            </div>
        );
    }
}

export default ComunicacoesEletronica;
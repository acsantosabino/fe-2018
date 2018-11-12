import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";
import { Paper } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Typography from "@material-ui/core/Typography";
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';


const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  alinhaEsquerda: {
    padding: theme.spacing.unit * 2,
    textAlign: "left",
    color: theme.palette.text.secondary
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 280,
  },
  formControl_linha: {
    margin: theme.spacing.unit,
    minWidth: 800,
  },
  
});

class DadosDemograficos extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        // nome dos pais
        name: "Cat in the Hat",
        age: "",
        multiline: "Controlled",
        currency: "EUR",
        amount: "",
        checkedA: true,
        checkedB: true,
        value: "female",
        open: false,
        open_nasc: false,
        open_ordem: false,
        selecione: '',
        selecione_nasc:'',
        selecione_ordem:'',

        editando: false,
        id: 0,
        nomeMae:"",
        nomePai:"",
        nomes: [],

        multiline: 'Controlled',
  };
  this.addDemografico = this.addDemografico.bind(this);

  }

  handleRadio = event => {
    this.setState({ value: event.target.value });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
    this.setState({ [name]: event.target.checked });
    this.setState({ [event.target.name]: event.target.value });
 
  };

  handleCloseSit = () => {this.setState({ open: false }); };
  handleCloseNasc = () => {this.setState({ open_nasc: false }); };
  handleCloseOrdem = () => {this.setState({ open_ordem: false }); };

  handleOpenSit = () => {this.setState({ open: true }); };
  handleOpenNasc = () => {this.setState({ open_nasc: true }); };
  handleOpenOrdem = () => {this.setState({ open_ordem: true }); };

  addDemografico() {

    if(this.state.nomeMae === null || this.state.nomeMae === '') {
      return alert("O campo 'Mae' está vazio");
    }
    if(this.state.nomePai === null || this.state.nomePai === '') {
      return alert("O campo 'Pai' está vazio");
    }

    let id = new Date().getTime();
    this.state.nomes.push({
      id: id,
      nomeMae: this.state.nomeMae,
      nomePai: this.state.nomePai,
      
    });
    sessionStorage.setItem("dadosDemograficos", JSON.stringify(this.state.nomes));
    this.clear();
  }

  render() {
    const { classes } = this.props;

    const { sit_1, sit_2, sit_3, sit_4, sit_5, sit_6, sit_seguimento, branca, preta, parda, amarela, indigena, masc, fem, inter, nao_dec } = this.state;
    const error =
      [sit_1, sit_2, sit_3, sit_4, sit_5, sit_6, sit_seguimento, branca, preta, parda, amarela, indigena, masc, fem, inter, nao_dec].filter(v => v).length !== 2;

    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <TextField
                id="nomeMae"
                name="nomeMae"
                label="nomeMae"
                onChange={this.handleChange("mae")}
                style={{ margin: 8 }}
                placeholder="Nome completo da mãe!"
                // helperText="Full width!"
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                id="nomePai"
                name="nomePai"
                onChange={this.handleChange("nomePai")}
                label="nomePai"
                style={{ margin: 8 }}
                placeholder="Nome completo do pai!"
                // helperText="Full width!"
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.alinhaEsquerda}>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel style={{ paddingBottom: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    Situação familiar (convive com)
                  </Typography>
                </FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={sit_1}
                        onChange={this.handleChange("sit_1")}
                        value="sit_1"
                      />
                    }
                    label="companheiro(a) e filho(s)"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={sit_2}
                        onChange={this.handleChange("sit_2")}
                        value="sit_2"
                      />
                    }
                    label="companheiro(a) com laços conjugais e sem filhos"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={sit_3}
                        onChange={this.handleChange("sit_3")}
                        value="sit_3"
                      />
                    }
                    label="companheiro(a), com filho(s) e/ou outro(s) familiar(es)"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={sit_4}
                        onChange={this.handleChange("sit_4")}
                        value="sit_4"
                      />
                    }
                    label="familiar(es) sem companheiro(a)"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={sit_5}
                        onChange={this.handleChange("sit_5")}
                        value="sit_5"
                      />
                    }
                    label="outra(s) pessoa(s) sem laços consanguíneos e/ou laços conjugais"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={sit_6}
                        onChange={this.handleChange("sit_6")}
                        value="sit_6"
                      />
                    }
                    label="vive só"
                  />
                </FormGroup>
                {/* <FormHelperText>Be careful</FormHelperText> */}
              </FormControl>
              
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.alinhaEsquerda}>
              <FormLabel style={{ paddingBottom: 10 }}>
                <Typography variant="h6" gutterBottom>
                  Data de nascimento
                </Typography>
              </FormLabel>

              <form className={classes.container} noValidate style={{paddingBottom:10}}>
                <TextField
                  id="datetime-local"
                  type="datetime-local"
                  defaultValue="0000-00-24T00:00"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </form>
              <FormLabel >
                <Typography variant="h6" gutterBottom>
                  Indicador de Acurácia
                </Typography>
              </FormLabel>
              <Typography
                variant="caption"
                gutterBottom
                align="left"
                style={{ paddingBottom: 1 }}
              >
                Dia:
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="position"
                  name="position"
                  value={this.state.value}
                  onChange={this.handleRadio}
                  row
                >
                  <FormControlLabel
                    value="left_dia_obito"
                    control={<Radio color="primary" />}
                    label="Acurado"
                    labelPlacement="left_dia_obito"
                  />
                  <FormControlLabel
                    value="center_dia_obito"
                    control={<Radio color="primary" />}
                    label="Estimado"
                    labelPlacement="center_dia_obito"
                  />
                  <FormControlLabel
                    value="right_dia_obito"
                    control={<Radio color="primary" />}
                    label="Desconhecido"
                    labelPlacement="right_dia_obito"
                  />
                </RadioGroup>
              </FormControl>
              <Typography
                variant="caption"
                gutterBottom
                align="left"
                style={{ paddingBottom: 1 }}
              >
                Mês:
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="position"
                  name="position"
                  value={this.state.value}
                  onChange={this.handleRadio}
                  row
                >
                  <FormControlLabel
                    value="left_mes_obito"
                    control={<Radio color="primary" />}
                    label="Acurado"
                    labelPlacement="left_mes_obito"
                  />
                  <FormControlLabel
                    value="center_mes_obito"
                    control={<Radio color="primary" />}
                    label="Estimado"
                    labelPlacement="center_mes_obito"
                  />
                  <FormControlLabel
                    value="right_mes_obito"
                    control={<Radio color="primary" />}
                    label="Desconhecido"
                    labelPlacement="right_mes_obito"
                  />
                </RadioGroup>
              </FormControl>
              <Typography
                variant="caption"
                gutterBottom
                align="left"
                style={{ paddingBottom: 1 }}
              >
                Ano:
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="position"
                  name="position"
                  value={this.state.value}
                  onChange={this.handleRadio}
                  row
                >
                  <FormControlLabel
                    value="left_ano_obito"
                    control={<Radio color="primary" />}
                    label="Acurado"
                    labelPlacement="left_ano_obito"
                  />
                  <FormControlLabel
                    value="center_ano_obito"
                    control={<Radio color="primary" />}
                    label="Estimado"
                    labelPlacement="center_ano_obito"
                  />
                  <FormControlLabel
                    value="right_ano_obito"
                    control={<Radio color="primary" />}
                    label="Desconhecido"
                    labelPlacement="right_ano_obito"
                  />
                </RadioGroup>
              </FormControl>
              <FormLabel>
                  <Typography variant="h6" gutterBottom>
                    Seguimento
                  </Typography>
                </FormLabel>
              <FormControl component="fieldset" className={classes.formControl}>
               
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={sit_seguimento}
                        onChange={this.handleChange("sit_1")}
                        value="sit_seguimento"
                      />
                    }
                    label="Data precisa de seguimento"
                    style={{paddingBottom:32}}
                  />
                 
                </FormGroup>
              </FormControl>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.alinhaEsquerda}>
              <FormLabel style={{ paddingBottom: 10 }}>
                <Typography variant="h6" gutterBottom>
                  Óbito
                </Typography>
              </FormLabel>

              <form className={classes.container} noValidate style={{paddingBottom:10}}>
                <TextField
                  id="datetime-local"
                  type="datetime-local"
                  defaultValue="0000-00-24T00:00"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </form>
              <FormLabel style={{ paddingBottom: 10 }}>
                <Typography variant="h6" gutterBottom>
                  Indicador de Acurácia
                </Typography>
              </FormLabel>
              <Typography
                variant="caption"
                gutterBottom
                align="left"
                style={{ paddingBottom: 1 }}
              >
                Dia:
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="position"
                  name="position"
                  value={this.state.value}
                  onChange={this.handleRadio}
                  row
                >
                  <FormControlLabel
                    value="left_dia"
                    control={<Radio color="primary" />}
                    label="Acurado"
                    labelPlacement="left_dia"
                  />
                  <FormControlLabel
                    value="center_dia"
                    control={<Radio color="primary" />}
                    label="Estimado"
                    labelPlacement="center_dia"
                  />
                  <FormControlLabel
                    value="right_dia"
                    control={<Radio color="primary" />}
                    label="Desconhecido"
                    labelPlacement="right_dia"
                  />
                </RadioGroup>
              </FormControl>
              <Typography
                variant="caption"
                gutterBottom
                align="left"
                style={{ paddingBottom: 1 }}
              >
                Mês:
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="position"
                  name="position"
                  value={this.state.value}
                  onChange={this.handleRadio}
                  row
                >
                  <FormControlLabel
                    value="left_mes"
                    control={<Radio color="primary" />}
                    label="Acurado"
                    labelPlacement="left_mes"
                  />
                  <FormControlLabel
                    value="center_mes"
                    control={<Radio color="primary" />}
                    label="Estimado"
                    labelPlacement="center_mes"
                  />
                  <FormControlLabel
                    value="right_mes"
                    control={<Radio color="primary" />}
                    label="Desconhecido"
                    labelPlacement="right_mes"
                  />
                </RadioGroup>
              </FormControl>
              <Typography
                variant="caption"
                gutterBottom
                align="left"
                style={{ paddingBottom: 1 }}
              >
                Ano:
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="position"
                  name="position"
                  value={this.state.value}
                  onChange={this.handleRadio}
                  row
                >
                  <FormControlLabel
                    value="left_ano"
                    control={<Radio color="primary" />}
                    label="Acurado"
                    labelPlacement="left_ano"
                  />
                  <FormControlLabel
                    value="center_ano"
                    control={<Radio color="primary" />}
                    label="Estimado"
                    labelPlacement="center_ano"
                  />
                  <FormControlLabel
                    value="right_ano"
                    control={<Radio color="primary" />}
                    label="Desconhecido"
                    labelPlacement="right_ano"
                  />
                </RadioGroup>
              </FormControl>
              <FormLabel style={{ paddingBottom: 1 }}>
                  <Typography variant="h6" gutterBottom>
                  Fonte de notificação
                  </Typography>
                </FormLabel>
                <FormControl component="fieldset">
                <RadioGroup
                  aria-label="position"
                  name="position"
                  value={this.state.value}
                  onChange={this.handleRadio}
                  row
                >
                  <FormControlLabel
                    value="left_fonte"
                    control={<Radio color="primary" />}
                    label="Cartório"
                    labelPlacement="left_ano_obito"
                  />
                  <FormControlLabel
                    value="left_font_left"
                    control={<Radio color="primary" />}
                    label="Prestador Assistência"
                    labelPlacement="center_ano_obito"
                  />
                  <FormControlLabel
                    value="center_font"
                    control={<Radio color="primary" />}
                    label="Parente"
                    labelPlacement="right_ano_obito"
                  />
                  <FormControlLabel
                    value="right_font_right"
                    control={<Radio color="primary" />}
                    label="Outro"
                    labelPlacement="right_ano_obito"
                  />
                   <FormControlLabel
                    value="right_font"
                    control={<Radio color="primary" />}
                    label="Desconhecido"
                    labelPlacement="right_ano_obito"
                  />
                </RadioGroup>
              </FormControl>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.alinhaEsquerda}>
              <FormLabel style={{ paddingBottom: 10 }}>
                <Typography variant="h6" gutterBottom>
                  Raça / Cor
                </Typography>
              </FormLabel>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={branca}
                        onChange={this.handleChange("branca")}
                        value="branca"
                      />
                    }
                    label="Branca"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={preta}
                        onChange={this.handleChange("preta")}
                        value="preta"
                      />
                    }
                    label="Preta"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={parda}
                        onChange={this.handleChange("parda")}
                        value="parda"
                      />
                    }
                    label="Parda"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={amarela}
                        onChange={this.handleChange("amarela")}
                        value="amarela"
                      />
                    }
                    label="Amarela"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={indigena}
                        onChange={this.handleChange("indigena")}
                        value="indigena"
                      />
                    }
                    label="Indígena"
                  />
                </FormGroup>
                {/* <FormHelperText>Be careful</FormHelperText> */}
              </FormControl>
              <FormLabel>
                  <Typography variant="h6" gutterBottom>
                    Situação familiar (convive com)
                  </Typography>
                </FormLabel>
              <FormControl component="fieldset" className={classes.formControl}>
               
              <form autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="demo-controlled-open-select">Selecione</InputLabel>
          <Select
            open={this.state.open}
            onClose={this.handleCloseSit}
            onOpen={this.handleOpenSit}
            value={this.state.selecione}
            onChange={this.handleChange}
            inputProps={{
              name: 'selecione',
              id: 'demo-controlled-open-select',
            }}
          >
            
            <MenuItem value={10}>companheiro(a) e filho(s)</MenuItem>
            <MenuItem value={20}>companheiro(a) com laços conjugais e
                            sem filhos
            </MenuItem>
            <MenuItem value={30}>companheiro(a), com filho(s) e/ou
                            outro(s) familiares.
            </MenuItem>
            <MenuItem value={40}>familiar(es) sem companheiro(a)
            </MenuItem>
            <MenuItem value={50}>outra(s) pessoa(s), sem laços
                            consanguíneos e/ou laços conjugais
                        
            </MenuItem>
            <MenuItem value={60}>Vive só        
            </MenuItem>  
          </Select>
        </FormControl>
      </form>
      
                {/* <FormHelperText>Be careful</FormHelperText> */}
              </FormControl>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.alinhaEsquerda}>
              <FormLabel style={{ paddingBottom: 10 }}>
                <Typography variant="h6" gutterBottom>
                  Sexo
                </Typography>
                </FormLabel>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={masc}
                        onChange={this.handleChange("masc")}
                        value="masc"
                      />
                    }
                    label="Masculino(M)"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={fem}
                        onChange={this.handleChange("fem")}
                        value="fem"
                      />
                    }
                    label="Feminino (F)"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={inter}
                        onChange={this.handleChange("inter")}
                        value="inter"
                      />
                    }
                    label="Intersexo ou indeterminado"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={nao_dec}
                        onChange={this.handleChange("nao_dec")}
                        value="nao_dec"
                      />
                    }
                    label="Não declarou"
                  />
                </FormGroup>
                {/* <FormHelperText>Be careful</FormHelperText> */}
              </FormControl>
              <FormLabel>
                  <Typography variant="h6" gutterBottom>
                  Pluralidade de nascimentos
                  </Typography>
                </FormLabel>
                <form autoComplete="off">
        <FormControl className={classes.formControl} style={{paddingBottom:65}}>
          <InputLabel   htmlFor="demo-controlled-open-select">Selecione</InputLabel>
          <Select
            open={this.state.open_nasc}
            onClose={this.handleCloseNasc}
            onOpen={this.handleOpenNasc}
            value={this.state.selecione_nasc}
            onChange={this.handleChange}
            inputProps={{
              name: 'selecione_nasc',
              id: 'demo-controlled-open-select',
            }}
          >
            
            <MenuItem value={10}>Único</MenuItem>
            <MenuItem value={20}>Gêmeos</MenuItem>
            <MenuItem value={30}>Trigêmeos</MenuItem>
            <MenuItem value={40}>Quádruplos</MenuItem>
            <MenuItem value={50}>Quíntuplos</MenuItem>
            <MenuItem value={60}>Sêxtuplos</MenuItem> 
            <MenuItem value={70}>Outros</MenuItem>  
          </Select>
        </FormControl>
      </form>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.alinhaEsquerda}>
              <FormLabel>
                  <Typography variant="h6" gutterBottom>
                  Nacionalidade
                  </Typography>
                </FormLabel>
              
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.alinhaEsquerda}>
              <FormLabel>
                  <Typography variant="h6" gutterBottom>
                  Ordem de nascimento
                  </Typography>
                </FormLabel>
                <form autoComplete="off">
        <FormControl className={classes.formControl_linha}>
          <InputLabel   htmlFor="demo-controlled-open-select">Selecione</InputLabel>
          <Select
            open={this.state.open_ordem}
            onClose={this.handleCloseOrdem}
            onOpen={this.handleOpenOrdem}
            value={this.state.selecione_ordem}
            onChange={this.handleChange}
            inputProps={{
              name: 'selecione_ordem',
              id: 'demo-controlled-open-select',
            }}
          >
            
            <MenuItem value={10}>Único ou primeiro</MenuItem>
            <MenuItem value={20}>Segundo</MenuItem>
            <MenuItem value={30}>Terceiro</MenuItem>
            <MenuItem value={40}>Quarto</MenuItem>
            <MenuItem value={50}>Sexto</MenuItem>
            <MenuItem value={60}>Outros</MenuItem> 
            <MenuItem value={70}>Não declarado</MenuItem>  
          </Select>
        </FormControl>
      </form>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.alinhaEsquerda}>
            <FormLabel>
                  <Typography variant="h6" gutterBottom>
                  Comentários de identificação
                  </Typography>
                </FormLabel>
            <TextField
          id="outlined-multiline-fexible"
          label="Comentários"
          placeholder="Exemplo: dois pacientes com o mesmo nome!"
          fullWidth
          multiline
          rows="4"
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />
            
            </Paper>
          </Grid>

          <Grid item xs={12} sm={12} container justify="flex-end">
            {!this.state.editando && (
              <Button
                variant="contained"
                color="primary"
                onClick={this.addDemografico}
              >
                Adicionar dados
              </Button>
            )}
            {this.state.editando && (
              <Button
                variant="contained"
                color="secondary"
                onClick={this.updateNome}
              >
                Salvar edição
              </Button>
            )}
          </Grid>
        </Grid>
        
      </div>
    );
  }
}

DadosDemograficos.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DadosDemograficos);

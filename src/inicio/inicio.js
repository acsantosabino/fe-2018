import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Stepper from '@material-ui/core/Stepper';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import axios from 'axios'

import Nomes from '../nomes/nomes';
import Identificador from '../identificador/Identificador';
import withRoot from '../withRoot';

/* 
import Endereco from './endereco/endereco.jsx'
import ComunicacoesEletronica from "./comunicacoes/ComunicacoesEletronica";
import Vinculos from './vinculos/Vinculos'; */
const styles = theme => ({
  appBar: {
    position: "relative"
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 900,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    }
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit
  }
});

const steps = [
  "Nomes",
  "Identificadores",
  "Dados demográficos",
  "Endereços",
  "Comunicações Eletrônica",
  "Vínculo"
];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Nomes />;
    case 1:
      return <Identificador />;
    case 2:
      return <Nomes />;
    case 3:
      return <Nomes />;
    case 4:
      return <Nomes />;
    case 5:
      return <Nomes />;
    default:
      throw new Error("Unknown step");
  }
}

class Inicio extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      identificadores: [],
      nomes: [],
      dadosDemograficos: [],
      enderecos: [],
      comunicacoesEletronica: [],
      vinculos: [],
      activeStep: 0,
      url : "../data/modeloDeDados.json"
    };
    this.loadCommentsFromServer();
  }

  handleStep = step => () => {
    this.setState({
      activeStep: step,
    });
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  loadCommentsFromServer() {
    axios.get(this.state.url).then(response =>{
      sessionStorage.setItem('identificadores', JSON.stringify(response.data.identificadores));
      sessionStorage.setItem('dadosDemograficos', JSON.stringify(response.data.dadosDemograficos));
      sessionStorage.setItem('enderecos', JSON.stringify(response.data.enderecos));
      sessionStorage.setItem('comunicacoesEletronica', JSON.stringify(response.data.comunicacoesEletronica));
      sessionStorage.setItem('vinculos', JSON.stringify(response.data.vinculos));
      this.setState(response.data);
   }).catch(e =>  {
 
    console.error(e);
   });
}
// componentWillMount() {
//this.loadCommentsFromServer();


  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="absolute" color="default" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Hospital X
            </Typography>
          </Toolbar>
        </AppBar>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
             Cadastro do Indivíduo
            </Typography>
              <Stepper nonLinear className={classes.stepper} activeStep={activeStep}>
              {steps.map((label, index) => {
                return (
                  <Step key={label}>
                    <StepButton
                      onClick={this.handleStep(index)}>
                      {label}
                    </StepButton>
                  </Step>
                );
              })}
            </Stepper>
                <React.Fragment>
                  {getStepContent(activeStep)}
                </React.Fragment>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

Inicio.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRoot(withStyles(styles)(Inicio));

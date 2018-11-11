import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
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


import Endereco from '../endereco/endereco'
import ComunicacoesEletronica from "../comunicacoes/ComunicacoesEletronica";
import Vinculos from '../vinculos/Vinculos';
import DadosDemograficos from '../demografico/demografico';
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

function getStepContent(step, id) {
  switch (step) {
    case 0:
      return <Nomes />;
    case 1:
      return <Identificador />;
    case 2:
      return <DadosDemograficos />;
    case 3:
        return <Endereco />;
    case 4:
        return <ComunicacoesEletronica data={id.comunicacoesEletronica}/>;
    case 5:
    return <Vinculos data={id.vinculos}/>;
    default:
      throw new Error("Unknown step");
  }
}

class Inicio extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      id: {
        identificadores: [],
        nomes: [],
        dadosDemograficos: [],
        enderecos: [],
        comunicacoesEletronica: [],
        vinculos: []
      },
      activeStep: 0,
      url : "../data/modeloDeDados.json"
    };
    this.url= "../data/modeloDeDados.json";
    this.loadCommentsFromServer();
  }

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
    axios.get(this.url).then(response => {
      // for all items in state
      let id = this.state.id;
      for (let key in this.state.id) {
        // if the key exists in sessionStorage
        if (sessionStorage.hasOwnProperty(key)) {
          // get the key's value from sessionStorage
          var value = sessionStorage.getItem(key);
          // parse the sessionStorage string and setState
          try {
            value = JSON.parse(value);
            id[key]= value;
            this.setState({'id':id});
          } catch (e) {
            sessionStorage.setItem(key, JSON.stringify(response.data[key]));
          }
        }
        else {
          sessionStorage.setItem(key, JSON.stringify(response.data[key]));
        }
      }
    }).catch(e => {

      console.error(e);
    });
  }
  componentDidMount() {
    this.loadCommentsFromServer();
  }
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
